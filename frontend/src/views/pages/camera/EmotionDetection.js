import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Button } from "@mui/material";
import Tooltip from "@material-ui/core/Tooltip";
import ReactPlayer from 'react-player';
import axios from 'axios';
import { AssemblyAI } from 'assemblyai';

import SRTViewer from './SRTViewer';
import { parse } from "dotenv";

const ASRclient = new AssemblyAI({
  apiKey: 'e69ed6d728484972b680c1c2fd76ddc3',
});

let srt = `
1
00:00:11,544 --> 00:00:12,682
Hello
`;

const sampleSRT = `
1
00:02:16,612 --> 00:02:19,376
Senator, we're making
our final approach into Coruscant.

2
00:02:19,482 --> 00:02:21,609
Very good, Lieutenant.

3
00:03:13,336 --> 00:03:15,167
We made it.

4
00:03:18,608 --> 00:03:20,371
I guess I was wrong.

5
00:03:20,476 --> 00:03:22,671
There was no danger at all.

1
00:02:16,612 --> 00:02:19,376
Senator, we're making
our final approach into Coruscant.

2
00:02:19,482 --> 00:02:21,609
Very good, Lieutenant.

3
00:03:13,336 --> 00:03:15,167
We made it.

4
00:03:18,608 --> 00:03:20,371
I guess I was wrong.

5
00:03:20,476 --> 00:03:22,671
There was no danger at all.

1
00:02:16,612 --> 00:02:19,376
Senator, we're making
our final approach into Coruscant.

2
00:02:19,482 --> 00:02:21,609
Very good, Lieutenant.

3
00:03:13,336 --> 00:03:15,167
We made it.

4
00:03:18,608 --> 00:03:20,371
I guess I was wrong.

5
00:03:20,476 --> 00:03:22,671
There was no danger at all.
1
00:02:16,612 --> 00:02:19,376
Senator, we're making
our final approach into Coruscant.

2
00:02:19,482 --> 00:02:21,609
Very good, Lieutenant.

3
00:03:13,336 --> 00:03:15,167
We made it.

4
00:03:18,608 --> 00:03:20,371
I guess I was wrong.

5
00:03:20,476 --> 00:03:22,671
There was no danger at all.
`;

function parseSrt(srtContent) {
    // Split the SRT content into individual subtitle blocks
    const subtitleBlocks = srtContent.split(/\n\s*\n/);

    // Parse each subtitle block
    const subtitles = subtitleBlocks.map((block) => {
        const lines = block.trim().split('\n');
        if (lines.length >= 3) {
            const id = parseInt(lines[0], 10);
            const [start, end] = lines[1].split(' --> ');
            const text = lines.slice(2).join('\n');

            return {
                id,
                start,
                end,
                text,
            };
        }
        return null; // Invalid subtitle block
    });

    // Filter out null values (invalid subtitle blocks)
    return subtitles.filter((subtitle) => subtitle !== null);
}

