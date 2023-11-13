import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

const Subtitle = (props) => {

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
                            id={`${props.startTimeID ? props.startTimeID : ''}${props.index}`}
                            // contentEditable={props.isEditable === undefined || props.isEditable === true ? true : false}
                            contentEditable={false}
                            // className={classes.timeInput}
                            // onFocus={props.isEditable === undefined || props.isEditable === true ? () => preEditStartTime(props.index) : () => { }}
                            // onBlur={props.isEditable === undefined || props.isEditable === true ? () => postEditStartTime(props.index) : () => { }}
                            // onInput={props.isEditable === undefined || props.isEditable === true ? () => editingStartTime(props.index) : () => { }}
                            // onClick={() => props.changeSeekTime(props.index)}
                            justifyContent="center"
                            alignItems="center"
                            style={{ backgroundColor: '#E7F4FF', width: "3.8vw", fontSize: "16px", borderRadius: "4px", paddingLeft: "2px" }}
                        >
                            {props.subtitle ? props.subtitle.start.slice(0, 8) : null}
                        </span>
                        <Grid item >
                            <img src='images/Arrow.png' />
                        </Grid>
                        <div
                            id={`${props.endTimeID ? props.endTimeID : ''}${props.index}`}
                            // contentEditable={props.isEditable === undefined || props.isEditable === true ? true : false}
                            contentEditable={false}
                            // className={classes.timeInput}
                            // onFocus={props.isEditable === undefined || props.isEditable === true ? () => preEditEndTime(props.index) : () => { }}
                            // onBlur={props.isEditable === undefined || props.isEditable === true ? () => postEditEndTime(props.index) : () => { }}
                            // onInput={props.isEditable === undefined || props.isEditable === true ? () => editingEndTime(props.index) : () => { }}
                            // onClick={() => props.changeSeekTime(props.index)}
                            justifyContent="center"
                            alignItems="center"
                            style={{ backgroundColor: '#E7F4FF', width: "3.8vw", fontSize: "16px", borderRadius: "4px", paddingLeft: "2px" }}
                        >
                            {props.subtitle ? props.subtitle.end.slice(0, 8) : null}
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
                contentEditable={props.isEditable === undefined || props.isEditable === true ? true : false}
                // className={classes.inputDiv}
                // onClick={() => props.changeSeekTime(props.index)}
            >
                {props.subtitle ? props.subtitle.text : null}
            </div>
        </div>
    </>
    );
};

export default Subtitle;
