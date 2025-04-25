import { Router } from 'express';
import { asyncHandler, authAdmin, authUser } from '../auth/checkAuth';

const router = Router();

import controllerPayment from '../controllers/payment.controller';

router.post('/api/payment', authUser, asyncHandler(controllerPayment.createPayment));
router.get('/api/check-payment-vnpay', asyncHandler(controllerPayment.checkPaymentVnpay));
router.get('/api/check-payment-momo', asyncHandler(controllerPayment.checkPaymentMomo));
router.get('/api/payment', asyncHandler(controllerPayment.getPaymentById));
router.get('/api/payment-by-user', authUser, asyncHandler(controllerPayment.getPaymentByUserId));
router.post('/api/cancel-payment', authUser, asyncHandler(controllerPayment.cancelPayment));

router.get('/api/payment-by-admin', asyncHandler(controllerPayment.getPaymentByAdmin));
router.post('/api/update-status-payment', asyncHandler(controllerPayment.updateStatusPayment));

export default router;
