import { Request, Response, NextFunction } from 'express';

import { BadRequestError } from '../core/error.response';
import { Created, OK } from '../core/success.response';

import modelCategory from '../models/category.model';
import modelProduct from '../models/product.model';

class controllerCategory {
    async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { nameCategory } = req.body;
        if (!nameCategory) {
            throw new BadRequestError('Vui lòng nhập đầy đủ thông tin');
        }
        const data = modelCategory.create({
            name: nameCategory,
        });
        new Created({
            message: 'Tạo danh mục thành công',
            metadata: data,
        }).send(res);
    }

    async getCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        const dataCategory = await modelCategory.findAll({
            raw: true, // Get plain objects instead of Sequelize instances
        });

        const data = await Promise.all(
            dataCategory.map(async (category: any) => {
                const products = await modelProduct.findAll({
                    where: {
                        categoryId: category.id,
                    },
                    limit: 10,
                    raw: true, // Get plain objects instead of Sequelize instances
                });

                return {
                    id: category.id,
                    name: category.name,
                    products: products,
                };
            }),
        );

        new OK({
            message: 'Lấy danh mục thành công',
            metadata: data,
        }).send(res);
    }

    async getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.query;
        if (id === 'all') {
            const data = await modelProduct.findAll({
                raw: true,
            });
            new OK({
                message: 'Lấy danh mục thành công',
                metadata: data,
            }).send(res);
        } else {
            const data = await modelProduct.findAll({
                where: {
                    categoryId: id,
                },
            });
            new OK({
                message: 'Lấy danh mục thành công',
                metadata: data,
            }).send(res);
        }
    }

    async editCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { idCategory, nameCategory } = req.body;
        if (!idCategory || !nameCategory) {
            throw new BadRequestError('Vui lòng nhập đầy đủ thông tin');
        }
        const data = await modelCategory.update(
            {
                name: nameCategory,
            },
            {
                where: {
                    id: idCategory,
                },
            },
        );
        new OK({
            message: 'Cập nhật danh mục thành công',
            metadata: data,
        }).send(res);
    }

    async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { idCategory } = req.query;
        if (!idCategory) {
            throw new BadRequestError('Vui lòng nhập đầy đủ thông tin');
        }
        const data = await modelCategory.destroy({
            where: {
                id: idCategory,
            },
        });
        await modelProduct.destroy({
            where: {
                categoryId: idCategory,
            },
        });
        new OK({
            message: 'Xóa danh mục thành công',
            metadata: data,
        }).send(res);
    }
}

export default new controllerCategory();
