import { useState, useEffect, Component, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Grid, Button, Divider, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { IconCameraSelfie, IconRepeat, IconDownload, IconCrop, IconChevronsRight, IconArrowRight, IconVideo, IconVideoOff } from '@tabler/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop'
import axios from 'axios';
// import ImagePicker from 'react-native-image-crop-picker';

import React from 'react';
import { useLoaction, useLocation, useNavigate } from 'react-router-dom';
import { gridSpacing } from 'store/constant';

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
    const location = useLocation();
    const { state } = location;

    const [saveHover, setSaveHover] = useState("");

    useEffect(() => {
        console.log("in camera js");
        console.log(props);
        axios.get('http://localhost:4000/job/getscript', {
            params: { scriptName: "asdf" }
        })
            .then((response) => {
                setFileContent(response.data);
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
        // var arr = dataurl.split(','),
        // 	mime = arr[0].match(/:(.*?);/)[1],
        // 	bstr = atob(arr[1]),
        // 	n = bstr.length,
        // 	u8arr = new Uint8Array(n);

        // while (n--) {
        // 	u8arr[n] = bstr.charCodeAt(n);
        // }
        const file = new File([recordedVideoBlob], filename, { type: recordedVideoBlob.type });
        return file
    }

    const uploadvideo = (src) => {
        console.log(src)
        const name = "Capture" + Date.now() + ".webm";
        var file = dataURLtoFile(src, name);
        const uploadData = new FormData();
        uploadData.append('image', file);
        uploadData.append('name', name);
        uploadData.append('email', localStorage.getItem('email'));
        uploadData.append('category', localStorage.getItem('category'));

        axios.post('http://localhost:4000/image/add', uploadData)
            .then(res => {
                console.log(res);
                // console.log("pog?");
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <Grid item container xs={12} xl={12} sm={12} md={12} justify="space-between" style={{ paddingTop: "1vw", width: "80vw", height: "55.93vh", }} >
            <Grid item xs={12} align={'center'}>
                <h1>Video Recorder</h1>
            </Grid>

            {/* START RECORDING */}
            {permission && recordingStatus === "inactive" ? (
                <Grid item container justifyContent="space-between" alignContent="center"
                    style={{
                        height: "10%",
                        width: "80vw",
                        background: "#0D558F",
                        position: "relative",
                    }}
                >
                    {/* <Grid item container justifyContent="flex-start" alignItems="center" spacing={2}> */}
                    <Grid item>
                        <button style={{ border: "none", background: "none", paddingLeft: "0.45vw", position: "relative", zIndex: 2, color: "white", pointerEvents: "none", paddingTop: "0.5vh" }} >
                            <input
                                type="image"
                                src="images/Undo.png"
                                style={{ opacity: 0.3, filter: "grayscale(10%)" }}
                            />
                        </button>
                    </Grid>
                    <Grid item>
                        <button style={{ border: "none", background: "none", paddingLeft: "0.45vw", position: "relative", zIndex: 2, color: "white", pointerEvents: "none", paddingTop: "0.5vh" }} >
                            <input
                                type="image"
                                src="images/Redo.png"
                                style={{ opacity: 0.3, filter: "grayscale(10%)" }}
                            />
                        </button>
                    </Grid>
                    {/* </Grid> */}
                    {/* <Grid item container justifyContent="flex-end" alignItems="center" spacing={2}> */}
                    <Grid item style={{ flexGrow: 1 }} />
                    <Grid item>
                        <button onClick={startRecording} style={{ border: "none", width: "50px", background: "none", paddingLeft: "0.45vw", paddingRight: "0.45vw", position: "relative", zIndex: 2, paddingTop: "0.5vh" }}>
                            <input
                                type="image"
                                src="images/record.jpg"
                                alt=" "
                                onMouseEnter={() => setSaveHover("hover")}
                                onMouseLeave={() => setSaveHover("")}
                                style={{ maxWidth: "100%", width: "auto", height: "auto", ...saveHover === "hover" ? { opacity: 1, filter: "grayscale(100%)" } : { opacity: 0.7, filter: "grayscale(100%)" } }}
                            />
                        </button>
                    </Grid>
                    <Grid item>
                        <button style={{ border: "none", width: "50px", background: "none", paddingLeft: "0.45vw", position: "relative", zIndex: 2, color: "white", pointerEvents: "none", paddingTop: "0.5vh" }} >
                            <input
                                type="image"
                                src="images/Stop.jpg"
                                style={{ opacity: 0.3, filter: "grayscale(10%)", maxWidth: "100%", width: "auto", height: "auto" }}
                            />
                        </button>
                    </Grid>
                    <Grid item>
                        <button style={{ border: "none", width: "50px", background: "none", paddingLeft: "0.45vw", position: "relative", zIndex: 2, color: "white", pointerEvents: "none", paddingTop: "0.5vh" }} >
                            <input
                                type="image"
                                src="images/Retake.jpg"
                                style={{ opacity: 0.3, filter: "grayscale(10%)", maxWidth: "100%", width: "auto", height: "auto" }}
                            />
                        </button>
                    </Grid>
                    {/* </Grid> */}
                </Grid>
            ) : null}

            {/* STOP RECORDING */}
            {recordingStatus === "recording" ? (
                <Grid item container justifyContent="space-between" alignContent="center"
                    style={{
                        height: "10%",
                        width: "80vw",
                        background: "#0D558F",
                        position: "relative",
                    }}
                >
                    {/* <Grid item container justifyContent="flex-start" alignItems="center" spacing={2}> */}
                    <Grid item>
                        <button style={{ border: "none", background: "none", paddingLeft: "0.45vw", position: "relative", zIndex: 2, color: "white", pointerEvents: "none", paddingTop: "0.5vh" }} >
                            <input
                                type="image"
                                src="images/Undo.png"
                                style={{ opacity: 0.3, filter: "grayscale(10%)" }}
                            />
                        </button>
                    </Grid>
                    <Grid item>
                        <button style={{ border: "none", background: "none", paddingLeft: "0.45vw", position: "relative", zIndex: 2, color: "white", pointerEvents: "none", paddingTop: "0.5vh" }} >
                            <input
                                type="image"
                                src="images/Redo.png"
                                style={{ opacity: 0.3, filter: "grayscale(10%)" }}
                            />
                        </button>
                    </Grid>
                    {/* </Grid> */}
                    {/* <Grid item container justifyContent="flex-end" alignItems="center" spacing={2}> */}
                    <Grid item style={{ flexGrow: 1 }} />
                    <Grid item>
                        <button style={{ border: "none", width: "50px", background: "none", paddingLeft: "0.45vw", position: "relative", zIndex: 2, color: "white", pointerEvents: "none", paddingTop: "0.5vh" }} >
                            <input
                                type="image"
                                src="images/record.jpg"
                                style={{ opacity: 0.3, filter: "grayscale(10%)", maxWidth: "100%", width: "auto", height: "auto" }}
                            />
                        </button>
                    </Grid>
                    <Grid item>
                        <button onClick={stopRecording} style={{ border: "none", width: "50px", background: "none", paddingLeft: "0.45vw", paddingRight: "0.45vw", position: "relative", zIndex: 2, paddingTop: "0.5vh" }}>
                            <input
                                type="image"
                                src="images/Stop.jpg"
                                alt=" "
                                onMouseEnter={() => setSaveHover("hover")}
                                onMouseLeave={() => setSaveHover("")}
                                style={{ maxWidth: "100%", width: "auto", height: "auto", ...saveHover === "hover" ? { opacity: 1, filter: "grayscale(100%)" } : { opacity: 0.7, filter: "grayscale(100%)" } }}
                            />
                        </button>
                    </Grid>
                    <Grid item>
                        <button style={{ border: "none", width: "50px", background: "none", paddingLeft: "0.45vw", position: "relative", zIndex: 2, color: "white", pointerEvents: "none", paddingTop: "0.5vh" }} >
                            <input
                                type="image"
                                src="images/Retake.jpg"
                                style={{ opacity: 0.3, filter: "grayscale(10%)", maxWidth: "100%", width: "auto", height: "auto" }}
                            />
                        </button>
                    </Grid>
                    {/* </Grid> */}
                </Grid>
            ) : null}

            {/* RETAKE VIDEO */}
            {recordedVideo ? (
                <Grid item container justifyContent="space-between" alignContent="center"
                    style={{
                        height: "10%",
                        width: "80vw",
                        background: "#0D558F",
                        position: "relative",
                    }}
                >
                    {/* <Grid item container justifyContent="flex-start" alignItems="center" spacing={2}> */}
                    <Grid item>
                        <button style={{ border: "none", background: "none", paddingLeft: "0.45vw", position: "relative", zIndex: 2, color: "white", pointerEvents: "none", paddingTop: "0.5vh" }} >
                            <input
                                type="image"
                                src="images/Undo.png"
                                style={{ opacity: 0.3, filter: "grayscale(10%)" }}
                            />
                        </button>
                    </Grid>
                    <Grid item>
                        <button style={{ border: "none", background: "none", paddingLeft: "0.45vw", position: "relative", zIndex: 2, color: "white", pointerEvents: "none", paddingTop: "0.5vh" }} >
                            <input
                                type="image"
                                src="images/Redo.png"
                                style={{ opacity: 0.3, filter: "grayscale(10%)" }}
                            />
                        </button>
                    </Grid>
                    {/* </Grid> */}
                    {/* <Grid item container justifyContent="flex-end" alignItems="center" spacing={2}> */}
                    <Grid item style={{ flexGrow: 1 }} />
                    <Grid item>
                        <button style={{ border: "none", width: "50px", background: "none", paddingLeft: "0.45vw", position: "relative", zIndex: 2, color: "white", pointerEvents: "none", paddingTop: "0.5vh" }} >
                            <input
                                type="image"
                                src="images/record.jpg"
                                style={{ opacity: 0.3, filter: "grayscale(10%)", maxWidth: "100%", width: "auto", height: "auto" }}
                            />
                        </button>
                    </Grid>
                    <Grid item>
                        <button style={{ border: "none", width: "50px", background: "none", paddingLeft: "0.45vw", paddingRight: "0.45vw", position: "relative", zIndex: 2,  pointerEvents: "none", paddingTop: "0.5vh" }} >
                            <input
                                type="image"
                                src="images/Stop.jpg"
                                style={{ opacity: 0.3, filter: "grayscale(10%)", maxWidth: "100%", width: "auto", height: "auto" }}
                            />
                        </button>
                    </Grid>
                    <Grid item>
                        <button onClick={getCameraPermission} style={{ border: "none", width: "50px", background: "none", paddingLeft: "0.45vw", position: "relative", zIndex: 2, paddingTop: "0.5vh" }}>
                            <input
                                type="image"
                                src="images/Retake.jpg"
                                alt=" "
                                onMouseEnter={() => setSaveHover("hover")}
                                onMouseLeave={() => setSaveHover("")}
                                style={{ maxWidth: "100%", width: "auto", height: "auto", ...saveHover === "hover" ? { opacity: 1, filter: "grayscale(100%)" } : { opacity: 0.7, filter: "grayscale(100%)" } }}
                            />
                        </button>
                    </Grid>
                    {/* </Grid> */}
                </Grid>
            ) : null}


            {/* <Grid item xs={12} align={'center'}>
                <main>
                    <div className="video-controls">
                        {permission && recordingStatus === "inactive" ? (
                            <Grid item xs={3} align={"center"} spacing={2}>
                                <Button
                                    onClick={startRecording}
                                    variant="outlined"
                                    color="secondary"
                                    style={{ maxWidth: '200px', maxHeight: '70px', minWidth: '150px', minHeight: '50px' }}
                                >
                                    <IconVideo size={40} />
                                    <span style={{ marginLeft: '20px' }}>START RECORDING</span>
                                </Button>
                            </Grid>
                        ) : null}
                        {recordedVideo ? (
                            <Grid item xs={3} align={"center"} spacing={2}>
                                <Button
                                    onClick={getCameraPermission}
                                    variant="outlined"
                                    color="secondary"
                                    style={{ maxWidth: '200px', maxHeight: '70px', minWidth: '150px', minHeight: '50px' }}
                                >
                                    <IconVideo size={40} />
                                    <span style={{ marginLeft: '20px' }}>RETAKE VIDEO</span>
                                </Button>
                            </Grid>
                        ) : null}
                        {recordingStatus === "recording" ? (
                            <Grid item xs={3} align={"center"} spacing={2}>
                                <Button
                                    onClick={stopRecording}
                                    variant="outlined"
                                    color="secondary"
                                    style={{ maxWidth: '200px', maxHeight: '70px', minWidth: '150px', minHeight: '50px' }}
                                >
                                    <IconVideoOff size={40} />
                                    <span style={{ marginLeft: '20px' }}>STOP RECORDING</span>
                                </Button>
                            </Grid>
                        ) : null}
                    </div>
                </main>
            </Grid> */}
            <Grid item xs={12} align={'center'}>
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 1, overflowY: 'scroll', padding: '20px' }}>
                        <pre>{fileContent}</pre>
                    </div>
                    <div className="video-player">
                        {!recordedVideo ? (
                            <video ref={liveVideoFeed} autoPlay className="live-player"></video>
                        ) : null}
                        {recordedVideo ? (
                            <div className="recorded-player">
                                <video className="recorded" src={recordedVideo} controls></video>
                                {/* <a download href={recordedVideo}>
                                Download Recording
                            </a> */}

                            </div>
                        ) : null}
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} align={'center'}>
                {recordedVideo ? (
                    <Button
                        onClick={() => uploadvideo(recordedVideo)}
                        variant="outlined"
                        color="secondary"
                        style={{ maxWidth: '200px', maxHeight: '70px', minWidth: '150px', minHeight: '50px' }}
                    >
                        <IconDownload size={40} />
                        <span style={{ marginLeft: '20px' }}>SAVE VIDEO</span>
                    </Button>
                ) : null}
            </Grid>
        </Grid>
    );
};

export default WebcamCapture;
