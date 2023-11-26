import * as React from 'react';
import { useParams } from 'react-router';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';

import useTitle from '../lib/useTitle';
import Copyright from '../components/Copyright';
import PricesChart from '../components/PricesChart';
import { useSecurity } from '../lib/graphql/hooks';
import { Loading } from '../components/Loading';

const defaultTheme = createTheme();

function SecuritiesDetailsPage() {
  useTitle('SecuritiesDetails');
  const { symbol } = useParams();
  //assim não é preciso usar state e effect
  const { security, loading, error, errorMessage } = useSecurity(symbol);

  if (loading) {
    return (<Loading />)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
              height: "97vh",
              
        }}
      >
        <Container sx={{ paddingTop: '100px' }}>
          {error ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {errorMessage}
            </Alert>
          ) : (
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h4" color="inherit">
              {security.ticker} - {security.securityName}
              </Typography>
              <Typography variant="h6" color="inherit">
                <br /> <br />
                <strong>Sector:</strong> {security.sector}
                <br />
                <strong>Country:</strong> {security.country}
                <br /><br />
              </Typography>
              <Paper sx={{ p: 3, display: 'flex' }}>
                <PricesChart prices={security.prices} />
              </Paper>
            </Paper>
          )}
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default SecuritiesDetailsPage;
