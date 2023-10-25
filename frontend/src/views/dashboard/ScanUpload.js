import React from 'react';
import { useNavigate } from 'react-router-dom';

//import Icon
import { IconCamera, IconFaceId, IconUpload } from '@tabler/icons';
import { Grid, Button } from '@mui/material';
import { gridSpacing } from 'store/constant';
import axios from 'axios';

// Project Imports
import { setToken } from '../../authentication/token';

// Initialising Constants
const fileTypes = ['image/jpeg', 'image/png', 'image/jpg'];

// ==============================|| DEFAULT DASHBOARD ||============================== //
const ScanUpload = () => {

    const navigate = useNavigate();

    const hiddenFileInput = React.useRef(null);

    const handleUploadClick = event => {
        hiddenFileInput.current.click();
    };

    const handleChange = async event => {

        let token = window.localStorage.getItem("Authorization"); 
        let email = window.localStorage.getItem("email");
        
        const category = localStorage.getItem('category');
        let images = [];

        for (let i = 0; i < event.target.files.length; i++) {

            if(event.target.files[i].size > 1e6){
                alert("File size too big for " + event.target.files[i].name + ". Max size is 1MB");
                return false;
            }

        }

        // iterate through event.target and append to imgs
        for (let i = 0; i < event.target.files.length; i++) {
            
            // get name of file
            const name = event.target.files[i].name;
            images.push(name);
            const src = event.target.files[i];
            
            const uploadData = new FormData();
            uploadData.append('image', src);
            uploadData.append('email', email);
            uploadData.append('name', name);
            uploadData.append('category', category);

            // upload image to database
            axios.post('http://localhost:4000/image/add', uploadData)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                }
            );
        }
        
        localStorage.setItem('images', JSON.stringify(images));
        navigate("/upload");
        window.location.reload();
    };

    return (

        <Grid container spacing={gridSpacing} sx={{mt:['10%', '10%', '10%']}}>

            <Grid item xs={12} align={'center'}>
            <IconFaceId size={50} />
                <h1>Welcome! Choose to Record or Upload a Video</h1>
            </Grid>

            <Grid item xs={12} align={"center"}>
                <Button 
                    variant="outlined" 
                    color="secondary" 
                    style={{maxWidth: '400px', maxHeight: '75px', minWidth: '400px', minHeight: '50px'}} 
                    sx={{ borderRadius: 4 }}
                    onClick={() => {
                        window.location.href = '/scan';
                    } }
                >
                    <IconCamera size={25} />
                    <span style={{marginLeft: '20px'}}>RECORD</span>
                </Button>
            </Grid>

            <Grid item xs={12} align={"center"}>
                <Button variant="outlined" color="secondary" style={{maxWidth: '400px', maxHeight: '75px', minWidth: '400px', minHeight: '50px'}} sx={{ borderRadius: 4 }} onClick={handleUploadClick}>
                    <IconUpload size={25} />
                    <span style={{marginLeft: '20px'}}>UPLOAD</span>
                </Button>
                <input 
                    type="file" 
                    style={{display: 'none'}} 
                    onChange={handleChange} 
                    ref={hiddenFileInput} 
                    accept={fileTypes} 
                    multiple="multiple" 
                    name={"image"}
                />
            </Grid>
        </Grid>
    );
};

export default ScanUpload;
