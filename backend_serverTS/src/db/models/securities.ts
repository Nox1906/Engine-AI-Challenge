import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes} from 'sequelize';
import {sequelize} from '../config.js';

class SecurityModel extends Model<InferAttributes<SecurityModel>, InferCreationAttributes<SecurityModel>> {
    declare ticker: string;
    declare securityName: string;
    declare sector: string;
    declare country: string;
    declare trend: number;
  }

SecurityModel.init(
    {
        ticker: {
            type: DataTypes.STRING(128),
            allowNull: false,
            primaryKey: true,
        }, 
        securityName: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        sector: {
            type: DataTypes.STRING(128),
        },
        country : {
            type: DataTypes.STRING(128),
        },
        trend: {
            type: DataTypes.FLOAT,
    
        }
    },
    {
        tableName: 'Securities',
        timestamps: false, 
        sequelize
    }
);

export {
    SecurityModel 
}