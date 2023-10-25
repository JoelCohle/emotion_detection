import { useState, Component, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Grid, Button, Divider, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { IconCameraSelfie, IconRepeat, IconDownload, IconCrop, IconChevronsRight, IconArrowRight, IconVideo, IconVideoOff } from '@tabler/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop'
import axios from 'axios';
// import ImagePicker from 'react-native-image-crop-picker';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { gridSpacing } from 'store/constant';

// ==============================|| Landing/Category Page ||============================== //
const mimeType = 'video/webm; codecs="opus,vp8"';

const WebcamCapture = () => {
	const [permission, setPermission] = useState(false);

	const mediaRecorder = useRef(null);

	const liveVideoFeed = useRef(null);

	const [recordingStatus, setRecordingStatus] = useState("inactive");

	const [stream, setStream] = useState(null);

	const [recordedVideo, setRecordedVideo] = useState(null);

	const [recordedVideoBlob, setRecordedVideoBlob] = useState(null);

	const [videoChunks, setVideoChunks] = useState([]);

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
		<Grid container spacing={gridSpacing} sx={{mt:['0%', '0%', '0%']}}>
            <Grid item xs={12} align={'center'}>
			    <h1>Video Recorder</h1>
            </Grid>
            <Grid item xs={12} align={'center'}>
			<main>
				<div className="video-controls">
					{!recordedVideo && !permission ? (
                        <Grid item xs={3} align={"center"} spacing={2}>
                            <Button
                                onClick={getCameraPermission}
                                variant="outlined"
                                color="secondary"
                                style={{ maxWidth: '200px', maxHeight: '70px', minWidth: '150px', minHeight: '50px' }}
                            >
                                <IconCameraSelfie size={40} />
                                <span style={{ marginLeft: '20px' }}>OPEN CAMERA</span>
                            </Button>
                        </Grid>
					) : null}
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
					{!permission && recordedVideo ? (
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
            </Grid>
            <Grid item xs={12} align={'center'}>
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

// const videoConstraints = {
//     width: 960,
//     height: 540,
//     facingMode: "user",
// };

// const WebcamCapture = () => {
//     //initialize empty array
//     const [fileArray, setfileArray] = useState([]);
//     const [cropimages, setCropimage] = useState([]);
//     const [isCrop, setIsCrop] = useState(false);
//     const [pic, setpic] = useState('');
//     const [ispic, setispic] = useState(false);
//     const webcamRef = useRef(null);
//     const [hovering, setHovering] = useState(false);
//     const imgRef = useRef(null);
//     const [crop, setCrop] = useState({
//         unit: '%', // Can be 'px' or '%'
//         x: 25,
//         y: 25,
//         width: 50,
//         height: 50
//     });
//     const [result, setResult] = useState(null);
//     const [completedCrop, setCompletedCrop] = useState(null);

//     const handleMouseOver = useCallback(() => {
//         setHovering(true);
//     }, []);
//     const handleMouseOut = useCallback(() => {
//         setHovering(false);
//     }, []);

//     // create navbar scrolling 
//     const capture = useCallback(
//         () => {
//             const imageSrc = webcamRef.current.getScreenshot();
//             setpic(imageSrc);
//             console.log(pic);
//             setispic(true);
//             // alert(imageSrc);
//         },
//         [webcamRef]
//     );

//     const retake = () => {
//         setispic(false);
//     }

//     //take next picture and preview previous picture
//     const next = () => {
//         setfileArray([...fileArray, pic]);
//         setispic(false);
//     }

//     const download = (curpic) => {
//         var a = document.createElement("a");
//         a.href = curpic;
//         a.download = "Raw Image " + Date.now() + ".png";
//         a.click();
//     }

//     const downloadall = () => {
//         for (var i = 0; i < fileArray.length; i++) {
//             download(fileArray[i]);
//         }
//     }

//     const uploadimage = (src) => {
//         const name = "Capture" + Date.now() + ".png";
//         var file = dataURLtoFile(src, name);
//         const uploadData = new FormData();
//         uploadData.append('image', file);
//         uploadData.append('name', name);
//         uploadData.append('email', localStorage.getItem('email'));
//         uploadData.append('category', localStorage.getItem('category'));

//         axios.post('http://localhost:4000/image/add', uploadData)
//             .then(res => {
//                 console.log(res);
//                 // console.log("pog?");
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     const uploadall = () => {
//         for (var i = 0; i < fileArray.length; i++) {
//             uploadimage(fileArray[i]);
//         }
//         window.location.assign("http://localhost:3000/library")
//     }


//     const getCroppedImg = (c) => {
//         console.log(imgRef.current);
//         setCompletedCrop(c);
//         const canvas = document.createElement("canvas");
//         const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
//         const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
//         canvas.width = crop.width;
//         canvas.height = crop.height;
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(
//             imgRef.current,
//             crop.x * scaleX,
//             crop.y * scaleY,
//             crop.width * scaleX,
//             crop.height * scaleY,
//             0,
//             0,
//             crop.width,
//             crop.height
//         );
//         // console.log(canvas);
//         const base64Image = canvas.toDataURL("image/*", 1);
//         setResult(base64Image);
//         console.log(result);
//     }

//     function dataURLtoFile(dataurl, filename) {

//         var arr = dataurl.split(','),
//             mime = arr[0].match(/:(.*?);/)[1],
//             bstr = atob(arr[1]),
//             n = bstr.length,
//             u8arr = new Uint8Array(n);

//         while (n--) {
//             u8arr[n] = bstr.charCodeAt(n);
//         }

//         return new File([u8arr], filename, { type: mime });
//     }

//     const handleOpenclick = (img) => {
//         setIsCrop(true);
//         setpic(img);
//     }
//     const handleClose = () => {
//         setIsCrop(false);
//     }
//     const handleUpdate = () => {
//         setpic(result);
//         setIsCrop(false);
//     }
//     //delete image from array
//     const handleDelete = (index) => {
//         const newArray = fileArray.filter((item, i) => i !== index);
//         setfileArray(newArray);
//         console.log(newArray);
//     }


//     if (!ispic) {
//         return (
//             <Grid>
//                 <Grid item xs={12} container spacing={1} >
//                     <Grid item xs={9} align={"center"}>
//                         <Webcam
//                             audio={false}
//                             height={640}
//                             position="absolute"
//                             ref={webcamRef}
//                             screenshotFormat="image/*"
//                             width={640}
//                             // fit it into the container
//                             style={{
//                                 width: window.screen.width / 2,
//                                 height: window.screen.height / 2,
//                                 align: 'center',
//                                 // left: '30%', 
//                                 top: '20%'
//                             }}
//                             videoConstraints={videoConstraints}
//                         />
//                         <Grid item xs={3} align={"center"} spacing={2}>
//                             <Button
//                                 variant="outlined"
//                                 color="secondary"
//                                 style={{ maxWidth: '70px', maxHeight: '70px', minWidth: '150px', minHeight: '50px' }}
//                                 onClick={capture}
//                             >
//                                 <IconCameraSelfie size={40} />
//                                 <span style={{ marginLeft: '20px' }}>CAPTURE</span>
//                             </Button>
//                         </Grid>
//                         &nbsp;
//                         <Grid item xs={3} align={"center"} spacing={2}>
//                             <Button
//                                 onClick={uploadall}
//                                 variant="outlined"
//                                 color="secondary"
//                                 style={{ maxWidth: '200px', maxHeight: '70px', minWidth: '150px', minHeight: '50px' }}
//                             >
//                                 <IconDownload size={40} />
//                                 <span style={{ marginLeft: '20px' }}>UPLOAD ALL</span>
//                             </Button>
//                         </Grid>
//                     </Grid>
//                     <Grid item xs={3} align={"center"}>
//                         <Grid item xs={12} align={"center"}> Preview </Grid>
//                         <Scrollbars autoHide={false} overflowX={'hidden'} style={{ height: "100%" }}>
//                             {fileArray.length > 0 && fileArray.map((file, index) => {
//                                 return (
//                                     <div key={file}>
//                                         <img src={file} alt="preview" style={{ width: '100%' }} />
//                                         <Button onClick={() => handleDelete(index)}>Delete</Button>
//                                     </div>
//                                 )
//                             }
//                             )}
//                         </Scrollbars>
//                         <Divider textAlign='middle'>  </Divider>
//                     </Grid>
//                 </Grid>
//             </Grid>

//         )
//     }
//     else {
//         return (
//             <Grid>
//                 <Grid item xs={12} align={"center"} container spacing={2}>

//                     <Grid item xs={12} align={"center"}>
//                         <img src={pic} alt="temporary preview" style={{ width: '70%' }} />
//                     </Grid>
//                     <Grid item xs={12} align={"center"} spacing={3}>
//                         <Button spacing={2}
//                             variant="outlined"
//                             color="secondary"
//                             style={{ maxWidth: '70px', maxHeight: '70px', minWidth: '150px', minHeight: '50px' }}
//                             onClick={retake}
//                         >
//                             <IconRepeat size={40} />
//                             <span style={{ marginLeft: '20px' }}>RETAKE</span>
//                         </Button>
//                         <Button spacing={2}
//                             variant="outlined"
//                             color="secondary"
//                             style={{ maxWidth: '70px', maxHeight: '70px', minWidth: '150px', minHeight: '50px' }}
//                             // onClick={crop}
//                             onClick={() => handleOpenclick(pic)}
//                         >
//                             <IconCrop size={30} />
//                             <span style={{ marginLeft: '20px' }}>CROP</span>
//                         </Button>
//                         <Button spacing={2}
//                             variant="outlined"
//                             color="secondary"
//                             style={{ maxWidth: '70px', maxHeight: '70px', minWidth: '150px', minHeight: '50px' }}
//                             onClick={next}
//                         >
//                             <IconChevronsRight size={40} />
//                             <span style={{ marginLeft: '20px' }}>NEXT</span>
//                         </Button>
//                     </Grid>
//                     <Grid item xs={6} align={"center"}>
//                         <Dialog open={isCrop} onClose={handleClose} maxWidth="lg">
//                             <DialogTitle align="center"><h1>Crop Image</h1></DialogTitle>
//                             <DialogContent>
//                                 <Grid>
//                                     <Grid item xs={12} align={"center"}>
//                                         <div>
//                                             <div>
//                                                 <ReactCrop
//                                                     style={{ maxWidth: "80%" }}
//                                                     onImageLoaded={setCropimage}
//                                                     crop={crop}
//                                                     onChange={c => setCrop(c)}
//                                                     onComplete={c => getCroppedImg(c)}
//                                                 >
//                                                     <img src={pic} alt="Crop" ref={imgRef} />
//                                                 </ReactCrop>
//                                             </div>
//                                             {result && (
//                                                 <div>
//                                                     <img src={result} alt="cropped image" />
//                                                 </div>
//                                             )}
//                                         </div>
//                                         {/* <img src={pic} alt="temporary preview" style={{ width: '100%' }} /> */}
//                                         {/* <img
//                                                     src={file}
//                                                     width={window.screen.width / 2}
//                                                     height={window.screen.height / 2}
//                                                 /> */}
//                                     </Grid>
//                                     <Grid item xs="12" align={"center"} >
//                                         <Button variant="outlined" color="error" style={{ maxWidth: '70px', maxHeight: '70px', minWidth: '150px', minHeight: '50px', marginbottom: '20px' }}
//                                             onClick={handleClose} >
//                                             <span style={{ textAlign: "center" }}>CANCEL</span>
//                                         </Button>
//                                         <Button variant="outlined" color="success" style={{ maxWidth: '70px', maxHeight: '70px', minWidth: '150px', minHeight: '50px', marginLeft: '20px', marginbottom: '20px' }}
//                                             onClick={handleUpdate} >
//                                             <span style={{ textAlign: "center" }}>SAVE</span>
//                                         </Button>
//                                     </Grid>
//                                 </Grid>
//                             </DialogContent>
//                         </Dialog>
//                     </Grid>
//                 </Grid>
//             </Grid >
//         )
//     }
// };

// export default WebcamCapture;

