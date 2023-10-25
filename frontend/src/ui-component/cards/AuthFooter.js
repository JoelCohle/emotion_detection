// material-ui
import { Link, Typography, Stack, Grid } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Grid container align={"center"}>
            <Typography variant="subtitle2" component={Link} target="_blank" underline="hover">
                ocr-domain-name-here
            </Typography>
        </Grid>
    </Stack>
);

export default AuthFooter;
