import { Express, Request, Response } from 'express';

import usersRoutes from './users.routes';
import categoryRoutes from './category.routes';
import productsRoutes from './products.routes';
import cartUserRoutes from './cartUser.routes';
import paymentRoutes from './payment.routes';
import productReviewRoutes from './productReview.routes';
function route(app: Express) {
    app.post('/api/register', usersRoutes);
    app.post('/api/login', usersRoutes);
    app.get('/api/auth', usersRoutes);
    app.get('/api/refresh-token', usersRoutes);
    app.get('/api/logout', usersRoutes);
    app.post('/api/update-info', usersRoutes);

    app.get('/api/get-all-user', usersRoutes);
    app.post('/api/update-user', usersRoutes);

    app.get('/api/statistics', usersRoutes);

    app.get('/admin', usersRoutes);

    /// category
    app.post('/api/create-category', categoryRoutes);
    app.get('/api/category', categoryRoutes);
    app.get('/api/category-by-id', categoryRoutes);
    app.post('/api/edit-category', categoryRoutes);
    app.delete('/api/delete-category', categoryRoutes);

    /// products
    app.post('/api/create-product', productsRoutes);
    app.get('/api/product', productsRoutes);
    app.get('/api/search-product', productsRoutes);
    app.put('/api/edit-product', productsRoutes);
    app.delete('/api/delete-product', productsRoutes);

    //// cart
    app.post('/api/add-to-cart', cartUserRoutes);
    app.get('/api/cart', cartUserRoutes);
    app.post('/api/change-quantity', cartUserRoutes);
    app.post('/api/clear-product', cartUserRoutes);
    app.post('/api/update-info-cart', cartUserRoutes);

    /// payment
    app.post('/api/payment', paymentRoutes);
    app.get('/api/check-payment-vnpay', paymentRoutes);
    app.get('/api/check-payment-momo', paymentRoutes);
    app.get('/api/payment', paymentRoutes);
    app.get('/api/payment-by-user', paymentRoutes);
    app.post('/api/cancel-payment', paymentRoutes);
    app.get('/api/payment-by-admin', paymentRoutes);
    app.post('/api/update-status-payment', paymentRoutes);

    /// product review
    app.post('/api/product-review', productReviewRoutes);
}

export default route;
