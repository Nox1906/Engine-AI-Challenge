import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:9000/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only'
    }
  }
});

/* gql syntax highlight*/

const getSecuritiesQuery = gql`
  query Securities {
    securities {
      ticker
      securityName
      sector
      country
      trend
    }
  }
`;

const getSecurityDetailByTickerQuery = gql`
  query SecurityByTicker ($ticker: String! ){
    security(ticker: $ticker ) {
      ticker
      securityName
      sector
      country
      prices {
        date
        close
        volume
        }
    }
  } 
`;

export {
  getSecuritiesQuery,
  getSecurityDetailByTickerQuery
}