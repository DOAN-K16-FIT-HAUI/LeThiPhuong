import { Request, Response, NextFunction } from 'express';

import { BadRequestError, BadUserRequestError } from '../core/error.response';
import { Created, OK } from '../core/success.response';

import modelPayment from '../models/payment.model';
import modelCartUser from '../models/cartUser.model';
import modelProduct from '../models/product.model';

const axios = require('axios');
const crypto = require('crypto');
const { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } = require('vnpay');

interface RequestWithUser extends Request {
    user?: {
        id: string;
        [key: string]: any;
    };
}

interface CartUser {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
    fullName: string;
    address: string;
    phone: string;
    name: string;
    images: string;
    price: number;
    note: string;
    save(): Promise<void>;
    destroy(): Promise<void>;
}

interface Product {
    price: number;
    productId: string;
}

interface Payment {
    id: string;
    idPayment: string;
    userId: string;
    typePayment: string;
    fullName: string;
}

function generatePayID() {
    // Tạo ID thanh toán bao gồm cả giây để tránh trùng lặp
    const now = new Date();
    const timestamp = now.getTime();
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
    return `PAY${timestamp}${seconds}${milliseconds}`;
}

class controllerPayment {
    async createPayment(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.user!;
        const { typePayment } = req.body;
        const cartUser = (await modelCartUser.findAll({ where: { userId: id } })) as unknown as CartUser[];
        const price = await Promise.all(
            cartUser.map(async (item) => {
                const product = (await modelProduct.findOne({
                    where: { id: item.productId },
                })) as unknown as Product;
                return product?.price * item.quantity;
            }),
        );

        const totalPrice = price.reduce((acc, item) => acc + item, 0);
        if (cartUser.length === 0) {
            throw new BadRequestError('Giỏ hàng trống');
        }
        const paymentId = generatePayID();
        if (typePayment === 'cod') {
            const data = await cartUser.map(async (item) => {
                return await modelPayment.create({
                    idPayment: paymentId,
                    userId: id,
                    typePayment,
                    fullName: cartUser[0].fullName,
                    address: cartUser[0].address,
                    phone: cartUser[0].phone,
                    note: cartUser[0].note,
                    status: 'pending',
                    productId: item.productId,
                    quantity: item.quantity,
                });
            });
            await Promise.all(data);
            await modelCartUser.destroy({ where: { userId: id } });
            new OK({ message: 'Thanh toán thành công', metadata: paymentId }).send(res);
        }
        if (typePayment === 'vnpay') {
            const vnpay = new VNPay({
                tmnCode: 'DH2F13SW',
                secureSecret: 'NXZM3DWFR0LC4R5VBK85OJZS1UE9KI6F',
                vnpayHost: 'https://sandbox.vnpayment.vn',
                testMode: true, // tùy chọn
                hashAlgorithm: 'SHA512', // tùy chọn
                loggerFn: ignoreLogger, // tùy chọn
            });
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            const vnpayResponse = await vnpay.buildPaymentUrl({
                vnp_Amount: totalPrice, //
                vnp_IpAddr: '127.0.0.1', //
                vnp_TxnRef: `${cartUser[0]?.userId} + ${paymentId}`, // Sử dụng paymentId thay vì singlePaymentId
                vnp_OrderInfo: `${cartUser[0]?.userId} `,
                vnp_OrderType: ProductCode.Other,
                vnp_ReturnUrl: `http://localhost:3000/api/check-payment-vnpay`, //
                vnp_Locale: VnpLocale.VN, // 'vn' hoặc 'en'
                vnp_CreateDate: dateFormat(new Date()), // tùy chọn, mặc định là hiện tại
                vnp_ExpireDate: dateFormat(tomorrow), // tùy chọn
            });
            new OK({ message: 'Thanh toán thông báo', metadata: vnpayResponse }).send(res);
        }
        if (typePayment === 'momo') {
            var partnerCode = 'MOMO';
            var accessKey = 'F8BBA842ECF85';
            var secretkey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
            var requestId = partnerCode + new Date().getTime();
            var orderId = requestId;
            var orderInfo = `thanh toan ${cartUser[0]?.userId}`; // nội dung giao dịch thanh toán
            var redirectUrl = 'http://localhost:3000/api/check-payment-momo'; // 8080
            var ipnUrl = 'http://localhost:3000/api/check-payment-momo';
            var amount = totalPrice;
            var requestType = 'captureWallet';
            var extraData = ''; //pass empty value if your merchant does not have stores

            var rawSignature =
                'accessKey=' +
                accessKey +
                '&amount=' +
                amount +
                '&extraData=' +
                extraData +
                '&ipnUrl=' +
                ipnUrl +
                '&orderId=' +
                orderId +
                '&orderInfo=' +
                orderInfo +
                '&partnerCode=' +
                partnerCode +
                '&redirectUrl=' +
                redirectUrl +
                '&requestId=' +
                requestId +
                '&requestType=' +
                requestType;
            //puts raw signature

            //signature
            var signature = crypto.createHmac('sha256', secretkey).update(rawSignature).digest('hex');

            //json object send to MoMo endpoint
            const requestBody = JSON.stringify({
                partnerCode: partnerCode,
                accessKey: accessKey,
                requestId: requestId,
                amount: amount,
                orderId: orderId,
                orderInfo: orderInfo,
                redirectUrl: redirectUrl,
                ipnUrl: ipnUrl,
                extraData: extraData,
                requestType: requestType,
                signature: signature,
                lang: 'en',
            });

            const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            new OK({ message: 'Thanh toán thông báo', metadata: response.data }).send(res);
        }
    }

