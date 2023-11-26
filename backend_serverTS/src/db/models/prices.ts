import { Model, InferAttributes, InferCreationAttributes, ForeignKey, DataTypes} from 'sequelize';
import {sequelize} from '../config.js'
import {SecurityModel} from './securities.js'

class PriceModel extends Model<InferAttributes<PriceModel>, InferCreationAttributes<PriceModel>> {
    declare date: string;
    declare close: string;
    declare volume: string;
    declare ticker: ForeignKey<SecurityModel['ticker']>;
  }

PriceModel.init(
    {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        primaryKey: true,
    },
    ticker: {
        type: DataTypes.STRING(128),
        primaryKey: true,
        allowNull: false,
    },
    close: {
        type: DataTypes.FLOAT
    },
    volume: {
        type: DataTypes.INTEGER
    }
},  
{
    tableName: 'Prices',
    timestamps: false,
    indexes: [
        {
            fields: ['ticker']
        }
    ],
    sequelize // passing the `sequelize` instance is required
  });

export {
    PriceModel 
}
  