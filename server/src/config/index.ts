import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const connect = new Sequelize('eyeglasses', 'root', 'Pg172003@', {
    host: 'localhost',
    dialect: 'mysql',
});

const connectDB = async () => {
    try {
        await connect.authenticate();
        console.log('Connect Database Success!');
    } catch (error) {
        console.error('error connect database:', error);
    }
};

export { connectDB, connect };
