import * as React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import useTitle from '../lib/useTitle';
import Securities from '../components/Securities';
import Copyright from '../components/Copyright';
import { useSecurities } from '../lib/graphql/hooks'
import { Loading } from '../components/Loading';

const defaultTheme = createTheme();

export default function SecuritiesPage() {
  const { securities, loading, error, errorMessage } = useSecurities();

  useTitle('Security List');

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
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
              <Securities securities={securities} />
            </Paper>
          )}
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
