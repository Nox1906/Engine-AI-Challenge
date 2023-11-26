import { DataTypes }  from 'sequelize';
import { sq } from '../config.js'

const Security = sq.define('Security', {
    ticker: {
        type: DataTypes.TEXT,
        allowNull: false
    }, 
    securityName: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    sector: {
        type: DataTypes.TEXT
    },
    country : {
        type: DataTypes.TEXT
    },
    trend: {
        type: DataTypes.DOUBLE,

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
    Security
}