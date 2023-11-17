import { useState, useEffect, Component, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Grid, Button, Divider, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { IconCameraSelfie, IconRepeat, IconDownload, IconCrop, IconChevronsRight, IconArrowRight, IconVideo, IconVideoOff } from '@tabler/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import 'react-image-crop/dist/ReactCrop.css';
import { Tooltip } from '@mui/material';
// import SimpleBarReact from 'simplebar-react';
import axios from 'axios';
// import ImagePicker from 'react-native-image-crop-picker';

import React from 'react';
import { useParams, useNavigate, useHistory } from 'react-router-dom';
import "./Script.css"

// ==============================|| Landing/Category Page ||============================== //
const mimeType = 'video/webm; codecs="opus,vp8"';

const WebcamCapture = (props) => {
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const liveVideoFeed = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [recordedVideo, setRecordedVideo] = useState(null);
    const [recordedVideoBlob, setRecordedVideoBlob] = useState(null);
    const [videoChunks, setVideoChunks] = useState([]);
    const [cameraPermission, setCameraPermission] = useState(false);
    const [fileContent, setFileContent] = useState('');
    const [saveHover, setSaveHover] = useState("");
    const [job, setJob] = useState(null);
    const parentCallback = props.parentCallback;

    const { id } = useParams();

    useEffect(() => {
        const jobDetails = JSON.parse(localStorage.getItem("jobStruct"));
        // console.log(jobDetails)
        setJob(jobDetails);
        axios.get('http://localhost:4000/job/getscript', {
            params: { scriptName: jobDetails.name }
        })
            .then((response) => {
                let script = response.data
                // script = script.split('\n');
                // console.log(script)
                setFileContent(script);
            })
            .catch((error) => {
                console.error('Error fetching the file:', error);
            });
    }, []);

    useEffect(() => {
        const getCameraPermission = async () => {
            setRecordedVideo(null);
            setRecordedVideoBlob(null);

            if ("MediaRecorder" in window) {
                try {
                    const videoConstraints = {
                        audio: false,
                        video: true,
                    };
                    const audioConstraints = { audio: true };

                    const audioStream = await navigator.mediaDevices.getUserMedia(
                        audioConstraints
                    );
                    const videoStream = await navigator.mediaDevices.getUserMedia(
                        videoConstraints
                    );

                    setCameraPermission(true);
                    setPermission(true);

                    const combinedStream = new MediaStream([
                        ...videoStream.getVideoTracks(),
                        ...audioStream.getAudioTracks(),
                    ]);

                    setStream(combinedStream);

                    liveVideoFeed.current.srcObject = videoStream;
                } catch (err) {
                    alert(err.message);
                }
            } else {
                alert("The MediaRecorder API is not supported in your browser.");
            }
        };

        // Check if permission is false and call getCameraPermission
        if (!cameraPermission) {
            getCameraPermission();
        }
    }, [cameraPermission]);

    const getCameraPermission = async () => {
        setRecordedVideo(null);
        setRecordedVideoBlob(null);
        //get video and audio permissions and then stream the result media stream to the videoSrc variable
        if ("MediaRecorder" in window) {
            try {
                const videoConstraints = {
                    audio: false,
                    video: true,
                };
                const audioConstraints = { audio: true };

                // create audio and video streams separately
                const audioStream = await navigator.mediaDevices.getUserMedia(
                    audioConstraints
                );
                const videoStream = await navigator.mediaDevices.getUserMedia(
                    videoConstraints
                );

                setPermission(true);

                //combine both audio and video streams

                const combinedStream = new MediaStream([
                    ...videoStream.getVideoTracks(),
                    ...audioStream.getAudioTracks(),
                ]);

                setStream(combinedStream);

                //set videostream to live feed player
                liveVideoFeed.current.srcObject = videoStream;
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
        setRecordingStatus("recording");
        const media = new MediaRecorder(stream, { mimeType });
        mediaRecorder.current = media;
        mediaRecorder.current.start();
        let localVideoChunks = [];

        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localVideoChunks.push(event.data);
        };
        setVideoChunks(localVideoChunks);
    };

    const stopRecording = () => {
        setPermission(false);
        setRecordingStatus("inactive");
        mediaRecorder.current.stop();

        mediaRecorder.current.onstop = () => {
            const videoBlob = new Blob(videoChunks, { type: mimeType });
            const videoUrl = URL.createObjectURL(videoBlob);
            setRecordedVideoBlob(videoBlob)
            setRecordedVideo(videoUrl);

            setVideoChunks([]);
        };
    };

    function dataURLtoFile(dataurl, filename) {
        const file = new File([recordedVideoBlob], filename, { type: recordedVideoBlob.type });
        return file
    }

    const uploadvideo = async (src) => {

        console.log("Upload")
        // strip job.name and remove the file extension
        var name = job.name.split("/").pop().replace(".txt", ".webm")
        var file = dataURLtoFile(src, name);
        const uploadData = new FormData();
        uploadData.append('recording', file);
        uploadData.append('name', name);
        uploadData.append('email', job.email);
        uploadData.append('_id', job._id);
        uploadData.append('status', "Recorded");
        console.log(uploadData)

        await axios.post('http://localhost:4000/job/update', uploadData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log("Uploaded");
                console.log(res);
                var jobStruct = {
                    _id: job._id,
                    status: "Recorded",
                    name: job.name,
                    sourceLanguage: job.sourceLanguage,
                    createdAt: job.createdAt,
                    index: job.index,
                    recordingSrc: "../frontend/public/userRecordings/" + name,
                    scriptSrc: job.scriptSrc,
                    updatedAt: job.updatedAt,
                };
                localStorage.setItem("jobStruct", JSON.stringify(jobStruct));
            })
            .catch(err => {
                console.log(err);
            });
        window.location.reload();

    }

    return (
        // <Grid item xs={12} align={'center'}>
        //         <h1>Video Recorder</h1>
        //     </Grid>
        <Grid item container xs={12} xl={12} sm={12} md={12} style={{ marginTop: "2vh", width: "94vw", height: "80vh", background: "#F8F8F8", boxShadow: "4px 4px 25px 0px rgba(174, 173, 173, 0.25), -4px -4px 25px -4px rgba(174, 173, 173, 0.25)" }}  >
            {/* Header bar container */}
            {/* START RECORDING */}
            {permission && recordingStatus === "inactive" ? (
                <Grid item container justifyContent="space-between" alignContent="center"
                    style={{ height: "10%", width: "94vw", background: "#0D558F", position: "relative", }} >
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
                        <button onClick={startRecording} style={{ border: "none", background: "none", paddingLeft: "0.45vw", position: "relative", zIndex: 2, paddingTop: "0.8vh" }}>
                            <input
                                type="image"
                                src="images/record.jpg"
                                alt=" "
                                onMouseEnter={() => setSaveHover("hover")}
                                onMouseLeave={() => setSaveHover("")}
                                style={{ maxWidth: "100%", height: "5vh", ...saveHover === "hover" ? { opacity: 1, filter: "grayscale(100%)" } : { opacity: 0.7, filter: "grayscale(100%)" } }}
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
            ) : null}

            {/* STOP RECORDING */}
            {recordingStatus === "recording" ? (
                <Grid item container justifyContent="space-between" alignContent="center"
                    style={{ height: "10%", width: "94vw", background: "#0D558F", position: "relative", }} >
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
                        <button style={{ border: "none", background: "none", paddingLeft: "0.45vw", position: "relative", zIndex: 2, color: "white", pointerEvents: "none",  paddingTop: "0.8vh" }} >
                            <input
                                type="image"
                                src="images/record.jpg"
                                style={{ opacity: 0.3, filter: "grayscale(10%)", maxWidth: "100%", height: "5vh" }}
                            />
                        </button>
                    </Grid>
                    <Grid item>
                        <button onClick={stopRecording} style={{ border: "none", background: "none", paddingLeft: "0.45vw", position: "relative", zIndex: 2, paddingTop: "1vh"}}>
                            <input
                                type="image"
                                src="images/Stop.jpg"
                                alt=" "
                                onMouseEnter={() => setSaveHover("hover")}
                                onMouseLeave={() => setSaveHover("")}
                                style={{ maxWidth: "100%",  height: "4.5vh", ...saveHover === "hover" ? { opacity: 1, filter: "grayscale(100%)" } : { opacity: 0.7, filter: "grayscale(100%)" } }}
                            />
                        </button>
                    </Grid>
                    <Grid item marginRight="5.5vw">
                        <button style={{ border: "none", background: "none", paddingLeft: "0.45vw", position: "relative", zIndex: 2, color: "white", pointerEvents: "none", paddingTop: "0.5vh" }} >
                            <input
                                type="image"
                                src="images/Retake.jpg"
                                style={{ opacity: 0.3, filter: "grayscale(10%)", maxWidth: "100%", height: "5.5vh" }}
                            />
                        </button>
                    </Grid>
                    {/* </Grid> */}
                </Grid>
            ) : null}

            {/* RETAKE VIDEO */}
            {recordedVideo ? (
                <Grid item container justifyContent="space-between" alignContent="center"
                    style={{ height: "10%", width: "94vw", background: "#0D558F", position: "relative", }} >
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
                        <button style={{ border: "none", background: "none", paddingLeft: "0.45vw", position: "relative", zIndex: 2, color: "white", pointerEvents: "none",  paddingTop: "0.8vh" }} >
                            <input
                                type="image"
                                src="images/record.jpg"
                                style={{ opacity: 0.3, filter: "grayscale(10%)", maxWidth: "100%", height: "5vh" }}
                            />
                        </button>
                    </Grid>
                    <Grid item>
                        <button style={{ border: "none",  background: "none", paddingLeft: "0.35vw", position: "relative", zIndex: 2, pointerEvents: "none", paddingTop: "1vh"}} >
                            <input
                                type="image"
                                src="images/Stop.jpg"
                                style={{ opacity: 0.3, filter: "grayscale(10%)", maxWidth: "100%", height: "4.5vh" }}
                            />
                        </button>
                    </Grid>
                    <Grid item marginRight="5.5vw">
                        <button onClick={getCameraPermission} style={{ border: "none", background: "none", paddingLeft: "0.2vw", position: "relative", zIndex: 2, paddingTop: "0.5vh" }}>
                            <input
                                type="image"
                                src="images/Retake.jpg"
                                alt=" "
                                onMouseEnter={() => setSaveHover("hover")}
                                onMouseLeave={() => setSaveHover("")}
                                style={{ maxWidth: "100%",  height: "5.5vh", ...saveHover === "hover" ? { opacity: 1, filter: "grayscale(100%)" } : { opacity: 0.7, filter: "grayscale(100%)" } }}
                            />
                        </button>
                    </Grid>
                    {/* </Grid> */}
                </Grid>
            ) : null}
            <Grid item container direction="column" alignItems="flex-start" style={{ width: "50%", height: "78%", marginTop: "1vw", marginLeft: "2vw" }} >
                <span style={{ marginBottom: "1vh", fontFamily: "Montserrat", color: "#6c6c6c", fontSize: "18px", fontWeight: 500 }}>Instructional Message Placeholder</span>
                <Grid item container style={{ width: '100%', height: '90%', overflow: 'auto', border: '2px solid #b3b3b3', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', }} >
                    {/* <SimpleBarReact forceVisible="y" autoHide={false} style={{ maxHeight: '100%', width: '99.5%' }}>
                        {fileContent ? (
                            <>
                                <div>
                                    {fileContent.map((line, index) => (
                                        <div key={index}>
                                            <pre>{line}</pre>
                                        </div>
                                    ))}
                                    </div>
                            </>
                        ) : null}
                    </SimpleBarReact> */}
                    <div style={{ width: '100%', height: '100%', }}>
                        <textarea
                            value={fileContent}
                            style={{ fontSize: '16px', padding: '20px', fontFamily: "Montserrat", width: '100%', height: '100%', border: 'none', resize: 'none', overflowY: 'auto' }}
                        />
                    </div>
                </Grid>
            </Grid>
            <Grid item container justifyContent="center" style={{ width: "45%", height: "70%", marginTop: "1vw", }} >
                <Grid item container direction="column" justifyContent="space-between" style={{ width: "36vw", height: "90%", }} >
                    <Tooltip title="RECORDER" style={{ fontFamily: "Montserrat" }}>
                        <Grid item container direction="column" alignItems="left">
                            <Grid item style={{ paddingBottom: "10px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "inline-block", maxWidth: "20em", fontSize: "18px", fontWeight: "600", color: "#7b7b7b", }} >
                                <span style={{ fontFamily: "Montserrat", color: "#6c6c6c", fontSize: "20px", fontWeight: 500 }}><b>Camera Recording</b> <img src='images/record2.svg'></img></span>
                            </Grid>
                            <Grid item>
                                <div style={{ display: 'flex' }}>

                                    <div className="video-player">
                                        {!recordedVideo ? (
                                            <video ref={liveVideoFeed} autoPlay className="live-player"></video>
                                        ) : null}
                                        {recordedVideo ? (
                                            <div className="recorded-player">
                                                <video className="live-player" src={recordedVideo} controls></video>
                                                {/* <a download href={recordedVideo}> Download Recording </a> */}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Tooltip>
                </Grid>
            </Grid>
            <Grid item container justifyContent="center" style={{ height: "5%" }}>
                {/* <Grid item xs={12} align={'center'}> */}
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        uploadvideo(recordedVideo);
                    }}
                    type="button"
                    disableRipple={true}
                    disabled={!recordedVideo}
                    style={{ backgroundColor: recordedVideo ? '#0e66ac' : '#C0C0C0', borderRadius: '4px', padding: "15px", color: "white", fontSize: "14px", paddingLeft: "5%", paddingRight: "5%" }}
                >
                    <span>NEXT</span>
                </Button>
                {/* </Grid> */}
            </Grid>
            <Grid item container justifyContent="center" style={{ height: "5%" }}></Grid>
        </Grid>
    );
};

export default WebcamCapture;
