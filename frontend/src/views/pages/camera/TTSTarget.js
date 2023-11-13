import React from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from "@material-ui/core/styles/makeStyles";
// import 'simplebar-react/dist/simplebar.min.css';
// import '../../styles/css/SimplebarCustom.css';
import Skeleton from '@mui/material/Skeleton';



const TTSTarget = (props) =>{
    console.log(props)
    return(
        <Grid
            item container
            wrap='nowrap'
            style={{
                margin: '3px 0vh 0.6vh',//'1.2vh 0vh',
                // width: '100%',
                height: '42%',//'40.2%'
            }}
        >
            {
                (( subtitles ) => {
                    let widgetSubtitles = [];
                    let gap = 0;
                    
                    //const [index, subtitle] of props.subtitles
                    for(let i=0 ; i<subtitles.length ; i++) {
                        let giveGap = 3.5;

                        if (i > 0) {
                            let currentGap = (props.toSeconds(subtitles[i].start, true) - props.toSeconds(subtitles[i - 1].end, true));
                            
                                giveGap += gap * 7;
                                if (currentGap > 0) {
                                    console.log('current gap is', currentGap);
                                    giveGap += (currentGap)*7;
                                    gap += currentGap;
                                    console.log('gap is', gap);
                                }
                        }

                        widgetSubtitles.push(
                            props.fittingAudio != -1 && (props.fittingAudio == -2 || props.fittingAudio != i) 
                            ?
                            
                            <Grid
                                item container
                                id={'chunk'+i}
                                style={{
                                    padding: '0.7vh 0.7vh',//'1.4vh 0.7vh',
                                    minWidth: ((props.toSeconds(subtitles[i].end, true) - props.toSeconds(subtitles[i].start, true)) * 7) + '%',
                                    position: 'relative',
                                    left: i > 0 ? giveGap + '%' : '3.5%',
                                    fontSize: 'clamp(14px, 1.67vh, 20px)',
                                    color: '#7d7d7d',
                                    WebkitBoxSizing: 'border-box',
                                    borderRadius: 4,
                                    border: '2px solid #e9e9e9',
                                    boxSizing: 'border-box',
                                    background: props.toSeconds(subtitles[i].end) - props.toSeconds(subtitles[i].start) + 0.040 >= props.audios['audioDurations'][i] && props.toSeconds(subtitles[i].end) - props.toSeconds(subtitles[i].start) - 0.040 <= props.audios['audioDurations'][i] ? 'rgb(252, 252, 252)' : 'rgb(255, 243, 243)',
                                    boxShadow: (() => {
                                        console.log('while rendering', i, props.toSeconds(subtitles[i].end) - props.toSeconds(subtitles[i].start) + 0.040, '>=', props.audios['audioDurations'][i], ' &&', props.toSeconds(subtitles[i].end) - props.toSeconds(subtitles[i].start) - 0.040, '<=', props.audios['audioDurations'][i]);

                                        return props.toSeconds(subtitles[i].end) - props.toSeconds(subtitles[i].start) + 0.040 >= props.audios['audioDurations'][i] && props.toSeconds(subtitles[i].end) - props.toSeconds(subtitles[i].start) - 0.040 <= props.audios['audioDurations'][i] ? 'rgb(34, 192, 31) 0px 0px 1px 1px inset' : 'rgb(237, 12, 12) 0px 0px 1px 1px inset'
                                    })()
                                }}
                                onClick={() => props.selectChunk(i)}   
                            >
                                <Grid
                                    item container
                                    style={{
                                        width: 'auto',
                                        fontWeight: 600,
                                        marginRight: 10
                                    }}
                                >
                                    {(i < 9 ? '0' : '') + (i + 1)}
                                </Grid>
                                <Grid
                                    item container
                                    style={{ width: 'calc(100% - 41px)', height: '5.19vh', overflow: 'hidden', wordBreak: 'break-all' }}
                                    title={subtitles[i].text}
                                >
                                    {subtitles[i].text}
                                </Grid>
                            </Grid>

                            :

                            <Skeleton
                                id={'skeleton'+i}
                                variant='rectangular'
                                style={{
                                    minWidth: ((props.toSeconds(subtitles[i].end, true) - props.toSeconds(subtitles[i].start, true)) * 7) + '%',
                                    height: '7.2vh',
                                    position: 'relative',
                                    left: i > 0 ? giveGap + '%' : '3.5%',
                                    borderRadius: 4,
                                    border: '2px solid #e9e9e9',
                                }}
                            />
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