    async checkPaymentVnpay(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        const { vnp_ResponseCode, vnp_OrderInfo } = req.query;
        if (vnp_ResponseCode === '00') {
            const idCart = vnp_OrderInfo?.toString().split(' ')[0];
            const paymentId = generatePayID();
            const findCart = (await modelCartUser.findAll({
                where: { userId: idCart },
            })) as unknown as CartUser[];
            findCart.map(async (item) => {
                return await modelPayment.create({
                    idPayment: paymentId,
                    userId: item.userId,
                    typePayment: 'vnpay',
                    fullName: findCart[0].fullName,
                    address: findCart[0].address,
                    phone: findCart[0].phone,
                    note: findCart[0].note,
                    status: 'pending',
                    productId: item.productId,
                    quantity: item.quantity,
                });
            });

            await modelCartUser.destroy({ where: { userId: idCart } });
            return res.redirect(`http://localhost:5173/payments/${paymentId}`);
        }
    }

    async checkPaymentMomo(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        const { orderInfo, resultCode } = req.query;

        if (resultCode === '0') {
            const result = orderInfo?.toString().split(' ')[2];
            const findCart = (await modelCartUser.findAll({ where: { userId: result } })) as unknown as CartUser[];
            // Tạo mã thanh toán mới cho mỗi thanh toán Momo
            const paymentId = generatePayID();

            findCart.map(async (item) => {
                return modelPayment.create({
                    userId: item.userId,
                    productId: item.productId,
                    quantity: item.quantity,
                    fullName: item.fullName,
                    phone: item.phone,
                    address: item.address,
                    status: 'pending',
                    typePayment: 'MOMO',
                    idPayment: paymentId, // Sử dụng paymentId mới
                });
            });

            await modelCartUser.destroy({ where: { userId: result } });
            return res.redirect(`http://localhost:5173/payments/${paymentId}`);
        }
    }

    async getPaymentById(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.query;
        const payment = (await modelPayment.findAll({ where: { idPayment: id } })) as unknown as {
            dataValues: {
                productId: string;
                quantity: number;
                [key: string]: any;
            };
        }[];

        const data = await Promise.all(
            payment?.map(async (item) => {
                const product = (await modelProduct.findOne({
                    where: { id: item.dataValues.productId },
                })) as unknown as CartUser;
                return { ...item.dataValues, product, totalPrice: product.price * item.dataValues.quantity };
            }),
        );
        new OK({ message: 'Thanh toán thành công', metadata: data }).send(res);
    }

