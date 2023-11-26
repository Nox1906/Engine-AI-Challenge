import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { readFile } from 'node:fs/promises'
import { resolvers } from './resolvers.js';
import {initDB} from './db/services.js'


interface MyContext {
  token?: String;
}

const PORT = 9000;

const app = express();
const httpServer = http.createServer(app);

const typeDefs = await readFile('./schema.graphql', 'utf8');

const apolloServer = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await apolloServer.start();

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(apolloServer, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

app.use(cors(), express.json());
app.use(express.json({ limit: '50mb' }));

/**Express enviará todas as requisições do caminho '/graphql' para o
 * apolloMiddleware para que sejam tratadas pela engine Apollo GraphQL.
 * é assim que se integra um apollo Server com express aplication
 */

await initDB()

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});

