import { Router } from 'express';
import { asyncHandler, authAdmin, authUser } from '../auth/checkAuth';

const router = Router();

import controllerProductReview from '../controllers/productReview.controller';

router.post('/api/product-review', authUser, asyncHandler(controllerProductReview.createProductReview));

export default router;
