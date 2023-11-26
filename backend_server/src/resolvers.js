import {
    getAllSecurities,
    getPricesByTicker,
    getSecurityByPk
} from './db/services.js'

//_root o underscore quer dizer que não é utilizado
export const resolvers = {
    Query: {
        security: (_root, { ticker }) => getSecurityByPk(ticker),
        securities: () => getAllSecurities(),
    },

    Security: {
        prices: (security) => getPricesByTicker(security.ticker)
    }
};
