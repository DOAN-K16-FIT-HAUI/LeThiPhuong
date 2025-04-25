interface RequestWithUser extends Request {
    user?: {
        id: string;
        [key: string]: any;
    };
}

import { OK, Created } from '../core/success.response';
import modelProductReview from '../models/productReview.model';
import { Request, Response, NextFunction } from 'express';

class ProductReviewController {
    async createProductReview(req: RequestWithUser, res: Response, next: NextFunction) {
        const { productId, rating, comment } = req.body;
        const { id } = req.user!;
        const productReview = await modelProductReview.create({ productId, rating, comment, userId: id });
        new Created({ message: 'Đánh giá sản phẩm thành công', metadata: productReview }).send(res);
    }
}

export default new ProductReviewController();
