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
            }
        )
    );

const Subtitle = (props) => {
    const classes = useStyles();

    return (
    <>
        <Grid
            item container
            style={{
                width: '100%',
                height: '2.59vh',
                marginTop: '1.9vh'
            }}
        >
            <Grid
                item container
                justify='space-between'
                alignItems='center'
            >
                <Grid
                    item container
                    xs={6}
                >
                    <Grid
                        item
                        style={{
                            height: '2.39vh',
                            fontSize: '20px',
                            color: '#7d7d7d',
                            marginLeft: '1.3vw',
                            fontWeight: 'bold'
                        }}
                    >
                        {props.index < 10 ? '0' + String(props.index + 1) : props.index + 1}
                    </Grid>
                    <Grid
                        id={(props.timeRangeID ? props.timeRangeID : '') + props.index}
                        item container
                        justifyContent="space-evenly"
                        alignItems='center'
                        style={{
                            width: '14vw',
                            height: '100%',
                            borderRadius: '4px',
                        }}
                    >
                        <span
                            // id={`${props.startTimeID ? props.startTimeID : ''}${props.index}`}
                            contentEditable={false}
                            className={classes.timeInput}
                            justifyContent="center"
                            alignItems="center"
                            style={{ backgroundColor: '#E7F4FF', width: "4.5vw", fontSize: "16px", borderRadius: "4px", paddingLeft: "2px" }}
                        >
                            {/*props.subtitle ? props.subtitle.start.slice(0, 8) : null*/}
                            {props.startTime.slice(0, 8)}
                        </span>
                        <Grid item >
                            <img src='images/Arrow.png' />
                        </Grid>
                        <div
                            id={`${props.endTimeID ? props.endTimeID : ''}${props.index}`}
                            contentEditable={false}
                            className={classes.timeInput}
                            justifyContent="center"
                            alignItems="center"
                            style={{ backgroundColor: '#E7F4FF', width: "4.5vw", fontSize: "16px", borderRadius: "4px", paddingLeft: "2px" }}
                        >
                            {/*props.subtitle ? props.subtitle.end.slice(0, 8) : null*/}
                            {props.endTime.slice(0, 8)}
                        </div>
                        {/* </Grid> */}
                    </Grid>
                </Grid>
                <Grid
                    item
                >
                    {/* <input
                                type='image'
                                src='images/DeleteSubtitle.png'
                                style={{
                                    'height': 'initial'
                                }}
                            /> */}
                </Grid>
            </Grid>
        </Grid>
        <div style={{ display: "flex", flexDirection: "row" }}>
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
    </>
    );
};

export default Subtitle;
