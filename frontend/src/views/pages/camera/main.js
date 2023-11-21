import React from 'react';

import { Grid, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

// import SubtitleCreator from './Script'
import WebcamCapture from './Camera'
import EmotionDetection from './EmotionDetection';
import PreviewPage from './Preview';
import TestPage from './Test';
import SRTEditorLoader from './SRTEditorLoader';

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
    const [currJob, setCurrJob] = useState(null);
    const [jobStatus, setJobStatus] = useState("");

    useEffect(() => {
        const jobDetails = JSON.parse(localStorage.getItem("jobStruct"));
        // console.log("printing jobDetails from camera/main.js");
        console.log(jobDetails)
        axios.get("http://localhost:4000/job/getjobdetails", {
            params: { _id: jobDetails._id }
        })
            .then(res => {
                console.log(res.data);
                setCurrJob(res.data);
                setJobStatus(res.data.status);
                let storedData = JSON.parse(localStorage.getItem("jobStruct"));
                if (storedData !== null) {
                    localStorage.removeItem("jobStruct");
                }
                localStorage.setItem("jobStruct", JSON.stringify(res.data));
            }
            )
            .catch(err => {
                console.log(err);
                console.log("Failure in response")
            });
    }, []);

    useEffect(() => {
        if (currJob && currJob.status === 'Recorded' && !currJob.SRT) {
            (async () => {
                try {
                    var recordingname = currJob.name.split("/").pop().replace(".txt", ".webm")
                    const apiData = { 'videoName': recordingname }
                    console.log(apiData)
                    await axios.post('http://localhost:4000/job/getSubtitles', apiData)
                        .then(subs => {
                            console.log("Subtitles generated : ");
                            console.log(subs.data);
                            (async () => {
                                var name = currJob.name.split("/").pop().replace(".txt", ".srt")
                                const blob = new Blob([subs.data], { type: 'text/plain' });
                                const uploadData = new FormData();
                                uploadData.append('srt', blob, name);
                                uploadData.append('_id', currJob._id);
                                uploadData.append('name', name);
                                console.log(uploadData)
                                await axios.post('http://localhost:4000/job/updateSRT', uploadData, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data'
                                    }
                                })
                                    .then(result => {
                                        console.log("Uploaded SRT");
                                        console.log(result);
                                        var jobStruct = {
                                            _id: currJob._id,
                                            status: "Recorded",
                                            name: currJob.name,
                                            sourceLanguage: currJob.sourceLanguage,
                                            index: currJob.index,
                                            recordingSrc: currJob.recordingSrc,
                                            scriptSrc: currJob.scriptSrc,
                                            createdAt: currJob.createdAt,
                                            updatedAt: currJob.updatedAt,
                                            SRT: "../frontend/public/userSRTs/" + name,
                                        };
                                        localStorage.setItem("jobStruct", JSON.stringify(jobStruct));
                                    })
                                    .catch(err => {
                                        console.log("Error while uploading SRT: " + err);
                                    });
                                window.location.reload();
                            })();
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } catch (error) {
                    console.error('Error fetching data from ASR api:', error);
                }
            })();
        }
    }, [jobStatus]);

    return (
        <div>
            <Grid container justifyContent="center" height="80vh">

                {/* <Grid item xs={6} md={3}> */}
                {jobStatus === 'Created' && (
                    <div>
                        <WebcamCapture />
                    </div>
                )}

                {jobStatus === 'Recorded' && !currJob.SRT && (
                    <div>
                        <SRTEditorLoader />
                        {/* <Grid item container justifyContent="center" style={{height: "100%", width:"100%"}}>
                        <CircularProgress
                            size='25vw'
                            style={{
                            color: "rgb(14, 102, 172)",
                            }}
                        />
                        </Grid> */}
                    </div>
                )}    

                {jobStatus === 'Recorded' && currJob.SRT && (
                    <div>
                        <EmotionDetection />
                        {/* <TestPage /> */}
                    </div>
                )}

                {(jobStatus === 'Analysis' || jobStatus === 'Finished') && (
                    <div>
                        <PreviewPage />
                    </div>
                )}

            </Grid>
        </div>

    );
};

export default RecordVideo;
