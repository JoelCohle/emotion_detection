import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';
import 'react-circular-progressbar/dist/styles.css';
// import SimpleBar from 'simplebar';
// import 'simplebar/dist/simplebar.css';
import { css } from '@emotion/react';

import Subtitles from './Subtitles.js';

const loaderStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const sampleSubtitles = ["gfsdgfdgd ", "s;dflajs;ld"];

const SRTViewer = (props) => {

    return (
        <Grid
          item
          container
          style={{
            width: '100%',
            height: '86%',
            overflow: 'auto',
            border: '2px solid #b3b3b3',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', // Center horizontally
            position: 'relative',
            overflow: 'hidden',
          }}
        >
        <div style={{ flex: 1, overflowY: 'scroll', padding: '20px' }}>
        {
              sampleSubtitles.map((subtitle, index) => (
                // <div onClick={() => changeSeekTime(index)}>
                <div>
                  <Grid
                    //id={'subtitle'+index}
                    item
                    container
                    direction='column'
                    style={{
                      width: '97.5%',
                      height: 'auto', //'17.96vh',
                      borderBottom: '2px solid white',
                    }}
                    // onClick={() => changeSeekTime(index)}
                  >
                    <Subtitles
                      subtitle={subtitle}
                      index={index}
                      // changeSeekTime={changeSeekTime}
                      // isValidTime={isValidTime}
                      timeRangeID='timeSpan'
                      startTimeID='startSpan'
                      endTimeID='endSpan'
                      isEditable={false}
                      subtitleTextID={'text'}
                      // merge={props.merge}
                      // split={props.split}
                      // deleteSubtitle={props.deleteSubtitle}
                    />

                    <Grid
                      item
                      container
                      style={{
                        width: '100%',
                        height: 16,
                        // backgroundColor: 'pink',
                        marginTop: '1.9vh',
                      }}
                    >
                      <Grid
                        item
                        container
                        justify='center'
                        alignItems='center'
                        // xs={10}
                        style={{ width: '100%' }} //'92%'
                      >
                        <img src='images/CustomHR.png' style={{ width: '98%', height: '2px' }} />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* {props.merge ? (
                    // <Button style={{ padding: "2px 6px", background: "rgb(200,200,200)", marginRight: "5%",marginTop:"10%",marginBottom:"0%" }} onClick={() => { props.merge(props.index); }}>merge</Button>
                    <input
                      type='image'
                      src='images/merge.png'
                      onClick={() => {
                        props.merge(index);
                      }}
                      style={{
                        position: 'absolute',
                        height: '1.3vw',
                        width: '1.3vw',
                        marginTop: '-1.5vw',
                        marginLeft: '95%',
                      }}
                    />
                  ) : null} */}
                </div>
              ))
    }
        {/*<SimpleBar autoHide={false} style={{ maxHeight: '100%', width: '99.5%' }}>*/}
            {props.isLoading || (props.filesURLsObject && props.filesURLsObject['ASR'] && !props.file) ? (
              <div css={loaderStyles} style={{ paddingLeft: '42%' }}>
                {/* <CircularProgressbar
                  size={50}
                  value={calculateProgress()}
                  text={`${calculateProgress()}%`}
                  styles={{
                    // Customize the CircularProgressbar styles
                    // For example, you can set the color of the percentage text
                    text: { fill: 'rgb(14, 102, 172)', fontSize: '5px' },
                  }}
                /> */}
                <CircularProgress style={{color: "rgb(14, 102, 172)"}} size={100} />
              </div>
            ) : props.subtitles.length === 0 ? (
                <div css={loaderStyles} style={{ paddingLeft: '42%' }}>
                    <CircularProgress style={{color: "rgb(14, 102, 172)"}} size={100} />
                </div>
            ) : (
              // props.subtitles.map((subtitle, index) => (
              sampleSubtitles.map((subtitle, index) => (
                // <div onClick={() => changeSeekTime(index)}>
                <div>
                  <Grid
                    //id={'subtitle'+index}
                    item
                    container
                    direction='column'
                    style={{
                      width: '97.5%',
                      height: 'auto', //'17.96vh',
                      borderBottom: '2px solid white',
                    }}
                    // onClick={() => changeSeekTime(index)}
                  >
                    <Subtitles
                      subtitle={subtitle}
                      index={index}
                      // changeSeekTime={changeSeekTime}
                      // isValidTime={isValidTime}
                      timeRangeID='timeSpan'
                      startTimeID='startSpan'
                      endTimeID='endSpan'
                      isEditable={false}
                      subtitleTextID={'text'}
                      // merge={props.merge}
                      // split={props.split}
                      // deleteSubtitle={props.deleteSubtitle}
                    />

                    <Grid
                      item
                      container
                      style={{
                        width: '100%',
                        height: 16,
                        // backgroundColor: 'pink',
                        marginTop: '1.9vh',
                      }}
                    >
                      <Grid
                        item
                        container
                        justify='center'
                        alignItems='center'
                        // xs={10}
                        style={{ width: '100%' }} //'92%'
                      >
                        <img src='images/CustomHR.png' style={{ width: '98%', height: '2px' }} />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* {props.merge ? (
                    // <Button style={{ padding: "2px 6px", background: "rgb(200,200,200)", marginRight: "5%",marginTop:"10%",marginBottom:"0%" }} onClick={() => { props.merge(props.index); }}>merge</Button>
                    <input
                      type='image'
                      src='images/merge.png'
                      onClick={() => {
                        props.merge(index);
                      }}
                      style={{
                        position: 'absolute',
                        height: '1.3vw',
                        width: '1.3vw',
                        marginTop: '-1.5vw',
                        marginLeft: '95%',
                      }}
                    />
                  ) : null} */}
                </div>
              ))
            )}
        {/*</SimpleBar>*/}
        </div>
        </Grid>
    );
};

export default SRTViewer;
