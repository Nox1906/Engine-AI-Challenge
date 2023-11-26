import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Navbar() {
    return (
        <MuiAppBar >
            <Toolbar
            >
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                >
                    <Link href='/securities' color='inherit' underline='none'>
                        Securities
                    </Link>
                </Typography>
            </Toolbar>
        </MuiAppBar>
    );
}