import { Router } from 'express';
import { asyncHandler, authAdmin, authUser } from '../auth/checkAuth';

const router = Router();

import controllerCategory from '../controllers/category.controller';

router.post('/api/create-category', authAdmin, asyncHandler(controllerCategory.createCategory));
router.get('/api/category', asyncHandler(controllerCategory.getCategory));
router.get('/api/category-by-id', asyncHandler(controllerCategory.getCategoryById));
router.post('/api/edit-category', authAdmin, asyncHandler(controllerCategory.editCategory));
router.delete('/api/delete-category', authAdmin, asyncHandler(controllerCategory.deleteCategory));

export default router;
