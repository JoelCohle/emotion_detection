import React from 'react';

import { Grid, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

// import SubtitleCreator from './Script'
import WebcamCapture from './Camera'
import EmotionDetection from './EmotionDetection';
import PreviewPage from './Preview';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        width: '300px',
        minHeight: '20px',
        height: '50px',
        borderRadius: '10px',
        border: '1px solid #ebebeb',
        '&:hover': {
            border: '1px solid #ebebeb',
        },
        margin: '20px auto', // Center the dropdown
        fontSize: '16px',
    }),
};

const RecordVideo = (props) => {
    const [currentPage, setCurrentPage] = useState('');
    const [currJob, setCurrJob] = useState(null);
    const [jobStatus, setJobStatus] = useState("Analysis");

    useEffect(() => {
        const jobDetails = JSON.parse(localStorage.getItem("jobStruct"));
        console.log(jobDetails)
        // axios.get("http://localhost:4000/job/getjobdetails", {
        //     params: { _id: jobDetails._id }
        // })
        //     .then(res => {
        //         console.log(res.data);
        //         setCurrJob(res.data);
        //         setJobStatus(res.data.status);
        //         let storedData = JSON.parse(localStorage.getItem("jobStruct"));
        //         if (storedData !== null) {
        //             localStorage.removeItem("jobStruct");
        //         }
        //         localStorage.setItem("jobStruct", JSON.stringify(res.data));
        //     }
        //     )
        //     .catch(err => {
        //         console.log(err);
        //         console.log("Failure in response")
        //     });
    }, []);


    return (
        <div>
            <Grid container justifyContent="center" height="80vh">

                {/* <Grid item xs={6} md={3}> */}
                {jobStatus === 'Created' && (
                    <div>
                        <WebcamCapture />
                    </div>
                )}

                {jobStatus === 'Recorded' && (
                    <div>
                        <EmotionDetection />
                    </div>
                )}
                {jobStatus === 'Analysis' && (
                    <div>
                        <PreviewPage />
                    </div>
                )}

            </Grid>
        </div>

    );
};

export default RecordVideo;
