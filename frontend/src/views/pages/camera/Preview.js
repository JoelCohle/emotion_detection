import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ReactPlayer from 'react-player';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import SRTViewer from './SRTViewer';
import AudioSection from './AudioSection.js';

const PreviewPage = (props) => {
    const [job, setJob] = useState(null)
    const [script, setScript] = useState("")
    const [recording, setRecording] = useState(null)
    const [videoBlob, setVideoBlob] = useState(null)
    const [videoSrc, setVideoSrc] = useState("")
    const [audioEmotions, setAudioEmotions] = useState({
        "Sad": 20,
        "Neutral": 10,
        "Happy": 2,
        "Angry": 60,
        "Fear": 20,
        "Surprise": 5,
        "Dominant": 2,
    })
    const [videoEmotions, setVideoEmotions] = useState({
        "Sad": 20,
        "Neutral": 10,
        "Happy": 2,
        "Angry": 80,
        "Fear": 2,
        "Surprise": 5,
        "Dominant": 30,
    })
    let navigate = useNavigate();

    useEffect(() => {
        const jobDetails = JSON.parse(localStorage.getItem("jobStruct"));
        console.log(jobDetails)
        setJob(jobDetails)

        axios.get('http://localhost:4000/job/getscript', {
            params: { scriptName: jobDetails.name }
        })
            .then((response) => {
                setScript(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error fetching the script:', error);
            });

        var filename = jobDetails.name.split("/").pop().replace(".txt", ".webm")
        var filepath = "userRecordings/" + filename
        // console.log(URL.createObjectURL(filepath))

        setVideoSrc(filepath)
        // console.log(filename)
        // axios.get('http://localhost:4000/job/getrecording', {
        //     params: { recordingName: filename }
        // })
        //     .then((response) => {
        //         // convert video file to dataUrl
        //         var reader = new FileReader();
        //         console.log(response.data)
        //         reader.readAsDataURL(response.data);
        //         reader.onloadend = function () {
        //             var base64data = reader.result;
        //             console.log(base64data)
        //             setRecording(base64data);
        //         }
        //         // setRecording(url);
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching the recording:', error);
        //     });
    }, []);

    const finishAnalysis = async () => {
        // const uploadData = new FormData();
        // uploadData.append('_id', job._id);
        // uploadData.append('status', "Analysis");
        const jobData = { '_id': job._id, 'status': "Finished" }
        await axios.post('http://localhost:4000/job/updateStatus', jobData)
            .then(result => {
                console.log("Uploaded SRT");
                console.log(result.data);
                // localStorage.setItem("jobStruct", JSON.stringify(result.data));
                // navigate to home page
                navigate('/library');
            })
            .catch(err => {
                console.log("Error : " + err);
            });

    };

    return (
        <Grid>
        <Grid item container xs={12} xl={12} sm={12} md={12} style={{ marginTop: "2vh", width: "94vw", height: "75vh", background: "#F8F8F8", boxShadow: "4px 4px 25px 0px rgba(174, 173, 173, 0.25), -4px -4px 25px -4px rgba(174, 173, 173, 0.25)" }}  >
            <Grid item container justifyContent="space-between" alignContent="center"
                style={{ height: "10%", width: "94vw", background: "#C0C0C0", position: "relative", }} >
                {/* <Grid item container justifyContent="flex-start" alignItems="center" spacing={2}> */}
                <Grid item style={{ marginLeft: "1.5vw" }}>
                    <button style={{ border: "none", background: "none", paddingLeft: "0.45vw", position: "relative", zIndex: 2, color: "white", pointerEvents: "none", paddingTop: "1.5vh" }} >
                        <input
                            type="image"
                            src="images/Undo.png"
                            style={{ opacity: 0.3, height: "3.5vh", filter: "grayscale(10%)" }}
                        />
                    </button>
                </Grid>
                <Grid item>
                    <button style={{ border: "none", background: "none", paddingLeft: "0.45vw", position: "relative", zIndex: 2, color: "white", pointerEvents: "none", paddingTop: "1.5vh" }} >
                        <input
                            type="image"
                            src="images/Redo.png"
                            style={{ opacity: 0.3, height: "3.5vh", filter: "grayscale(10%)" }}
                        />
                    </button>
                </Grid>
                <Grid item>
                    <button style={{ border: "none", background: "none", paddingLeft: "0.45vw", position: "relative", zIndex: 2, color: "white", pointerEvents: "none", paddingTop: "1.5vh" }} >
                        <input
                            type="image"
                            src="images/Save.png"
                            alt=" Save "
                            /* onMouseEnter={() => setSaveHover("hover")}
                            onMouseLeave={() => setSaveHover("")} */
                            // onClick={saveASRText}
                            style={{ opacity: 0.3, height: "3.5vh", filter: "grayscale(10%)" }}
                        />
                    </button>
                </Grid>
                <Grid item>
                    <button style={{ border: "none", background: "none", paddingLeft: "0.45vw", position: "relative", zIndex: 2, color: "white", pointerEvents: "none", paddingTop: "1.5vh" }} >
                        <input
                            type='image'
                            src='images/download.png'
                            alt=' Download '
                            /* onMouseEnter={() => setSaveHover2("hover")}
                            onMouseLeave={() => setSaveHover2("")} */
                            // onClick={downloadSRT}
                            style={{ opacity: 0.3, height: "3.5vh", filter: "grayscale(10%)" }}
                        />
                    </button>
                </Grid>
                {/* </Grid> */}
                {/* <Grid item container justifyContent="flex-end" alignItems="center" spacing={2}> */}
                <Grid item style={{ flexGrow: 1 }} />
                <Grid item>
                    <button style={{ border: "none", background: "none", paddingLeft: "0.45vw", position: "relative", zIndex: 2, color: "white", pointerEvents: "none", paddingTop: "0.8vh" }} >
                        <input
                            type="image"
                            src="images/record.jpg"
                            style={{ opacity: 0.3, filter: "grayscale(10%)", maxWidth: "100%", height: "5vh" }}
                        />
                    </button>
                </Grid>
                <Grid item>
                    <button style={{ border: "none", background: "none", paddingLeft: "0.35vw", position: "relative", zIndex: 2, color: "white", pointerEvents: "none", paddingTop: "1vh" }} >
                        <input
                            type="image"
                            src="images/Stop.jpg"
                            style={{ opacity: 0.3, filter: "grayscale(10%)", maxWidth: "100%", height: "4.5vh" }}
                        />
                    </button>
                </Grid>
                <Grid item marginRight="5.5vw">
                    <button style={{ border: "none", background: "none", paddingLeft: "0.2vw", position: "relative", zIndex: 2, color: "white", pointerEvents: "none", paddingTop: "0.5vh" }} >
                        <input
                            type="image"
                            src="images/Retake.jpg"
                            style={{ opacity: 0.3, filter: "grayscale(10%)", maxWidth: "100%", height: "5.5vh" }}
                        />
                    </button>
                </Grid>
                {/* </Grid> */}
            </Grid>
            <Grid item container style={{ paddingLeft: '2.5%', width: '35vw', height: '60%', paddingRight: "2vh" }} >
                <span style={{ marginBottom: "1vh", fontFamily: "Montserrat", color: "#6c6c6c", fontSize: "18px", fontWeight: 500 }}>Source Text</span>
                <Grid item container style={{ width: '100%', height: '90%', overflow: 'auto', border: '2px solid #b3b3b3', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', }} >
                    <div style={{ width: '100%', height: '100%', }}>
                        <textarea
                            value={script}
                            style={{ fontSize: '16px', padding: '20px', fontFamily: "Montserrat", width: '100%', height: '100%', border: 'none', resize: 'none', overflowY: 'auto' }}
                        />
                    </div>
                </Grid>
            </Grid>
            <Grid item container style={{ width: '35vw', height: '60%', paddingRight: "2vh" }} >
                <Grid item container justifyContent="space-between" style={{ width: '22vw', height: '8%' }} >
                    <span style={{ marginBottom: "1vh", fontFamily: "Montserrat", color: "#6c6c6c", fontSize: "18px", fontWeight: 500 }}>Recorded Footage</span>
                </Grid>
                <div className="video-player" style={{ display: 'flex' }}>
                    <ReactPlayer
                        className="live-player"
                        url={videoSrc}
                        controls={true}
                    />
                    {/* <video className="live-player" src={videoSrc} type="video/webm" controls></video> */}
                </div>
            </Grid>
            <Grid item container style={{ width: '22vw', height: '60%' }} >
                <Grid item container justifyContent="space-between" style={{ width: '22vw', height: '8%' }} >
                    <span style={{ marginBottom: "1vh", fontFamily: "Montserrat", color: "#6c6c6c", fontSize: "16px", fontWeight: 500 }}><img src="images/video.png"></img>Video</span>
                    <span style={{ marginBottom: "1vh", fontFamily: "Montserrat", color: "#6c6c6c", fontSize: "16px", fontWeight: 500 }}>Emotion</span>
                    <span style={{ marginBottom: "1vh", fontFamily: "Montserrat", color: "#6c6c6c", fontSize: "16px", fontWeight: 500 }}><img src="images/audio.png"></img>Audio</span>
                </Grid>
                <Grid item container style={{ width: '22vw', height: '90%', border: '2px solid #b3b3b3', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', }} >
                    <Grid item container justifyContent="space-between" style={{ width: '22vw', height: '13%', background: '#F0FFFF', margin: '1% 0', padding: '10px 0' }} >
                        <Typography style={{ fontSize: "18px", fontWeight: 500, color: '#00ff00', paddingLeft: '5%' }}>{audioEmotions.Sad}</Typography>
                        <span style={{ marginBottom: "1vh", fontFamily: "Montserrat", color: audioEmotions.Sad === videoEmotions.Sad ? "#6c6c6c" : "#ff0000", fontSize: "18px", fontWeight: 500 }}>Sad</span>
                        <Typography style={{ fontSize: "18px", fontWeight: 500, color: '#00ff00', paddingRight: '5%' }}>{videoEmotions.Sad}</Typography>
                    </Grid>
                    <Grid item container justifyContent="space-between" style={{ width: '22vw', height: '13%', background: '#F0FFFF', margin: '1% 0', padding: '10px 0' }} >
                        <Typography style={{ fontSize: "18px", fontWeight: 500, color: '#00ff00', paddingLeft: '5%' }}>{audioEmotions.Surprise}</Typography>
                        <span style={{ marginBottom: "1vh", fontFamily: "Montserrat", color: audioEmotions.Surprise === videoEmotions.Surprise ? "#6c6c6c" : "#ff0000", fontSize: "18px", fontWeight: 500 }}>Surprised</span>
                        <Typography style={{ fontSize: "18px", fontWeight: 500, color: '#00ff00', paddingRight: '5%' }}>{videoEmotions.Surprise}</Typography>
                    </Grid>
                    <Grid item container justifyContent="space-between" style={{ width: '22vw', height: '13%', background: '#F0FFFF', margin: '1% 0', padding: '10px 0' }} >
                        <Typography style={{ fontSize: "18px", fontWeight: 500, color: '#00ff00', paddingLeft: '5%' }}>{audioEmotions.Angry}</Typography>
                        <span style={{ marginBottom: "1vh", fontFamily: "Montserrat", color: audioEmotions.Angry === videoEmotions.Angry ? "#6c6c6c" : "#ff0000", fontSize: "18px", fontWeight: 500 }}>Angry</span>
                        <Typography style={{ fontSize: "18px", fontWeight: 500, color: '#00ff00', paddingRight: '5%' }}>{videoEmotions.Angry}</Typography>
                    </Grid>
                    <Grid item container justifyContent="space-between" style={{ width: '22vw', height: '13%', background: '#F0FFFF', margin: '1% 0', padding: '10px 0' }} >
                        <Typography style={{ fontSize: "18px", fontWeight: 500, color: '#00ff00', paddingLeft: '5%' }}>{audioEmotions.Happy}</Typography>
                        <span style={{ marginBottom: "1vh", fontFamily: "Montserrat", color: audioEmotions.Happy === videoEmotions.Happy ? "#6c6c6c" : "#ff0000", fontSize: "18px", fontWeight: 500 }}>Happy</span>
                        <Typography style={{ fontSize: "18px", fontWeight: 500, color: '#00ff00', paddingRight: '5%' }}>{videoEmotions.Happy}</Typography>
                    </Grid>
                    <Grid item container justifyContent="space-between" style={{ width: '22vw', height: '13%', background: '#F0FFFF', margin: '1% 0', padding: '10px 0' }} >
                        <Typography style={{ fontSize: "18px", fontWeight: 500, color: '#00ff00', paddingLeft: '5%' }}>{audioEmotions.Fear}</Typography>
                        <span style={{ marginBottom: "1vh", fontFamily: "Montserrat", color: audioEmotions.Fear === videoEmotions.Fear ? "#6c6c6c" : "#ff0000", fontSize: "18px", fontWeight: 500 }}>Fear</span>
                        <Typography style={{ fontSize: "18px", fontWeight: 500, color: '#00ff00', paddingRight: '5%' }}>{videoEmotions.Fear}</Typography>
                    </Grid>
                    <Grid item container justifyContent="space-between" style={{ width: '22vw', height: '13%', background: '#F0FFFF', margin: '1% 0', padding: '10px 0' }} >
                        <Typography style={{ fontSize: "18px", fontWeight: 500, color: '#00ff00', paddingLeft: '5%' }}>{audioEmotions.Neutral}</Typography>
                        <span style={{ marginBottom: "1vh", fontFamily: "Montserrat", color: audioEmotions.Neutral === videoEmotions.Neutral ? "#6c6c6c" : "#ff0000", fontSize: "18px", fontWeight: 500 }}>Neutral</span>
                        <Typography style={{ fontSize: "18px", fontWeight: 500, color: '#00ff00', paddingRight: '5%' }}>{videoEmotions.Neutral}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container style={{ paddingLeft: '2.5%', paddingRight: '2.5%', width: '100%', height: '15%' }} >
                <AudioSection />
            </Grid>
        </Grid >
        <Grid item container justifyContent="center" style={{ height: "5vh", marginTop:"2vh"}}>
                {/* <Grid item xs={12} align={'center'}> */}
                <Button
                    onClick={finishAnalysis}
                    type="button"
                    disableRipple={true}
                    style={{ backgroundColor: '#0e66ac', borderRadius: '4px', padding: "15px", color: "white", fontSize: "14px", paddingLeft: "7.5%", paddingRight: "7.5%" }}
                >
                    <span>FINISH</span>
                </Button>
                {/* </Grid> */}
            </Grid>
        </Grid>
    )
};

export default PreviewPage;
