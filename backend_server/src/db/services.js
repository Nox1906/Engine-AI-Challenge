import { readFile } from 'fs/promises';
import { GraphQLError } from 'graphql';

import { Security } from './models/securities.js'
import { Price } from './models/prices.js'
import { sq, testDbConnection } from './config.js'

const initDB = async () => {

    await testDbConnection();

    Security.hasMany(Price, { sourceKey: 'ticker', foreignKey: 'ticker' })

    await Security.sync({ force: true })
    await Price.sync({ force: true })

    const data = JSON.parse(await readFile(new URL('../data/data.json', import.meta.url)));

    try {
        const result = await sq.transaction(async (t) => {

            return await Promise.all(data.map(async SecurityData => {
                const newSecurity = await Security.create({
                    ticker: SecurityData.ticker,
                    securityName: SecurityData.securityName,
                    sector: SecurityData.sector,
                    country: SecurityData.country,
                    trend: SecurityData.trend
                }, {transaction: t});

                return await Promise.all(SecurityData.prices.map(async priceData => {
                    const newPrice = await Price.create({
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

function notFoundError(message) {
 return new GraphQLError(message , {
    extensions: {code: 'NOT_FOUND'},
});
}

const getAllSecurities = async () => {
    const securities = await Security.findAll();
    return securities;
}

const getAllPrices = async () => {
    const prices = await Price.findAll();
    return prices;
}

const getSecurityByPk = async (ticker) => {
    const security = await Security.findByPk(ticker);
    if (!security) {
        throw notFoundError('No Security found with ticker: ' + ticker)
    }
    return security;
}

const getPricesByTicker = async (securityTicker) => {
    const prices = await Price.findAll({ where: { ticker: securityTicker }, order: [['date', 'ASC']]})
    return prices;
}


export {
    initDB,
    getAllSecurities , 
    getAllPrices,
    getSecurityByPk,
    getPricesByTicker
}
