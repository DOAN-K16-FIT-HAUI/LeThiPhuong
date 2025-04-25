import { DataTypes } from 'sequelize';
import { connect } from '../config/index';

const payment = connect.define('payment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    idPayment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    productId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    typePayment: {
        type: DataTypes.ENUM('cod', 'vnpay', 'momo'),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled', 'shipping'),
        allowNull: false,
    },
});

export default payment;
