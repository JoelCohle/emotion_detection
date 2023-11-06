import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Grid } from '@mui/material';

// project imports
import ProfileSection from './ProfileSection';

// assets
import { IconMenu2 } from '@tabler/icons';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();

    return (
        <Grid container>
            <Grid item xs={10} sm={11}>
                {/* logo & toggler button */}
                <Box
                    sx={{
                        width: 228,
                        display: 'flex',
                        [theme.breakpoints.down('md')]: {
                            width: 'auto'
                        }
                    }}
                >
                    {/* <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                        OCR LOGO HERE
                    </Box> */}
                    
                    {/* <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                        <Avatar
                            variant="rounded"
                            sx={{
                                ...theme.typography.commonAvatar,
                                ...theme.typography.mediumAvatar,
                                transition: 'all .2s ease-in-out',
                                background: theme.palette.secondary.light,
                                color: theme.palette.secondary.dark,
                                '&:hover': {
                                    background: theme.palette.secondary.dark,
                                    color: theme.palette.secondary.light
                                }
                            }}
                            onClick={handleLeftDrawerToggle}
                            color="inherit"
                        >
                            <IconMenu2 stroke={1.5} size="1.3rem" />
                        </Avatar>
                    </ButtonBase> */}
                </Box>
            </Grid>
            <Grid item xs={2} sm={1}>
                {/* profile section */}
                <ProfileSection />
            </Grid>
        </Grid>
        
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
