import { Request, Response, NextFunction } from 'express';

import { BadRequestError, BadUserRequestError } from '../core/error.response';
import { Created, OK } from '../core/success.response';

import modelProduct from '../models/product.model';
import modelCartUser from '../models/cartUser.model';

interface RequestWithUser extends Request {
    user?: {
        id: string;
        [key: string]: any;
    };
}

interface CartUser {
    id: string;
    productId: string;
    quantity: number;
    fullName: string;
    address: string;
    phone: string;
    name: string;
    images: string;
    price: number;
    stock: number;
    save(): Promise<void>;
    destroy(): Promise<void>;
}

async function updateStock(productId: string, quantity: number): Promise<void> {
    const product = (await modelProduct.findOne({ where: { id: productId } })) as unknown as CartUser;
    product.stock -= quantity;
    await product.save();
}

class controllerCartUser {
    async createCartUser(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        const { productId, quantity } = req.body;
        const { id } = req.user!;

        const findProduct = await modelProduct.findOne({ where: { id: productId } });

        if (!findProduct) {
            throw new BadRequestError('Không tìm thấy sản phẩm');
        }

        const findCartUser = (await modelCartUser.findOne({
            where: {
                productId,
                userId: id,
            },
        })) as unknown as CartUser;

        if (findCartUser) {
            // Nếu sản phẩm đã có trong giỏ hàng => tăng số lượng
            findCartUser.quantity += quantity;
            await findCartUser.save();

            await updateStock(productId, quantity);

            new Created({
                message: 'Cập nhật giỏ hàng thành công',
                metadata: findCartUser,
            }).send(res);
            return;
        }

        // Nếu chưa có => tạo mới
        const data = await modelCartUser.create({
            productId,
            quantity,
            userId: id,
        });

        new Created({
            message: 'Tạo giỏ hàng thành công',
            metadata: data,
        }).send(res);
    }

    async getCartUser(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.user!;
        const dataCart = await modelCartUser.findAll({ where: { userId: id } });
        const data = await Promise.all(
            dataCart.map(async (cart: any) => {
                const product = (await modelProduct.findOne({ where: { id: cart.productId } })) as unknown as CartUser;
                return {
                    id: product.id,
                    name: product.name,
                    images: product.images,
                    price: product.price,
                    quantity: cart.quantity,
                    stock: product.stock,
                };
            }),
        );

        new OK({
            message: 'Lấy giỏ hàng thành cong',
            metadata: data,
        }).send(res);
    }

    async changeQuantity(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.user!;
        const { productId, quantity } = req.body;
        const findProduct = (await modelProduct.findOne({ where: { id: productId } })) as unknown as CartUser;
        if (!findProduct) {
            throw new BadRequestError('Không tìm thấy sản phẩm');
        }
        const findCartUser = (await modelCartUser.findOne({
            where: {
                productId,
                userId: id,
            },
        })) as unknown as CartUser;
        if (!findCartUser) {
            throw new BadUserRequestError('Không tìm thấy sản phẩm trong giỏ hàng');
        }
        if (quantity > findProduct.stock) {
            throw new BadUserRequestError('Số lượng sản phẩm không đủ');
        }
        if (quantity < findCartUser.quantity) {
            const increaseStock = findProduct.stock + (findCartUser.quantity - quantity);
            findProduct.stock = increaseStock;
            await findProduct.save();
        } else {
            const decreaseStock = findProduct.stock - (quantity - findCartUser.quantity);
            findProduct.stock = decreaseStock;
            await findProduct.save();
        }
        findCartUser.quantity = quantity;
        await findCartUser.save();
        new OK({ message: 'Cập nhật giỏ hàng thành công', metadata: findCartUser }).send(res);
    }

    async clearProductCart(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.user!;
        const { productId } = req.body;
        const data = await Promise.all(
            productId.map(async (idProduct: string) => {
                const findProduct = (await modelProduct.findOne({ where: { id: idProduct } })) as unknown as CartUser;
                if (!findProduct) {
                    throw new BadRequestError('Không tìm thấy sản phẩm');
                }
                const findCartUser = (await modelCartUser.findOne({
                    where: {
                        productId: idProduct,
                        userId: id,
                    },
                })) as unknown as CartUser;
                if (!findCartUser) {
                    throw new BadUserRequestError('Không tìm thấy sản phẩm trong giỏ hàng');
                }
                findProduct.stock += findCartUser.quantity;
                await findProduct.save();
                await findCartUser.destroy();
            }),
        );

        new OK({ message: 'Xóa sản phẩm trong giỏ hàng tiong', metadata: data }).send(res);
    }

    async updateInfoCart(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.user!;
        const { fullName, address, phone, note } = req.body;
        const data = await modelCartUser.update({ fullName, address, phone, note }, { where: { userId: id } });
        new OK({ message: 'Cập nhật thông tin giỏ hàng thành công', metadata: data }).send(res);
    }
}

export default new controllerCartUser();
