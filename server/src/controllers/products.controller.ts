import modelProduct from '../models/product.model';
import modelProductReview from '../models/productReview.model';
import modelUser from '../models/users.model';
import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';

import { BadRequestError } from '../core/error.response';
import { Created, OK } from '../core/success.response';

import fs from 'fs/promises';

// Define interface for multer request
interface MulterRequest extends Request {
    file?: any;
}

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    stock: number;
    images: string;
    createdAt: Date;
    updatedAt: Date;
}

interface ProductReview {
    userId: string;
}

interface User {
    id: string;
    fullName: string;
}

class controllerProducts {
    async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { name, description, price, categoryId, stock } = req.body;
        if (!name || !description || !price || !categoryId || !stock) {
            throw new BadRequestError('Vui lòng nhập đầy đủ thông tin');
        }
        const image = (req as MulterRequest).file?.filename;
        const data = modelProduct.create({
            name,
            description,
            price,
            images: image,
            categoryId,
            stock,
        });
        new Created({
            message: 'Tạo sản phẩm thành công',
            metadata: data,
        }).send(res);
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.query;
        const product = (await modelProduct.findOne({ where: { id } })) as unknown as Product;
        if (!product) {
            throw new BadRequestError('Sản phẩm không tồn tại');
        }
        await modelProduct.destroy({ where: { id } });
        new OK({
            message: 'Xóa sản phẩm thành công',
        }).send(res);
    }

    async editProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.query;
        const image = (req as MulterRequest).file?.filename;
        const { name, description, price, categoryId, stock } = req.body;
        const product = (await modelProduct.findOne({ where: { id } })) as unknown as Product;
        if (!product) {
            throw new BadRequestError('Sản phẩm không tồn tại');
        }
        await modelProduct.update({ name, description, price, categoryId, stock, images: image }, { where: { id } });
        await fs.unlink(`src/uploads/images/${product.images}`);
        new OK({
            message: 'Cập nhật sản phẩm thành công',
        }).send(res);
    }
    async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.query;
        const product = (await modelProduct.findOne({ where: { id } })) as unknown as Product;
        if (!product) {
            throw new BadRequestError('Sản phẩm không tồn tại');
        }
        const productReview = (await modelProductReview.findAll({
            where: { productId: id },
        })) as unknown as ProductReview[];

        const dataReivew = await Promise.all(
            productReview.map(async (item: any) => {
                const user = (await modelUser.findOne({ where: { id: item.userId } })) as unknown as User;
                return {
                    ...item.dataValues,
                    user: {
                        id: user?.id,
                        fullName: user?.fullName,
                    },
                };
            }),
        );

        const productRelated = (await modelProduct.findAll({
            where: { categoryId: product.categoryId },
        })) as unknown as Product[];
        new OK({
            message: 'Lấy sản phẩm thành công',
            metadata: { product, productRelated, dataReivew },
        }).send(res);
    }

    async searchProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { search } = req.query;
        const products = (await modelProduct.findAll({
            where: { name: { [Op.like]: `%${search}%` } },
        })) as unknown as Product[];
        new OK({
            message: 'Tìm kiếm sản phẩm thành công',
            metadata: products,
        }).send(res);
    }
}
export default new controllerProducts();
