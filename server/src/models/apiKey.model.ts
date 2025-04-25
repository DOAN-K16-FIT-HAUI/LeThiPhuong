import { DataTypes } from 'sequelize';
import { connect } from '../config/index';

import modelUser from './users.model';

const apiKey = connect.define('apiKey', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    publicKey: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    privateKey: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

modelUser.hasOne(apiKey, { foreignKey: 'userId' });
apiKey.belongsTo(modelUser, { foreignKey: 'userId' });

export default apiKey;
