import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';
import 'react-circular-progressbar/dist/styles.css';
// import SimpleBar from 'simplebar';
// import 'simplebar/dist/simplebar.css';
import { css } from '@emotion/react';

import Subtitles from './Subtitles.js';
import { parse } from 'dotenv';

const loaderStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const sampleSubtitles = ["BTP sucks", "s;dflajs;ld"];

function parseSrt(srtContent) {
    // Split the SRT content into individual subtitle blocks
    const subtitleBlocks = srtContent.split(/\n\s*\n/);

    // Parse each subtitle block
    const subtitles = subtitleBlocks.map((block) => {
        const lines = block.trim().split('\n');
        if (lines.length >= 3) {
            const id = parseInt(lines[0], 10);
            const [start, end] = lines[1].split(' --> ');
            const text = lines.slice(2).join('\n');

            return {
                id,
                start,
                end,
                text,
            };
        }
        return null; // Invalid subtitle block
    });

    // Filter out null values (invalid subtitle blocks)
    return subtitles.filter((subtitle) => subtitle !== null);
}

const SRTViewer = (props) => {

    const [subtitles, setSubtitles] = useState(null);
    const [parsedSubtitles, setParsedSubtitles] = useState(null);
    // let parsedSubtitles;

    useEffect(() => {
        console.log(localStorage);
        console.log(props.subtitles);
        setParsedSubtitles(parseSrt(props.subtitles));
        console.log(parsedSubtitles);
    }, []);

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
            {!parsedSubtitles ? (
              <div css={loaderStyles} style={{ paddingLeft: '42%' }}>
                <CircularProgress style={{color: "rgb(14, 102, 172)"}} size={100} />
              </div>
            ) : (
              // props.subtitles.map((subtitle, index) => (
              parsedSubtitles.map((subtitle, index) => (
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
                      key={subtitle.id} // Assuming `id` is a unique identifier for each subtitle
                      index={index}
                      startTime={subtitle.start}
                      endTime={subtitle.end}
                      text={subtitle.text}
                      subtitle={subtitle}
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
