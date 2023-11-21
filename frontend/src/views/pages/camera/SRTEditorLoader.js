import React from 'react';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@mui/material/Skeleton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Button, CircularProgress } from '@mui/material';

const useStyles =
    makeStyles((theme) => (
        {
            inputDiv:
            {
                width: '100%',
                minHeight: '3.47vh',
                color: '#7d7d7d',
                marginTop: '1.9vh',
                paddingLeft: 'calc(2.86vw + 2.59vh)',
                whiteSpace: 'pre-line',
                '&:focus':
                {
                    outline: 'none'
                }
            },
        }
    ));


function SRTEditorLoader() {

    const classes = useStyles();
    console.log("HELLO")

    return (
        <>
            <Grid item container direction='column'>
                <Grid item container direction='row'>
                    <Grid item container
                        style={{
                            width: '45%', height: '60vh', border: '2px solid #b3b3b3', borderRadius: '4px', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', marginLeft: '3%', marginTop: '3%'
                        }} >
                        {
                            [1, 2, 3, 4].map(() => (
                                <Grid item container='column'
                                    style={{ width: '97.5%', height: 'auto', borderBottom: '2px solid white', }} >
                                    <Grid item container
                                        style={{ width: '100%', height: '8vh', marginTop: '1.9vh', marginBottom: '1.9vh' }} >
                                        <Grid item container justify='space-between' alignItems='cente ' style={{ height: '100%' }} >
                                            <Grid item container xs={6} style={{ height: '30%' }} >
                                                <Grid item style={{ height: '2.59vh', width: '2.59vh', fontSize: '2.59vh', color: '#5695cd', marginLeft: '1.3vw', fontWeight: 'bold' }} >
                                                    <Skeleton variant='rectangular' width="100%" height='100%' />
                                                </Grid>
                                                <Grid item container justify='space-evenly' alignItems='center' style={{ width: '11.51vw', height: '100%', borderRadius: '4px', marginLeft: '1.56vw' }} >
                                                    <Skeleton variant='rectangular' width='100%' height='100%' />
                                                </Grid>
                                            </Grid>
                                            <div class='input' className={classes.inputDiv} >
                                                <Skeleton variant='text' />
                                                <Skeleton variant='text' />
                                            </div>
                                        </Grid>
                                    </Grid>
                                    {/* subtitle text */}
                                    <Grid item container
                                        style={{ width: '100%', height: 16, marginTop: '1.9vh' }} >
                                        <Grid item container justify='center' alignItems='center' style={{ width: '100%' }} >
                                            <img src='images/CustomHR.png' style={{ width: '100%', height: '2px' }} />
                                            {/* '98%' */}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))
                        }
                    </Grid>
                    <Grid item container
                        style={{
                            width: '45%', height: '60vh', border: '2px solid #b3b3b3', borderRadius: '4px', display: 'flex', backgroundColor: 'black',
                            alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', marginLeft: '3%', marginTop: '3%'
                        }} >
                        <CircularProgress />
                    </Grid>
                </Grid>
                <Grid item container justifyContent="center" style={{ marginTop: "5vh", height: "5%" }}>
                <Button
                    type="button"
                    disableRipple={true}
                    disabled
                    style={{ backgroundColor: '#0e66ac' , borderRadius: '4px', paddingTop: "2.5%", color: "white", fontSize: "14px", paddingLeft: "10%", paddingRight: "10%" }}
                >
                </Button>
                {/* </Grid> */}
            </Grid>
            <Grid item container justifyContent="center" style={{ height: "5%" }}></Grid>
            </Grid>
        </>
    )
}

export default SRTEditorLoader;