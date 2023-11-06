import React from 'react';
import Select from 'react-select';

import { Grid, Button } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { useState, Component, useRef, useCallback } from 'react';

import SubtitleCreator from './Script'
import WebcamCapture from './Camera'

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

const RecordVideo = () => {
    const [currentPage, setCurrentPage] = useState('select');

    const handleOptionChange = (selectedOption) => {
        // setCurrentPage(selectedOption.value);
        console.log(`Selected Option: ${selectedOption.value}`);
    };

    return (
        <div>
            <Grid container justifyContent="center" height="100vh">
                {/* <Grid item xs={6} md={3}> */}

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

                    {currentPage === 'record' && (
                        <div>
                            <WebcamCapture />
                            <Button onClick={()=>{setCurrentPage("select")}} variant="contained" color="primary">Back</Button>
                        </div>
                    )}
                {/* </Grid> */}
            </Grid>
        </div>

    );
};

export default RecordVideo;