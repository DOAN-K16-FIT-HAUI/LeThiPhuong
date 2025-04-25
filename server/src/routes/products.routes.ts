import { Router } from 'express';
import { asyncHandler, authAdmin, authUser } from '../auth/checkAuth';
import controllerProducts from '../controllers/products.controller';
const router = Router();

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req: Request, file: any, cb: any) {
        cb(null, 'src/uploads/images');
    },
    filename: function (req: Request, file: any, cb: any) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

var upload = multer({ storage: storage });

router.post('/api/create-product', authAdmin, upload.single('file'), asyncHandler(controllerProducts.createProduct));
router.get('/api/product', asyncHandler(controllerProducts.getProductById));
router.get('/api/search-product', asyncHandler(controllerProducts.searchProduct));
router.put('/api/edit-product', authAdmin, upload.single('file'), asyncHandler(controllerProducts.editProduct));
router.delete('/api/delete-product', authAdmin, asyncHandler(controllerProducts.deleteProduct));
export default router;
