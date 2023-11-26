import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export function Loading() {
    return (
        <Container sx={{
            position: 'absolute',
            left: '50%',
            top: '50%'
        }}>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </Container>
    );
}