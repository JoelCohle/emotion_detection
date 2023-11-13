import React, { useEffect } from 'react';
import Select from 'react-select';

import { Grid, Button } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { useState, Component, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// import SubtitleCreator from './Script'
import WebcamCapture from './Camera'
import EmotionDetection from './EmotionDetection';
import PreviewPage from './Preview';

const options = [
    { value: 'script1', label: 'Script 1' },
    { value: 'script2', label: 'Script 2' },
];

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        width: '300px',
        minHeight: '20px',
        height: '50px',
        borderRadius: '10px',
        border: '1px solid #ebebeb',
        '&:hover': {
            border: '1px solid #ebebeb',
        },
        margin: '20px auto', // Center the dropdown
        fontSize: '16px',
    }),
};

const RecordVideo = (props) => {
    const [currTask, setCurrTask] = useState('RecordVideo');
    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        console.log("In Record Page");
        console.log(state);
        // axios.get('http://localhost:4000/job/getscript', {
        //     params: { scriptName: "asdf" }
        // })
        //     .then((response) => {
        //         setFileContent(response.data);
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching the file:', error);
        //     });
    }, []);

    const handleOptionChange = (selectedOption) => {
        // setCurrentPage(selectedOption.value);
        console.log(`Selected Option: ${selectedOption.value}`);
    };

    function handleClickNext() {
        switch(currTask) {
            case "RecordVideo":
                setCurrTask("EmotionDetection");
                break;
            case "EmotionDetection":
                setCurrTask("Preview");
                break;
            case "Preview":
                setCurrTask("Preview");
                break;
            default:
                setCurrTask("RecordVideo");
        }
    }

    return (
        <div>
            <Grid container justifyContent="center" height="100vh">
                {/* <Grid item xs={6} md={3}> */}

        {/*
                    {currentPage === 'select' && (
                        <div>
                            <h1>Select Script</h1>
                            <Select options={options} styles={customStyles} onChange={handleOptionChange} />
                            <Grid container spacing={2}>
                            <Grid item><Button onClick={()=>{setCurrentPage("upload")}} variant="contained" color="primary" style={{ marginRight: '10px' }}>Create new script</Button></Grid>
                            <Grid item><Button onClick={()=>{setCurrentPage("record")}} variant="contained" color="primary">Record Video</Button> </Grid>
                            </Grid>
                        </div>
                    )}

                    {currentPage === 'upload' && (
                        <div>
                            < SubtitleCreator />
                            <Button onClick={()=>{setCurrentPage("record")}} variant="contained" color="primary">Record Video</Button>
                        </div>
                    )}
            */}
            {currTask === "RecordVideo" && (
                <div>
                    <WebcamCapture />
                </div>
            )}
            {currTask === "EmotionDetection" && (
                <div>
                    <EmotionDetection />
                </div>
            )}
            {currTask === "Preview" && (
                <div>
                    <PreviewPage />
                </div>
            )}
                {/* </Grid> */}
                <Grid item xs={12} align={'center'}>
                    <Button
                        onClick={() => handleClickNext()}
                        variant="outlined"
                        color="secondary"
                        style={{ maxWidth: '200px', maxHeight: '70px', minWidth: '150px', minHeight: '50px' }}
                    >
                        {/*<IconDownload size={40} />*/}
                        { currTask === "Preview" ? (
                                <span>Finish</span>
                            ) : (
                            <span>Next</span>
                            )
                        }
                    </Button>
                </Grid>
            </Grid>
        </div>

    );
};

export default RecordVideo;
