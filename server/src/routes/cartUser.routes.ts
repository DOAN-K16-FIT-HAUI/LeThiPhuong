import { Router } from 'express';
import { asyncHandler, authAdmin, authUser } from '../auth/checkAuth';

const router = Router();

import controllerCartUser from '../controllers/cartUser.controller';

router.post('/api/add-to-cart', authUser, asyncHandler(controllerCartUser.createCartUser));
router.get('/api/cart', authUser, asyncHandler(controllerCartUser.getCartUser));
router.post('/api/change-quantity', authUser, asyncHandler(controllerCartUser.changeQuantity));
router.post('/api/clear-product', authUser, asyncHandler(controllerCartUser.clearProductCart));
router.post('/api/update-info-cart', authUser, asyncHandler(controllerCartUser.updateInfoCart));

export default router;
