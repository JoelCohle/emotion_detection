import React from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from "@material-ui/core/styles/makeStyles";
// import 'simplebar-react/dist/simplebar.min.css';
// import '../../styles/css/SimplebarCustom.css';
import Skeleton from '@mui/material/Skeleton';

function toSeconds(time, skipMilliseconds = false) {
    // console.log('time is', time, ' and type', typeof time);

    let milliseconds = time.slice(9, 12);
    time = time.slice(0, 8);
    const [hours, minutes, seconds] = time.split(':');
    if (skipMilliseconds)
        return (Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds));
    return (Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds) + Number(milliseconds) * 0.001);
}

const TTSTarget = (props) => {
    console.log(props)
    return (
        <Grid item container wrap='nowrap' style={{ margin: '3px 0vh 0.6vh', height: '100%', }} >
            {
                ((subtitles) => {
                    let widgetSubtitles = [];
                    let gap = 0;

                    //const [index, subtitle] of props.subtitles
                    for (let i = 0; i < subtitles.length; i++) {
                        let giveGap = 3.5;

                        if (i > 0) {
                            let currentGap = (toSeconds(subtitles[i].start, true) - toSeconds(subtitles[i - 1].end, true));

                            giveGap += gap * 7;
                            if (currentGap > 0) {
                                console.log('current gap is', currentGap);
                                giveGap += (currentGap) * 7;
                                gap += currentGap;
                                console.log('gap is', gap);
                            }
                        }

                        widgetSubtitles.push(
                            // props.fittingAudio != -1 && (props.fittingAudio == -2 || props.fittingAudio != i) 
                            // ?
                            <div style={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                width: ((toSeconds(subtitles[i].end, true) - toSeconds(subtitles[i].start, true)) * 7) + '%',
                                minWidth: '7%',
                                left: i > 0 ? giveGap + '%' : '3.5%',
                            }}
                            >
                                <Grid
                                    item container
                                    id={'chunk' + i}
                                    style={{
                                        padding: '0.7vh 0.7vh',//'1.4vh 0.7vh',
                                        // width: ((toSeconds(subtitles[i].end, true) - toSeconds(subtitles[i].start, true)) * 7) + '%',
                                        width: '100%',
                                        // minWidth: '7%',
                                        // position: 'relative',
                                        // left: i > 0 ? giveGap + '%' : '3.5%',
                                        fontSize: 'clamp(14px, 1.67vh, 20px)',
                                        color: '#7d7d7d',
                                        WebkitBoxSizing: 'border-box',
                                        borderRadius: 4,
                                        border: subtitles[i].audioEmotion === subtitles[i].videoEmotion ?  '2px solid #00ff00': '2px solid #ff0000',
                                        boxSizing: 'border-box',
                                        background: 'rgb(252, 252, 252)',
                                        boxShadow: (() => {
                                            return 'rgb(100, 100, 100) 0px 0px 1px 1px inset' 
                                        })()
                                    }}
                                // onClick={() => props.selectChunk(i)}   
                                >
                                    <Grid item container style={{ width: 'auto', fontWeight: 600, marginRight: 10 }} >
                                        {(i < 9 ? '0' : '') + (i + 1)}
                                    </Grid>
                                    <Grid item container style={{ width: 'calc(100% - 41px)', height: '5.19vh', overflow: 'hidden', wordBreak: 'keep-all'}} title={subtitles[i].text} >
                                        {subtitles[i].text}
                                    </Grid>
                                </Grid>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        width: '100%',
                                        alignItems: 'center',
                                    }} 
                                >
                                    <div>
                                        <img src='images/video.png' style={{ opacity: 0.7, width: '1rem', marginRight: '0.25rem' }} />
                                    </div>
                                    <div style={{ marginRight: "auto" }}>
                                        {subtitles[i].videoEmotion}
                                    </div>
                                    <div>
                                        <img src='images/audio.png' style={{ opacity: 0.7, width: '1rem', marginRight: '0.25rem' }} />
                                    </div>
                                    <div style={{ marginRight: "0.5rem" }}>
                                        {subtitles[i].audioEmotion}
                                    </div>
                                </div>
                            </div>

                            // :

                            // <Skeleton
                            //     id={'skeleton'+i}
                            //     variant='rectangular'
                            //     style={{
                            //         minWidth: ((toSeconds(subtitles[i].end, true) - toSeconds(subtitles[i].start, true)) * 7) + '%',
                            //         height: '7.2vh',
                            //         position: 'relative',
                            //         left: i > 0 ? giveGap + '%' : '3.5%',
                            //         borderRadius: 4,
                            //         border: '2px solid #e9e9e9',
                            //     }}
                            // />
                        )
                    }
                    return widgetSubtitles;
                }
                )(props.subtitles)
            }
        </Grid>
    )
};
export default TTSTarget;
