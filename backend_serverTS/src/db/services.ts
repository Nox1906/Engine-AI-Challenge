import { readFile } from 'fs/promises';

import { GraphQLError } from 'graphql';

import { SecurityModel } from './models/securities.js'
import { PriceModel } from './models/prices.js'
import { sequelize, testDbConnection } from './config.js'

import { Transaction, Model } from 'sequelize';

const initDB = async () => {

    await testDbConnection();

    SecurityModel.hasMany(PriceModel, { sourceKey: 'ticker', foreignKey: 'ticker' })

    await SecurityModel.sync({ force: true })
    await PriceModel.sync({ force: true })

    const rawData = await readFile('src/data/data.json', 'utf8');
    const data = JSON.parse(rawData);

    try {
        const result = await sequelize.transaction(async (t: Transaction) => {
            return await Promise.all(data.map(async (SecurityData: any) => {
                const newSecurity = await SecurityModel.create({
                    ticker: SecurityData.ticker,
                    securityName: SecurityData.securityName,
                    sector: SecurityData.sector,
                    country: SecurityData.country,
                    trend: SecurityData.trend
                }, {transaction: t});

                return await Promise.all(SecurityData.prices.map(async (priceData: any) => {
                    const newPrice = await PriceModel.create({
                        date: priceData.date,
                        close: priceData.close,
                        volume: priceData.volume,
                        ticker: newSecurity.ticker
                    }, {transaction: t});
                }));
            }));
        });
    }catch (error) {
        console.log("\n data.json file with errors. No data was inserted\n");
    }
}

function notFoundError(message: string) {
 return new GraphQLError(message , {
    extensions: {code: 'NOT_FOUND'},
});
}

const getAllSecurities = async () => {
    const securities = await SecurityModel.findAll();
    return securities;
}

const getAllPrices = async () => {
    const prices = await PriceModel.findAll();
    return prices;
}

const getPricesByTicker = async (securityTicker: string) => {
    const prices = await PriceModel.findAll({ where: { ticker: securityTicker }, order: [['date', 'ASC']]})
    return prices;
}
const getSecurityByPk = async (ticker: string) => {
    const security = await SecurityModel.findByPk(ticker);
    if (!security) {
        throw notFoundError('No Security found with ticker: ' + ticker)
    }
    return security;
}


export {
    initDB,
    getAllSecurities , 
    getAllPrices,
    getPricesByTicker ,
    getSecurityByPk
}
