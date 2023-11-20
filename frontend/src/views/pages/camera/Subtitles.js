import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles =
    makeStyles(
        (theme) =>
        (
            {
                inputDiv:
                {
                    width: '100%',
                    minHeight: '3.47vh',
                    color: '#7d7d7d',
                    marginTop: '1.9vh',
                    paddingLeft: 'calc(2.86vw + 2.59vh)',
                    whiteSpace: 'pre-line',
                    '&:focus':
                    {
                        outline: 'none'
                    }
                },
                timeInput:
                {
                    width: '3.79vw',//'32.73%''auto',
                    height: '80%',
                    fontSize: '80%',
                    color: '#7b7b7b',
                    whiteSpace: 'nowrap',
                    // overflow: 'auto',
                    '&:focus':
                    {
                        outline: 'none'
                    },
                    '&::-webkit-scrollbar':
                    {
                        display: 'none'
                    }
                },
                whole:
                {
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    marginTop: '1vh',
                },
                time:
                {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                },
                information:
                {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                },
                marg:
                {
                    marginRight: '0.7rem',
                }
            }
        )
    );

const Subtitle = (props) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.whole}>
                <div className={classes.information}>
                    <div className="index" style={{
                        height: '2.39vh',
                        fontSize: '20px',
                        color: '#7d7d7d',
                        marginLeft: '1.3vw',
                        marginRight: '1.3vw',
                        fontWeight: 'bold'
                    }}>
                        {props.index < 10 ? '0' + String(props.index + 1) : props.index + 1}
                    </div>
                    <div className='data'>
                        <div className={classes.time}>
                            <span
                                id={`${props.startTimeID ? props.startTimeID : ''}${props.index}`}
                                contentEditable={false}
                                className={classes.timeInput}
                                justifyContent="center"
                                alignItems="center"
                                style={{ backgroundColor: '#E7F4FF', width: "4.5vw", fontSize: "16px", borderRadius: "4px", paddingLeft: "2px" }}
                            >
                                {props.startTime.slice(0, 8)}
                            </span>
                            <div>
                                <img src='images/Arrow.png' />
                            </div>
                            <div
                                id={`${props.endTimeID ? props.endTimeID : ''}${props.index}`}
                                contentEditable={false}
                                className={classes.timeInput}
                                justifyContent="center"
                                alignItems="center"
                                style={{ backgroundColor: '#E7F4FF', width: "4.5vw", marginRight: "4vw", fontSize: "16px", borderRadius: "4px", paddingLeft: "2px" }}
                            >
                                {props.endTime.slice(0, 8)}
                            </div>
                            <div className={classes.marg}>
                                <img src='images/video.png' style={{opacity: 0.7}}/>
                            </div>
                            <div className={classes.marg} style={{ marginRight: "2vw" }}>
                                {props.videoEmotion}
                            </div>
                            <div className={classes.marg}>
                                <img src='images/audio.png' style={{opacity: 0.7}}/>
                            </div>
                            <div className={classes.marg}>
                                {props.audioEmotion}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", marginTop: "0.7vh"}}>
                    <div
                        id={`${props.subtitleTextID ? props.subtitleTextID : ''}${props.index}`}
                        class='input'
                        role='textbox'
                        className={classes.inputDiv}
                    >
                        {/*props.subtitle ? props.subtitle.text : null*/}
                        {props.text}
                    </div>
                </div>
            </div>
        </>
        // <>
        //     <Grid
        //         item container
        //         style={{
        //             width: '100%',
        //             height: '2.59vh',
        //             marginTop: '1.9vh'
        //         }}
        //     >
        //         <Grid
        //             item container
        //             justify='space-between'
        //             alignItems='center'
        //         >
        //             <Grid
        //                 item container
        //                 xs={6}
        //                 style={{
        //                     width: '100%',
        //                 }}
        //             >
        //                 <Grid
        //                     item
        //                     style={{
        //                         height: '2.39vh',
        //                         fontSize: '20px',
        //                         color: '#7d7d7d',
        //                         marginLeft: '1.3vw',
        //                         fontWeight: 'bold'
        //                     }}
        //                 >
        //                     {props.index < 10 ? '0' + String(props.index + 1) : props.index + 1}
        //                 </Grid>
        //                 <Grid
        //                     id={(props.timeRangeID ? props.timeRangeID : '') + props.index}
        //                     item container
        //                     justifyContent="space-evenly"
        //                     alignItems='center'
        //                     style={{
        //                         width: '100%',
        //                         height: '100%',
        //                         borderRadius: '4px',
        //                     }}
        //                 >
        //                     <span
        //                         // id={`${props.startTimeID ? props.startTimeID : ''}${props.index}`}
        //                         contentEditable={false}
        //                         className={classes.timeInput}
        //                         justifyContent="center"
        //                         alignItems="center"
        //                         style={{ backgroundColor: '#E7F4FF', width: "4.5vw", fontSize: "16px", borderRadius: "4px", paddingLeft: "2px" }}
        //                     >
        //                         {props.startTime.slice(0, 8)}
        //                     </span>
        //                     <Grid item >
        //                         <img src='images/Arrow.png' />
        //                     </Grid>
        //                     <div
        //                         id={`${props.endTimeID ? props.endTimeID : ''}${props.index}`}
        //                         contentEditable={false}
        //                         className={classes.timeInput}
        //                         justifyContent="center"
        //                         alignItems="center"
        //                         style={{ backgroundColor: '#E7F4FF', width: "4.5vw", fontSize: "16px", borderRadius: "4px", paddingLeft: "2px" }}
        //                     >
        //                         {props.endTime.slice(0, 8)}
        //                     </div>
        //                     {/* </Grid> */}
        //     {/*<Grid item style={{ display: 'flex', alignItems: 'center', width: "40%" }}>*/}
        //                     {/*<div style={{ display: 'flex', alignItems: 'center' }}>*/}
        //                         <Grid item>
        //                             <img src='images/video.png' />
        //                         </Grid>
        //                         <div>
        //                             {props.videoEmotion}
        //                         </div>
        //                         <Grid item>
        //                             <img src='images/audio.png' />
        //                         </Grid>
        //                         <div>
        //                             {props.audioEmotion}
        //                         </div>
        //                             {/*</div>*/}
        //     {/*</Grid>*/}
        //                 </Grid>
        //             </Grid>
        //         </Grid>
        //     </Grid>
        //     <div style={{ display: "grid", flexDirection: "row" }}>
        //         <div
        //             id={`${props.subtitleTextID ? props.subtitleTextID : ''}${props.index}`}
        //             class='input'
        //             role='textbox'
        //             className={classes.inputDiv}
        //         >
        //             {/*props.subtitle ? props.subtitle.text : null*/}
        //             {props.text}
        //         </div>
        //     </div>
        // </>
    );
};

export default Subtitle;
