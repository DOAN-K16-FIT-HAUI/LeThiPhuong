import { Request, Response, NextFunction } from 'express';
import { BadRequestError, BadUserRequestError } from '../core/error.response';
import { OK } from '../core/success.response';
import CryptoJS from 'crypto-js';

import bcrypt from 'bcrypt';

import modelUser from '../models/users.model';
import modelApikey from '../models/apiKey.model';

// Import the services using require since they use CommonJS
const { createApiKey, createToken, createRefreshToken, verifyToken } = require('../services/tokenSevices');

import dotenv from 'dotenv';

// Add imports for models we need for statistics
import { Sequelize, Op } from 'sequelize';
import modelPayment from '../models/payment.model';
import modelProduct from '../models/product.model';

dotenv.config();

// Define interface for User
interface User {
    id: string;
    fullName: string;
    email: string;
    isAdmin: boolean;
    address?: string;
    phone?: string;
    password: string;
    save: () => Promise<void>;
}

// Define RequestWithUser interface to extend Express Request
interface RequestWithUser extends Request {
    user?: {
        id: string;
        [key: string]: any;
    };
}

class controllerUser {
    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            throw new BadRequestError('Vui lòng nhập đầy đủ thông tin');
        }
        const findUser = await modelUser.findOne({ where: { email } });

        if (findUser) {
            throw new BadRequestError('Người dùng đã tồn tại');
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const passwordHash = bcrypt.hashSync(password, salt);
        const dataUser = (await modelUser.create({
            fullName,
            email,
            password: passwordHash,
            typeLogin: 'email',
        })) as unknown as User;

        await dataUser.save();
        await createApiKey(dataUser.id);
        const token = await createToken({
            id: dataUser.id,
            isAdmin: dataUser.isAdmin,
            address: dataUser.address,
            phone: dataUser.phone,
        });
        const refreshToken = await createRefreshToken({ id: dataUser.id });
        res.cookie('token', token, {
            httpOnly: true, // Chặn truy cập từ JavaScript (bảo mật hơn)
            secure: true, // Chỉ gửi trên HTTPS (để đảm bảo an toàn)
            sameSite: 'strict', // Chống tấn công CSRF
            maxAge: 15 * 60 * 1000, // 15 phút
        });

        res.cookie('logged', '1', {
            httpOnly: false, // Chặn truy cập từ JavaScript (bảo mật hơn)
            secure: true, // Chỉ gửi trên HTTPS (để đảm bảo an toàn)
            sameSite: 'strict', // Chống tấn công CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
        });

        // Đặt cookie HTTP-Only cho refreshToken (tùy chọn)
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
        });

        new OK({ message: 'Đăng ký thành công', metadata: { token, refreshToken } }).send(res);
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new BadUserRequestError('Vui lòng nhập đầy đủ thông tin');
        }
        const findUser = (await modelUser.findOne({ where: { email } })) as unknown as User;
        const isPasswordValid = bcrypt.compareSync(password, findUser.password);
        if (!isPasswordValid) {
            throw new BadUserRequestError('Tài khoản hoặc mật khẩu không chính xác');
        }
        await createApiKey(findUser?.id);
        const token = await createToken({ id: findUser.id, isAdmin: findUser.isAdmin });
        const refreshToken = await createRefreshToken({ id: findUser.id });
        res.cookie('token', token, {
            httpOnly: true, // Chặn truy cập từ JavaScript (bảo mật hơn)
            secure: true, // Chỉ gửi trên HTTPS (để đảm bảo an toàn)
            sameSite: 'strict', // Chống tấn công CSRF
            maxAge: 15 * 60 * 1000, // 15 phút
        });
        res.cookie('logged', 1, {
            httpOnly: false, // Chặn truy cập từ JavaScript (bảo mật hơn)
            secure: true, // Chỉ gửi trên HTTPS (để đảm bảo an toàn)
            sameSite: 'strict', // Chống tấn công CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
        });
        new OK({ message: 'Đăng nhập thành công', metadata: { token, refreshToken } }).send(res);
    }

    async authUser(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.user!;
        const findUser = (await modelUser.findOne({ where: { id } })) as unknown as User;

        if (!findUser) {
            throw new BadRequestError('Tài khoản không tồn tại');
        }

        const userInfo = {
            id: findUser.id,
            fullName: findUser.fullName,
            email: findUser.email,
            isAdmin: findUser.isAdmin,
        };

        const auth = CryptoJS.AES.encrypt(JSON.stringify(userInfo), process.env.SECRET_CRYPTO as string).toString();

        new OK({ message: 'success', metadata: auth }).send(res);
    }

    async refreshToken(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        const refreshToken = req.cookies.refreshToken;

        const decoded = await verifyToken(refreshToken);

        const user = (await modelUser.findOne({ where: { id: decoded.id } })) as unknown as User;
        const token = await createToken({ id: user.id });
        res.cookie('token', token, {
            httpOnly: true, // Chặn truy cập từ JavaScript (bảo mật hơn)
            secure: true, // Chỉ gửi trên HTTPS (để đảm bảo an toàn)
            sameSite: 'strict', // Chống tấn công CSRF
            maxAge: 15 * 60 * 1000, // 15 phút
        });

        res.cookie('logged', 1, {
            httpOnly: false, // Chặn truy cập từ JavaScript (bảo mật hơn)
            secure: true, // Chỉ gửi trên HTTPS (để đảm bảo an toàn)
            sameSite: 'strict', // Chống tấn công CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
        });

        new OK({ message: 'Refresh token thành công', metadata: { token } }).send(res);
    }

    async logout(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.user!;
        await modelApikey.destroy({ where: { userId: id } });
        res.clearCookie('token');
        res.clearCookie('refreshToken');
        res.clearCookie('logged');

        new OK({ message: 'Đăng xuất thành công' }).send(res);
    }

    async updateInfoUser(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.user!;
        const { fullName, email, currentPassword, newPassword } = req.body;
        if (currentPassword !== '' && newPassword !== '') {
            const findUser = (await modelUser.findOne({ where: { id } })) as unknown as User;
            if (!findUser) {
                throw new BadRequestError('Tài khoản không tồn tại');
            }
            const isPasswordValid = bcrypt.compareSync(currentPassword, findUser?.password);
            if (!isPasswordValid) {
                throw new BadRequestError('Mật khẩu cũ không chính xác');
            }
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const passwordHash = bcrypt.hashSync(newPassword, salt);
            findUser.password = passwordHash;
            await findUser.save();
            new OK({ message: 'Cập nhật thông tin thành công' }).send(res);
        }
        const data = await modelUser.update({ fullName, email }, { where: { id } });
        new OK({ message: 'Cập nhật thông tin thành công', metadata: data }).send(res);
    }

    async getAllUser(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        const users = await modelUser.findAll();
        new OK({ message: 'Lấy danh sách tài khoản thành công', metadata: users }).send(res);
    }

    async updateUser(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        const { id, isAdminUser } = req.body;
        if (isAdminUser === '0') {
            const data = await modelUser.update({ isAdmin: '0' }, { where: { id } });
            new OK({ message: 'Cập nhật thông tin thành công', metadata: data }).send(res);
        } else {
            const data = await modelUser.update({ isAdmin: '1' }, { where: { id } });
            new OK({ message: 'Cập nhật thông tin thành công', metadata: data }).send(res);
        }
    }

    async getStatistics(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        try {
            // Get total users
            const totalUsers = await modelUser.count();

            // Get user growth over 6 months
            const today = new Date();
            const users = [];

            for (let i = 5; i >= 0; i--) {
                const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
                const monthEnd = new Date(today.getFullYear(), today.getMonth() - i + 1, 0);

                const count = await modelUser.count({
                    where: {
                        createdAt: {
                            [Op.between]: [month, monthEnd],
                        },
                    },
                });

                users.push({
                    month: month.toLocaleString('default', { month: 'short' }),
                    users: count,
                });
            }

            // Define types for raw query results
            interface ProductCountResult {
                category: string;
                value: string;
                [key: string]: any;
            }

            interface CategoryResult {
                categoryId: string;
                count: string;
                'category.name'?: string;
                [key: string]: any;
            }

            interface RevenueResult {
                total: string | null;
                [key: string]: any;
            }

            // Get actual categories from the database
            const categories = (await modelProduct.findAll({
                attributes: ['categoryId', [Sequelize.fn('COUNT', Sequelize.col('products.id')), 'count']],
                group: ['categoryId'],
                include: [
                    {
                        model: require('../models/category.model').default,
                        attributes: ['name'],
                    },
                ],
                raw: true,
            })) as unknown as CategoryResult[];

            // Format product data from real categories
            let formattedOrders: Array<{ name: string; value: number }> = [];

            if (categories && categories.length > 0) {
                formattedOrders = categories.map((product) => ({
                    name: product['category.name'] || 'Loại khác',
                    value: parseInt(product.count, 10) || 0,
                }));
            }

            // No fallback product data if nothing is found in database

            // Get daily revenue data for the last 7 days
            const dailyRevenue = [];

            // Helper function to get payment data with calculated revenue
            const getRevenueForDay = async (startDate: Date, endDate: Date) => {
                try {
                    // Get payments for this day
                    const payments = (await modelPayment.findAll({
                        where: {
                            createdAt: {
                                [Op.between]: [startDate, endDate],
                            },
                        },
                        raw: true,
                    })) as any[];

                    if (payments.length === 0) {
                        return 0;
                    }

                    // Calculate revenue from all payments by looking up product prices
                    let totalDayRevenue = 0;

                    for (const payment of payments) {
                        try {
                            // Find the product associated with this payment
                            const product = (await modelProduct.findOne({
                                where: { id: payment.productId },
                                raw: true,
                            })) as any;

                            if (product && product.price) {
                                // Calculate item revenue: product price × quantity
                                const itemRevenue = product.price * payment.quantity;
                                totalDayRevenue += itemRevenue;
                            }
                        } catch (error) {
                            console.error(`Error processing payment ${payment.id}:`, error);
                        }
                    }

                    return totalDayRevenue;
                } catch (error) {
                    console.error(`Error calculating revenue:`, error);
                    return 0;
                }
            };

            // Get revenue for each of the last 7 days
            for (let i = 6; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                date.setHours(0, 0, 0, 0);

                const nextDay = new Date(date);
                nextDay.setDate(nextDay.getDate() + 1);

                // Format date as DD/MM
                const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
                    .toString()
                    .padStart(2, '0')}`;

                // Calculate revenue for this day
                const revenue = await getRevenueForDay(date, nextDay);

                dailyRevenue.push({
                    date: formattedDate,
                    revenue,
                });

                console.log(`Revenue for ${formattedDate}: ${revenue}`);
            }

            // Calculate total revenue from daily revenue
            const totalRevenue = dailyRevenue.reduce((sum, day) => sum + day.revenue, 0);
            console.log('Total revenue calculated:', totalRevenue);

            // Get total orders (payments)
            let totalOrders = 0;
            try {
                totalOrders = await modelPayment.count();
                console.log('Total orders:', totalOrders);
            } catch (error) {
                console.error('Error getting total orders:', error);
            }

            // Prepare and send response
            const statisticsData = {
                users,
                orders: formattedOrders,
                dailyRevenue,
                totalUsers,
                totalOrders,
                totalRevenue,
            };

            console.log('Sending statistics:', JSON.stringify(statisticsData));
            new OK({ message: 'Lấy thống kê thành công', metadata: statisticsData }).send(res);
        } catch (error) {
            console.error('Error in getStatistics:', error);
            next(error);
        }
    }
}

export default new controllerUser();
