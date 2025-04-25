import modelUser from './users.model';
import apiKey from './apiKey.model';
import category from './category.model';
import product from './product.model';
import cart from './cartUser.model';
import payment from './payment.model';
import productReview from './productReview.model';
const syncDatabase = async () => {
    try {
        await modelUser.sync({ alter: true });
        await apiKey.sync({ alter: true });
        await category.sync({ alter: true });
        await product.sync({ alter: true });
        await cart.sync({ alter: true });
        await payment.sync({ alter: true });
        await productReview.sync({ alter: true });
    } catch (error) {
        console.error('❌ Sync error:', error);
    }
};

export default syncDatabase;
