import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import ReactPlayer from 'react-player';

import SRTViewer from './SRTViewer';

const EmotionDetection = (props) => {
    console.log("EmotionDetection props: ", props);

    const [mobileDisplay, setMobileDisplay] = useState(false);

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
                    subtitles={""}
                    changesFunction={props.setChangesMessage}
                    changesMessage={props.changesMessage}
                    warning={props.warning}
                    setWarning={props.setWarning}
                    setMessage={props.setMessage}
                    filesURLsObject={props.filesURLsObject}
                    // file={file}
                    isLoading={props.isCurrentTaskRunning}
                    setIsCurrentTaskRunning={props.setIsCurrentTaskRunning}
                    // merge={merge}
                    // split={split}
                    // downloadData = {downloadData}
                    // setDownloadData = {setDownloadData}
                    // deleteSubtitle={deleteSubtitle}
                    // progress={data_task ? data_task.findATask.Progress: "loading"}
                    />

            </Grid>

            {/* ResponsivePlayer container */}
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
                                {props.filename}
                            </Grid>
                            <Grid item>
                                    <ReactPlayer
                                    url={"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                                    controls={true}
                                    width="40vw"
                                    height="100%"
                                    />
                            {/*
                                {props.videoURL && (
                                    <ReactPlayer
                                    url={"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                                    controls={true}
                                    width="100%"
                                    height="100%"
                                    />
                                )}
                            */}
                            </Grid>
                        </Grid>
                    </Tooltip>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default EmotionDetection;