    async getPaymentByUserId(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.user!;
        const payments = (await modelPayment.findAll({ where: { userId: id } })) as unknown as {
            dataValues: {
                productId: string;
                quantity: number;
                idPayment: string;
                [key: string]: any;
            };
        }[];

        // Group payments by idPayment
        const paymentGroups: { [key: string]: any[] } = {};

        // First pass: group payments by idPayment
        for (const payment of payments) {
            const { idPayment } = payment.dataValues;
            if (!paymentGroups[idPayment]) {
                paymentGroups[idPayment] = [];
            }
            paymentGroups[idPayment].push(payment);
        }

        // Second pass: process each group
        const groupedOrders = await Promise.all(
            Object.entries(paymentGroups).map(async ([idPayment, paymentGroup]) => {
                // Get the first payment for order details (they share same order info)
                const orderInfo = paymentGroup[0].dataValues;

                // Get details for all products in this order
                const products = await Promise.all(
                    paymentGroup.map(async (item) => {
                        const product = (await modelProduct.findOne({
                            where: { id: item.dataValues.productId },
                        })) as unknown as CartUser;

                        return {
                            productDetails: product,
                            quantity: item.dataValues.quantity,
                            productId: item.dataValues.productId,
                            itemPrice: product.price * item.dataValues.quantity,
                        };
                    }),
                );

                // Calculate total order price
                const orderTotal = products.reduce((sum, item) => sum + item.itemPrice, 0);

                return {
                    idPayment,
                    fullName: orderInfo.fullName,
                    address: orderInfo.address,
                    phone: orderInfo.phone,
                    typePayment: orderInfo.typePayment,
                    status: orderInfo.status,
                    note: orderInfo.note,
                    createdAt: orderInfo.createdAt,
                    products,
                    orderTotal,
                };
            }),
        );

        new OK({ message: 'Thanh toán thành công', metadata: groupedOrders }).send(res);
    }

    async cancelPayment(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        const { idPayment } = req.body;
        await modelPayment.update({ status: 'cancelled' }, { where: { idPayment } });
        new OK({ message: 'Thanh toán đã được hủy' }).send(res);
    }

    async getPaymentByAdmin(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        const payments = (await modelPayment.findAll()) as unknown as {
            dataValues: {
                productId: string;
                quantity: number;
                idPayment: string;
                [key: string]: any;
            };
        }[];

        // Group payments by idPayment
        const paymentGroups: { [key: string]: any[] } = {};

        // First pass: group payments by idPayment
        for (const payment of payments) {
            const { idPayment } = payment.dataValues;
            if (!paymentGroups[idPayment]) {
                paymentGroups[idPayment] = [];
            }
            paymentGroups[idPayment].push(payment);
        }

        // Second pass: process each group
        const groupedOrders = await Promise.all(
            Object.entries(paymentGroups).map(async ([idPayment, paymentGroup]) => {
                // Get the first payment for order details (they share same order info)
                const orderInfo = paymentGroup[0].dataValues;

                // Get details for all products in this order
                const products = await Promise.all(
                    paymentGroup.map(async (item) => {
                        const product = (await modelProduct.findOne({
                            where: { id: item.dataValues.productId },
                        })) as unknown as CartUser;

                        return {
                            productDetails: product,
                            quantity: item.dataValues.quantity,
                            productId: item.dataValues.productId,
                            itemPrice: product.price * item.dataValues.quantity,
                        };
                    }),
                );

                // Calculate total order price
                const orderTotal = products.reduce((sum, item) => sum + item.itemPrice, 0);

                return {
                    idPayment,
                    userId: orderInfo.userId,
                    fullName: orderInfo.fullName,
                    address: orderInfo.address,
                    phone: orderInfo.phone,
                    typePayment: orderInfo.typePayment,
                    status: orderInfo.status,
                    note: orderInfo.note,
                    createdAt: orderInfo.createdAt,
                    products,
                    orderTotal,
                };
            }),
        );

        new OK({ message: 'Thanh toán thành công', metadata: groupedOrders }).send(res);
    }

    async updateStatusPayment(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        const { idPayment, status } = req.body;
        await modelPayment.update({ status }, { where: { idPayment } });
        new OK({ message: 'Trạng thái thanh toán đã được cập nhật' }).send(res);
    }
}

export default new controllerPayment();
