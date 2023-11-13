import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ReactPlayer from 'react-player';
import { CircularProgress } from '@material-ui/core';

import SRTViewer from './SRTViewer';
import AudioSection from './AudioSection.js';

const PreviewPage = (props) => {

    return (
        <Grid
            item container
            direction='column'
            alignItems='center'
            style={{
                marginTop:"2vh",
                width: '88.8vw',//'95%',
                height: '65vh'
            }}
        >
            
            <Grid
                item container
                style={{width: props.isMergingAudioVideo ? '75vw' : '32vw', height: props.isMergingAudioVideo ? `32.04vh` : 'initial'}}
            >
                    <ReactPlayer
                    url={"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                    controls={true}
                    width="40vw"
                    height="100%"
                    />
                {
                    // props.isMergingAudioVideo
                    // ?
                    // <Grid
                    //     item
                    //     container
                    //     direction="column"
                    //     justify="space-evenly"
                    //     alignItems="center"
                    //     style={{
                    //         // width: '75vw',
                    //         // paddingTop: "56.25%",
                    //     }}
                    // >
                    //     <Grid item>
                    //     <CircularProgress
                    //         size='6.5vw'//"7vh"
                    //         style={{
                    //         color: "rgb(14, 102, 172)",
                    //         }}
                    //     />
                    //     </Grid>
                    //     <Grid
                    //     item
                    //     style={{
                    //         fontSize: "clamp(20px, 2.22vh, 2.22vh)",
                    //         color: "#727272",
                    //     }}
                    //     >
                    //     Loading, Please wait
                    //     </Grid>
                    // </Grid>
                    // :
                    // (props.filesURLsObject && props.task && props.filesURLsObject[props.task]) || props.videoURL
                    // ?
                    // (
                    //     <ReactPlayer
                    //     url={"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                    //     controls={true}
                    //     width="40vw"
                    //     height="100%"
                    //     />
                    //     // <ResponsivePlayer
                    //     //     srcURL={props.filesURLsObject[props.task] ? props.filesURLsObject[props.task] : props.videoURL}
                    //     //     pcWidth='75vw'
                    //     //     seekTime={seekTime}
                    //     //     setSeekTime={setSeekTime}
                    //     // />
                    // )
                    // :
                    // null
                }
            </Grid>
            <AudioSection
                // playAudio={playAudio}
                // pauseAudio={pauseAudio}
                // fitAudio={fitAudio}
                // outputChunks= {outputChunks}
                // isDuration= {isDuration}
                // totalSeconds= {totalSeconds}
                isloading = {props.setIsCurrentTaskRunning}
                // toSeconds={toSeconds}
                // fittingAudio={fittingAudio}
                // subtitles= {subtitles}
                // selectedChunk= {selectedChunk}
                // setSelectedChunk={setSelectedChunk}
                // asrSubtitles={asrSubtitles}
                // audios={audios}
                isLoading={props.isCurrentTaskRunning}
                // checkInputsAvailability={checkInputsAvailability}
                gotoNextPage={props.gotoNextPage}
                mergeAudiosVideo={props.mergeAudiosVideo}
                isMergingAudioVideo={props.isMergingAudioVideo}
                task={props.task}
                availableTasksObject={props.availableTasksObject}
            />
            
        </Grid>
    )
};

export default PreviewPage;
