import { DataTypes }  from 'sequelize';
import { sq } from '../config.js'

const Price = sq.define('Price', {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        primaryKey: true,
    },
    ticker: {
        type: DataTypes.STRING,
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
            fields: ['ticker']
        }
    ]
});

export {
    Price
}