
import { ApolloProvider } from '@apollo/client';
import { Route, Routes, Navigate } from 'react-router-dom';

import {apolloClient} from './lib/graphql/queries'
import SecuritiesPage from './pages/SecuritiesPage';
import SecuritiesDetailsPage from './pages/SecuritiesDetailsPage';
import ErrorPage from './pages/ErrorPage'
import Navbar from './components/Navbar';

function App() {

  return (
    <ApolloProvider client={apolloClient}>
        <Navbar />
        <Routes>
          <Route index path="/"
            element={(<Navigate replace to="/securities" />)}
          />
          <Route path="/securities"
            element={<SecuritiesPage />}
          />
          <Route path="/securities/:symbol"
            element={<SecuritiesDetailsPage />}
          />
          <Route
            path="*" 
            element={<ErrorPage />}
            />
        </Routes>
    </ApolloProvider>
  );
}

export default App;
