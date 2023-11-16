import React from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from "@material-ui/core/styles/makeStyles";
import axios from 'axios';
// import 'simplebar-react/dist/simplebar.min.css';
// import '../../styles/css/SimplebarCustom.css';

const TestPage = () => {

    async function getSRT(){
        // const uploadData = new FormData();
        // uploadData.append('videoName', 'harvard.wav');
        const uploadData = {'videoName': 'harvard.wav'}
        console.log(uploadData)
        await axios.post('http://localhost:4000/job/getSubtitles', uploadData)
            .then(res => {
                console.log("Uploaded");
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <Grid
            item
            container
            wrap="nowrap"
            style={{
                height: "21.7%",
                background: "#d7d7d7",
            }}
        // onScroll={() => {scrollOtherDiv(1)}}
        >
            <button
                // onClick={getSRT}
            >
                Convert to SRT
            </button>
        </Grid>
    )
};
export default TestPage;