const EmotionDetection = (props) => {
    const [recordingSrc, setRecordingSrc] = useState(null);
    const [scriptSrc, setScriptSrc] = useState(null);
    const [job, setJob] = useState(null);
    const [subtitles, setSubtitles] = useState(null);
    const [parsedSubtitles, setParsedSubtitles] = useState(null);

    useEffect(() => {
        setParsedSubtitles(parseSrt(sampleSRT));
        console.log(parsedSubtitles);
    }, []);

    // const getSubtitles = async (videoName) => {
    //     try {
    //         const response = await axios.post('http://localhost:4000/job/getSubtitles', {
    //             videoName: videoName,
    //         });

    //         setSubtitles(response.data);
    //         console.log(response.data); // Display subtitles or save them in the state
    //         let storedSubtitles = JSON.parse(localStorage.getItem("subtitles"));
    //         if (storedSubtitles !== null) {
    //             localStorage.removeItem("subtitles");
    //         }
    //         localStorage.setItem("subtitles", subtitles);
    //     } catch (error) {
    //         console.error('Error getting subtitles:', error.message);
    //     }
    //     console.log("here");
    //     setSubtitles("asdfasdfasdf");
    //     localStorage.setItem("subtitles", subtitles);
    // };

    // const getSubtitles = async (data) => {
    //     const transcript = await ASRclient.transcripts.create(data);
    //     console.log(transcript.text);
    // };

    useEffect(() => {
        // console.log("printing localStorage from EmotionDetection");
        // console.log(JSON.parse(localStorage.getItem("jobStruct")));
        const jobDetails = JSON.parse(localStorage.getItem("jobStruct"));
        console.log(jobDetails);
        setJob(jobDetails);
        // setJob((prevJob) => {
        //     console.log(prevJob); // This might still print null if setJob hasn't executed yet
        //     return jobDetails; // Update the state with jobDetails
        // });
        console.log(job);
        setRecordingSrc(jobDetails.recordingSrc);
        setScriptSrc(jobDetails.scriptSrc);
        // var name = jobDetails.name.split("/").pop().replace(".txt", ".webm")
        // const data = {
        //     audio_url: '/home/gokul/Videos/temp.mp4'
        // };
        // console.log(data);
        // getSubtitles(data);
        // console.log(subtitles);
    }, []);

    // useEffect(() => {
    //     console.log(job);
    //     var name = job.name.split("/").pop().replace(".txt", ".webm")
    //     getSubtitles(name);
    //     console.log(subtitles);
    // }, [job]);

    const [mobileDisplay, setMobileDisplay] = useState(false);

    const gotoPreviewPage = () => {
        const storedJobStruct = localStorage.getItem("jobStruct");
        if (storedJobStruct) {
            var jobStruct = JSON.parse(storedJobStruct);
            jobStruct.status = "EmotionDetected";
            // console.log("from gotoPreviewPage: ", jobStruct);
            localStorage.setItem("jobStruct", JSON.stringify(jobStruct));
            // console.log(parsedSubtitles);
            localStorage.setItem("parsedSubtitles", JSON.stringify(parsedSubtitles));
            window.location.reload();
            // console.log(JSON.parse(localStorage.getItem("parsedSubtitles")));
        }
        else {
            console.log("jobStruct not found in localStorage");
        }
    };

    return (
        <Grid
        item
        container
        xs={12}
        xl={12}
        sm={12}
        md={12}
        style={{
            marginTop:"2vh",
                width: "94vw",
                height: "74vh",
                background: "#F8F8F8",
                boxShadow: "4px 4px 25px 0px rgba(174, 173, 173, 0.25), -4px -4px 25px -4px rgba(174, 173, 173, 0.25)"
        }}
        >
            {/* Header bar container */}
            <Grid
            item
            container
            justifyContent="flex-start"
            alignContent="center"
            style={{
                height: "10%",
                    width: "94vw",
                    background: "#0D558F",
                    position: "relative",
            }}
            >
                <button style={{border: "none", background: "none", paddingLeft:"1.302vw",position:"relative",zIndex:2,color:"white", pointerEvents: "none",paddingTop:"0.5vh"}} >
                    <input
                    type="image"
                    src="images/Vector-5.png"
                    style={{ opacity: 0.3, height: mobileDisplay ? "25%":"2.88vh" }}
                    />
                </button>
                <button style={{border: "none", background: "none", paddingLeft:"0.60vw",position:"relative",zIndex:2,color:"white", pointerEvents: "none",paddingTop:"0.5vh"}} >
                    <input
                    type="image"
                    src="images/Vector-4.png"
                    style={{ opacity: 0.3, height: mobileDisplay ? "25%":"2.88vh",filter: "grayscale(10%)" }}
                    />
                </button>
                <button style={{border: "none", background: "none", paddingLeft:"0.60vw",position:"relative",zIndex:2,color:"white", pointerEvents: "none",paddingTop:"0.5vh"}} >
                    <input
                    type="image"
                    src="images/Group 919.png"
                    style={{ opacity: 0.3, height: mobileDisplay ? "25%":"3.28vh",filter: "grayscale(10%)" }}
                    />
                </button>
                <button style={{border: "none", background: "none", paddingLeft:"0.60vw",position:"relative",zIndex:2,color:"white", pointerEvents: "none",paddingTop:"0.5vh"}} >
                    <input
                    type="image"
                    src="images/Group 601.png"
                    style={{ opacity: 0.3, height: mobileDisplay ? "25%":"3.19vh",filter: "grayscale(10%)" }}
                    />
                </button>
                <button style={{border: "none", background: "none", paddingLeft:"0.60vw",position:"relative",zIndex:2,color:"white", pointerEvents: "none",paddingTop:"0.5vh"}} >
                    <input
                    type="image"
                    src="images/Group 608.png"
                    style={{ opacity: 0.3, height: mobileDisplay ? "25%":"2.06vh",filter: "grayscale(10%)" }}
                    />
                </button>
                <button style={{border: "none", background: "none", paddingLeft:"0.60vw",position:"relative",zIndex:2,color:"white", pointerEvents: "none",paddingTop:"0.5vh"}} >
                    <input
                    type="image"
                    src="images/Vector-1.png"
                    style={{ opacity: 0.3, height: mobileDisplay ? "25%":"2.88vh",filter: "grayscale(10%)" }}
                    />
                </button>
                <button style={{border: "none", background: "none", paddingLeft:"0.60vw",position:"relative",zIndex:2,color:"white",paddingTop:"0.5vh"}}>
                    <input
                    type="image"
                    src="images/Undo.png"
                    /* onMouseEnter={() => setSaveHover3("hover")}
                    onMouseLeave={() => setSaveHover3("")} */
                style={{ opacity: 1, height: mobileDisplay ? "25%":"2.88vh",filter: "grayscale(10%)" }}
                />
                </button>
                <button style={{border: "none", background: "none", paddingLeft:"0.60vw",position:"relative",zIndex:2,color:"white",paddingTop:"0.5vh"}}>
                    <input
                    type="image"
                    src="images/Redo.png"
                    /* onMouseEnter={() => setSaveHover4("hover")}
                    onMouseLeave={() => setSaveHover4("")} 
                style={ saveHover4 === "hover" ? { opacity: 1, height: mobileDisplay ? "25%":"2.88vh",filter: "grayscale(10%)" } :  */
                    style = {{ opacity: 1, height: mobileDisplay ? "25%":"2.88vh",filter: "grayscale(10%)" }}
                    />
                </button>
                <button style={{border: "none", background: "none", paddingLeft:"0.60vw",position:"relative",zIndex:2,paddingTop:"0.5vh"}}>
                    <input
                    type="image"
                    src="images/Save.png"
                    alt=" Save "
                    /* onMouseEnter={() => setSaveHover("hover")}
                    onMouseLeave={() => setSaveHover("")} */
                    // onClick={saveASRText}
                    style={{ opacity: 1, height: mobileDisplay ? "25%":"2.88vh",filter: "grayscale(100%)" }}
                    />
                </button>
                <button style={{border: "none", background: "none", paddingLeft:"0.60vw",position:"relative",zIndex:2}}>
                    <input
                    type='image'
                    src='images/download.png'
                    alt=' Download '
                    /* onMouseEnter={() => setSaveHover2("hover")}
                    onMouseLeave={() => setSaveHover2("")} */
                    // onClick={downloadASRVtt}
                    style={{ opacity: 1, height: mobileDisplay ? "25%":"2.88vh",filter: "grayscale(100%)" }}
                    />
                </button>
            </Grid>

            {/* SRTEditor container */}
            <Grid
            item
            container
            direction="column"
            alignItems="flex-start"
            style={{
                width: "50%",
                    height: "65vh",
                    marginTop: "1vw",
                    marginLeft: "2vw"
            }}
            >
                <span style={{fontFamily:"Montserrat",color:"#6c6c6c",fontSize:"16px",fontWeight:500}}>SRT file</span>
                <SRTViewer
                    // setSeekTime={setSeekTime}
                    subtitles={sampleSRT}
                    // changesFunction={props.setChangesMessage}
                    // changesMessage={props.changesMessage}
                    // warning={props.warning}
                    // setWarning={props.setWarning}
                    // setMessage={props.setMessage}
                    filesURLsObject={""}
                    // file={file}
                    isLoading={""}
                    setIsCurrentTaskRunning={""}
                    // merge={merge}
                    // split={split}
                    // downloadData = {downloadData}
                    // setDownloadData = {setDownloadData}
                    // deleteSubtitle={deleteSubtitle}
                    // progress={data_task ? data_task.findATask.Progress: "loading"}
                    />

            </Grid>

            {/* ResponsivePlayer container */}

            <Grid item container justifyContent="center" style={{ width: "45%", height: "70%", marginTop: "1vw", }} >
                <Grid item container direction="column" justifyContent="space-between" style={{ width: "36vw", height: "90%", }} >
                    <Tooltip title="Recorded Video" style={{ fontFamily: "Montserrat" }}>
                        <Grid item container direction="column" alignItems="left">
                            <Grid item style={{ paddingBottom: "10px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "inline-block", maxWidth: "20em", fontSize: "18px", fontWeight: "600", color: "#7b7b7b", }} >
                                <span style={{ fontFamily: "Montserrat", color: "#6c6c6c", fontSize: "20px", fontWeight: 500 }}>Recorded Footage</span>
                            </Grid>
                            <Grid item>
                                <div style={{ display: 'flex' }}>

                                    <div className="video-player">
                                        {recordingSrc ? (
                                            <div className="recorded-player">
                                                <video className="live-player" src={recordingSrc} controls></video>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Tooltip>
                </Grid>
            </Grid>

            {/*
            <Grid
            item
            container
            justifyContent="center"
            style={{
                width: "45%",
                    height: "90%",
                    marginTop: "1vw",
            }}
            >
                <Grid
                item
                container
                direction="column"
                justifyContent="space-between"
                style={{
                    width: "36vw",
                        height: "90%",
                }}
                >
                    <Tooltip title={props.filename} style={{fontFamily:"Montserrat"}}>
                        <Grid item container direction="column" alignItems="left">
                            <Grid
                            item
                            style={{
                                whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "inline-block",
                                    maxWidth: "20em",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    color: "#7b7b7b",
                            }}
                            >
                                Recording
                            </Grid>
                            <Grid 
                                item 
                                height="100%"
                            >
                                    <ReactPlayer
                                    url={recordingSrc}
                                    controls={true}
                                    width="40vw"
                                    height="100%"
                                    />
                            </Grid>
                        </Grid>
                    </Tooltip>
                </Grid>
            </Grid>
            */}
            <Grid item container justifyContent="center" style={{height:"5%"}}>
            {/* <Grid item xs={12} align={'center'}> */}
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            gotoPreviewPage();
                        }}
                        type="button"
                        disableRipple={true}
                        // disabled={!recordedVideo}
                        style={{ backgroundColor: '#0e66ac', borderRadius: '4px', padding: "15px", color: "white", fontSize: "14px", paddingLeft:"5%", paddingRight:"5%"}}
                    >
                        <span>NEXT</span>
                    </Button>
            {/* </Grid> */}
            </Grid>
            <Grid item container justifyContent="center" style={{height:"5%"}}></Grid>
        </Grid>
    );
};

export default EmotionDetection;
