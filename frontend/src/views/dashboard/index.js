import React from 'react';

import { Grid, Button } from '@mui/material';
import { gridSpacing } from 'store/constant';

import ScanUpload from './ScanUpload';
import Category from './category';
import VideoRecorder from './category';

// ==============================|| DEFAULT DASHBOARD ||============================== //
const Dashboard = () => {

    return (

        <Grid container spacing={gridSpacing} sx={{mt:['10%', '10%', '10%']}}>
            <ScanUpload/> 
            {/* <VideoRecorder/> */}
        </Grid>
    );
};

export default Dashboard;
