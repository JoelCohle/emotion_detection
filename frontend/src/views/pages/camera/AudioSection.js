import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Skeleton from '@mui/material/Skeleton';

import TimeBar from './TimeBar.js';
import TTSTarget from './TTSTarget.js';

const AudioSection = (props) => {

    function selectChunk(index) {
        console.log('chunk is', document.getElementById('chunk' + index).style.boxShadow);

        if (document.getElementById('chunk' + index).style.boxShadow == 'rgb(115, 197, 242) 0px 0px 2px 2px inset') {
            console.log('true, selected chunk is', props.selectedChunk);
            console.log('background is', document.getElementById('chunk' + props.selectedChunk).style.background);
            if (document.getElementById('chunk' + props.selectedChunk).style.background == 'rgb(252, 252, 252)')
                document.getElementById('chunk' + (props.selectedChunk)).style.boxShadow = 'rgb(34, 192, 31) 0px 0px 1px 1px inset';
            else
                document.getElementById('chunk' + (props.selectedChunk)).style.boxShadow = 'rgb(237, 12, 12) 0px 0px 1px 1px inset';
            // document.getElementById('chunk'+selectedChunk).style.boxShadow = 'rgb(237, 12, 12) 0px 0px 1px 1px inset';

            props.setSelectedChunk(-1);
        }
        else {
            console.log('false');
            if (props.selectedChunk != -1) {
                console.log('background is', document.getElementById('chunk' + props.selectedChunk).style.background);
                if (document.getElementById('chunk' + props.selectedChunk).style.background == 'rgb(252, 252, 252)')
                    document.getElementById('chunk' + (props.selectedChunk)).style.boxShadow = 'rgb(34, 192, 31) 0px 0px 1px 1px inset';
                else
                    document.getElementById('chunk' + (props.selectedChunk)).style.boxShadow = 'rgb(237, 12, 12) 0px 0px 1px 1px inset';
                // document.getElementById('chunk'+selectedChunk).style.boxShadow = 'rgb(237, 12, 12) 0px 0px 1px 1px inset';
            }
            document.getElementById('chunk' + index).style.boxShadow = 'rgb(115, 197, 242) 0px 0px 2px 2px inset';
            if (props.audios && props.audios['audio'] && props.audios['audio'].length)
                props.audios['audio'][index].currentTime = 0;
            props.setSelectedChunk(index);
        }

    }
    return (
        <>
            {(
                props.subtitles && (
                    <Grid
                        item container
                        style={{
                            position: 'relative',
                            top: props.isMergingAudioVideo ? 0 : 'calc(19vw - 20px)',//'21vw',
                            width: '100%',
                            height: '42%'
                        }}
                    >
                        {/* <Grid
                        item container
                        justify='center'
                        alignItems='center'
                        style={{width: '100%', height: '15%', color: '#7b7b7b', fontSize: 'clamp(20px, 2.04vh, 22px)'}}
                    >
                        Edit Audio
                    </Grid> */}
                        <span style={{ height: '2.5vh', color: '#7b7b7b', fontSize: 'clamp(2.04vh, 2.04vh, 22px)', fontWeight: 600 }}>Edit Audio</span>
                        <Grid
                            item container
                            style={{
                                width: '100%',
                                height: '85%'
                            }}
                        >
                            <Grid
                                item container
                                justify='flex-end'
                                style={{
                                    width: '97.35%',
                                    height: '100%'
                                }}
                            >
                                {
                                    props.outputChunks.length && props.isDuration && !props.isLoading
                                        ?
                                        <Grid
                                            item container
                                            direction='column'
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                background: '#e9e9e9',
                                                overflow: 'auto'
                                            }}
                                        >
                                            <div style={{ flex: 1, overflowY: 'scroll', padding: '20px' }}>
                                                <TimeBar
                                                    totalSeconds={props.totalSeconds}
                                                />
                                                <Grid
                                                    item container
                                                    direction='column'
                                                    style={{
                                                        // width: '100%',
                                                        height: '78.3%'
                                                    }}
                                                >

                                                    <TTSTarget
                                                        toSeconds={props.toSeconds}
                                                        fittingAudio={props.fittingAudio}
                                                        selectChunk={selectChunk}
                                                        subtitles={props.subtitles}
                                                        audios={props.audios}
                                                    />
                                    {/*{(
                                                        props.asrSubtitles ? (
                                                            <TTSSource
                                                                subtitles={props.subtitles}
                                                                toSeconds={props.toSeconds}
                                                                asrSubtitles={props.asrSubtitles}
                                                                selectedChunk={props.selectedChunk}
                                                                sourceLanguageVisibility={sourceLanguageVisibility}
                                                            />
                                                        ) :
                                                            (
                                                                null
                                                            )
                                                    )}
                                        */}


                                                </Grid>
                                            </div>
                                        </Grid>
                                        :
                                        <Grid
                                            style={{ width: '100%', height: '100%' }}
                                        >
                                            <Skeleton variant='rectangular' width='100%' height='100%' />
                                        </Grid>
                                }
                                <Grid
                                item 
                                xs = {12}
                                xl = {12}
                                md = {12}
                                sm = {12}
                                justifyContent='flex-start' 
                                style = {{paddingTop: "4vh"}}>
                                    <Button
                                        // className={classes.addNewFile}//${props.classes.label}`}
                                        disableRipple={true}
                                        style={{
                                            padding: '5px 15px',
                                            color: 'white',
                                            marginTop: 5,
                                            marginRight: 5
                                        }}
                                        onClick={() => {
                                            // prepareFile();

                                            // props.runTTS();
                                            props.mergeAudiosVideo();
                                        }}
                                    >
                                        Merge Audios & Videos
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>)
            )}
        </>
    );
};

export default AudioSection;
