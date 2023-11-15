import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Skeleton from '@mui/material/Skeleton';
import SimpleBar from 'simplebar-react';

import TimeBar from './TimeBar.js';
import TTSTarget from './TTSTarget.js';

const AudioSection = (props) => {
    const [totalSeconds, setTotalSeconds] = useState(120)
    const [subtitles, setSubtitles] = useState([
        { start: "00:00:15", end: "00:00:17", text: "Apon sign up a unique. " },
        { start: "00:00:17", end: "00:00:21", text: "an anonymous device id is assigned to every user. " },
        { start: "00:00:21", end: "00:00:25", text: "The linking of device id to mobile number is one time. " },
        { start: "00:00:25", end: "00:00:28", text: "had a securely encrypted and stored in a server. " },
        { start: "00:00:28", end: "00:00:33", text: "All future interactions from device to server is done through device. " },
        { start: "00:00:33", end: "00:00:36", text: "id only no personal information is exchanged. " },
        { start: "00:00:36", end: "00:00:39", text: "after the first time registration. " },
        { start: "00:00:39", end: "00:00:42", text: "When you come near other registered devices, the app. " },
        { start: "00:00:42", end: "00:00:46", text: "stores an encrypted signature of this interaction on your form. " },
        { start: "00:00:46", end: "00:00:48", text: "The first interaction information is not. " },
        { start: "00:00:48", end: "00:00:52", text: "pushed to the server unless you are considered at risk. " },
        { start: "00:00:52", end: "00:00:56", text: "Either you have come in contact with someone who later has been diagnosed higher is " },
        { start: "00:00:56", end: "00:01:01", text: "or yourself assessment has shown you to be at risk. " },
        { start: "00:01:01", end: "00:01:04", text: "Government of India uses your information only for it. " },
        { start: "00:01:04", end: "00:01:07", text: "ministering necessary medical interventions. " }
    ])


    // function selectChunk(index) {
    //     console.log('chunk is', document.getElementById('chunk' + index).style.boxShadow);

    //     if (document.getElementById('chunk' + index).style.boxShadow == 'rgb(115, 197, 242) 0px 0px 2px 2px inset') {
    //         console.log('true, selected chunk is', props.selectedChunk);
    //         console.log('background is', document.getElementById('chunk' + props.selectedChunk).style.background);
    //         if (document.getElementById('chunk' + props.selectedChunk).style.background == 'rgb(252, 252, 252)')
    //             document.getElementById('chunk' + (props.selectedChunk)).style.boxShadow = 'rgb(34, 192, 31) 0px 0px 1px 1px inset';
    //         else
    //             document.getElementById('chunk' + (props.selectedChunk)).style.boxShadow = 'rgb(237, 12, 12) 0px 0px 1px 1px inset';
    //         // document.getElementById('chunk'+selectedChunk).style.boxShadow = 'rgb(237, 12, 12) 0px 0px 1px 1px inset';

    //         props.setSelectedChunk(-1);
    //     }
    //     else {
    //         console.log('false');
    //         if (props.selectedChunk != -1) {
    //             console.log('background is', document.getElementById('chunk' + props.selectedChunk).style.background);
    //             if (document.getElementById('chunk' + props.selectedChunk).style.background == 'rgb(252, 252, 252)')
    //                 document.getElementById('chunk' + (props.selectedChunk)).style.boxShadow = 'rgb(34, 192, 31) 0px 0px 1px 1px inset';
    //             else
    //                 document.getElementById('chunk' + (props.selectedChunk)).style.boxShadow = 'rgb(237, 12, 12) 0px 0px 1px 1px inset';
    //             // document.getElementById('chunk'+selectedChunk).style.boxShadow = 'rgb(237, 12, 12) 0px 0px 1px 1px inset';
    //         }
    //         document.getElementById('chunk' + index).style.boxShadow = 'rgb(115, 197, 242) 0px 0px 2px 2px inset';
    //         if (props.audios && props.audios['audio'] && props.audios['audio'].length)
    //             props.audios['audio'][index].currentTime = 0;
    //         props.setSelectedChunk(index);
    //     }

    // }
    function isValidTime(timeString) {
        timeString = timeString.slice(0, 8);
        const timeSections = timeString.split(':');
        if (timeSections.length == 3) {
            const hours = Number(timeSections[0]);
            const minutes = Number(timeSections[1]);
            const seconds = Number(timeSections[2]);

            if (Number.isInteger(hours) && hours > -1 &&
                Number.isInteger(minutes) && minutes > -1 && minutes < 60 &&
                Number.isInteger(seconds) && seconds > -1 && seconds < 60)
                return true;
            else
                return false;
        }
        return false
    }

    useEffect(() => {
        // if (file) {
        //     let fr = new FileReader();
        //     fr.readAsText(file);
        //     fr.onload = function () {
        //         let output = parse(fr.result);

        //         for (let i = 0; i < output.length; i++) {
        //             output[i].start = formatTimestamp(output[i].start);
        //             console.log(i + ')timestamp start value is', output[i].start);
        //             // output[i].start = output[i].start.slice(0, 8);

        //             output[i].end = formatTimestamp(output[i].end);
        //             console.log(i + ')timestamp end value is', output[i].end);
        //             // output[i].end = output[i].end.slice(0, 8);
        //             if (i <= output.length) {
        //                 console.log('last end time is', output[i].end);
        //                 if (isValidTime(output[i].end)) {
        //                     console.log('timeee', (toSeconds(output[i].end) - toSeconds(output[i].start)), ' and', i);
        //                     setTotalSeconds(Math.floor(toSeconds(output[i].end)));
        //                 }
        //             }
        //         }

        //         setSubtitles(output);
        //     }
        // }
    }, []);
    return (
        <>
            <Grid item container style={{ width: '100%', height: '100%' }} >
                <Grid item container justifyContent='flex-end' style={{ width: '100%', height: '100%' }} >
                    { subtitles ?
                            <Grid item container direction='column' style={{ width: '100%', height: '100%', background: '#e9e9e9', }}  >
                                <SimpleBar style={{ width: '100%', height: '100%' }} autoHide={false} >
                                    <TimeBar totalSeconds={totalSeconds} />
                                    <Grid item container direction='column' style={{ height: '50%' }} >
                                        <TTSTarget
                                            subtitles={subtitles}
                                        />
                                    </Grid>
                                </SimpleBar>
                            </Grid>
                            :
                            <Grid style={{ width: '100%', height: '100%' }} >
                                <Skeleton variant='rectangular' width='100%' height='100%' />
                            </Grid>
                    }
                </Grid>
            </Grid>
        </>
    );
};

export default AudioSection;
