import { readFile } from 'fs/promises';
import { GraphQLError } from 'graphql';

import { Security } from './models/securities.js'
import { Price } from './models/prices.js'
import { sq, testDbConnection } from './config.js'

const initDB = async () => {

    await testDbConnection();

    Security.hasMany(Price, { foreignKey: 'SecurityId' })
    Price.belongsTo(Security, { foreignKey: 'SecurityId' })

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
                        SecurityId: newSecurity.id
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

const getSecurityById = async (id) => {
    const security = await Security.findByPk(id);
    if (!security) {
        throw notFoundError('No Security found with id: ' + id)
    }
    return security;
}

const getPricesBySecurityId = async (securityId) => {
    const prices = await Price.findAll({ where: { SecurityId: securityId }, order: [['date', 'ASC']]})
    return prices;
}

const getSecurityByTicker = async (securityTicker) => {
    const security = await Security.findOne({ where: { ticker: securityTicker } })
    if (!security) {
        throw notFoundError('No Security found with symbol: ' + securityTicker)
    }
    return security;
}

export {
    initDB,
    getAllSecurities , 
    getAllPrices,
    getSecurityById,
    getPricesBySecurityId,
    getSecurityByTicker
}
