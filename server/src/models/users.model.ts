import { DataTypes } from 'sequelize';
import { connect } from '../config/index';

const User = connect.define(
    'users',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isAdmin: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0',
        },
    },
    {
        freezeTableName: true, // 👈 Giữ nguyên tên bảng là 'users'
        timestamps: true,
    },
);

export default User;
