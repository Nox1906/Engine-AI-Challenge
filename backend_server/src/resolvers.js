import {
    getAllSecurities,
    getPricesBySecurityId,
    getSecurityByTicker
} from './db/services.js'

//_root o underscore quer dizer que não é utilizado
export const resolvers = {
    Query: {
        security: (_root, { ticker }) => getSecurityByTicker(ticker),
        securities: () => getAllSecurities(),
    },

    Security: {
        id: (security) => security.id,
        prices: (security) => getPricesBySecurityId(security.id)
    }
};
