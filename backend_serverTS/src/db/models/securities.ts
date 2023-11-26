import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes} from 'sequelize';
import {sequelize} from '../config.js';

class SecurityModel extends Model<InferAttributes<SecurityModel>, InferCreationAttributes<SecurityModel>> {
    // declare id: CreationOptional<number>;
    declare ticker: string;
    declare securityName: string;
    declare sector: string;
    declare country: string;
    declare trend: number;
  }

SecurityModel.init(
    {
        // id: {
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
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
        // indexes: [
        //     {
        //         fields: ['ticker']
        //     }
        // ],
        sequelize
    }
);

export {
    SecurityModel 
}