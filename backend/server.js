import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import { readFile } from 'node:fs/promises'
import { resolvers } from './resolvers.js';
import {initDB} from './db/services.js'

const PORT = 9000;

const app = express();

const typeDefs = await readFile('./schema.graphql', 'utf8');

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();

app.use(cors(), express.json());
app.use(express.json({ limit: '50mb' }));

/**Express enviará todas as requisições do caminho '/graphql' para o
 * apolloMiddleware para que sejam tratadas pela engine Apollo GraphQL.
 * é assim que se integra um apollo Server com express aplication
 */
app.use('/graphql', apolloMiddleware(apolloServer)); //para auth podemos passar context ao apolloMidleware

await initDB()

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});

