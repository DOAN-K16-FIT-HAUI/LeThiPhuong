import { Router } from 'express';
import { asyncHandler, authAdmin, authUser } from '../auth/checkAuth';
import controllerUser from '../controllers/users.controller';

import { Request, Response, NextFunction } from 'express';

const router = Router();

router.post('/api/register', asyncHandler(controllerUser.register));
router.post('/api/login', asyncHandler(controllerUser.login));
router.get('/api/auth', authUser, asyncHandler(controllerUser.authUser));
router.get('/api/refresh-token', asyncHandler(controllerUser.refreshToken));
router.get('/api/logout', authUser, controllerUser.logout);
router.post('/api/update-info', authUser, asyncHandler(controllerUser.updateInfoUser));

router.get('/api/get-all-user', authAdmin, asyncHandler(controllerUser.getAllUser));
router.post('/api/update-user', authAdmin, asyncHandler(controllerUser.updateUser));
router.get('/api/statistics', authAdmin, asyncHandler(controllerUser.getStatistics));

router.get('/admin', authAdmin, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: 'Admin',
    });
});

export default router;
