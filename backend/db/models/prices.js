import { DataTypes }  from 'sequelize';
import { sq } from '../config.js'

const Price = sq.define('Price', {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        primaryKey: true,
    },
    SecurityId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    close: {
        type: DataTypes.DOUBLE
    },
    volume: {
        type: DataTypes.INTEGER
    }
},{
    timestamps: false, 
    indexes: [
        {
            fields: ['SecurityId']
        }
    ]
});

export {
    Price
}