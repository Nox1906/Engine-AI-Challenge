import {
    getAllSecurities,
    getPricesByTicker,
    getSecurityByPk
} from './db/services.js'
import { Resolvers } from './generated/schema.js'

//_root o underscore quer dizer que não é utilizado
export const resolvers: Resolvers = {
    Query: {
        security: async (_root, { ticker }) => await getSecurityByPk(ticker),
        securities: async () => await getAllSecurities(),
    },

    Security: {
        prices: async (security) => await getPricesByTicker(security.ticker)
    }
};
