import React from 'react';
import {useState, useEffect,  useRef } from 'react';
import { Grid , Button, Table, TableCell, TableRow, TableHead, TableBody, Paper} from '@mui/material';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';

const Library = () => {

    const [imageList, setImageList] = useState([]);
    // useEffect that automatically loads all images of the specific user
    useEffect(() => {
        axios.get("http://localhost:4000/image/getimages", {
            params: { email: localStorage.getItem("email") }
        })
        .then(res => {
            console.log(res.data);
            setImageList(res.data);
        }
        )
        .catch(err => console.log(err));
    }, []);

    function doesFileExist(urlToFile) {
        var xhr = new XMLHttpRequest();
        xhr.open('HEAD', urlToFile, false);
        xhr.send();
         
        if (xhr.status == "404") {
            return false;
        } else {
            return true;
        }
    }

    function handleDownload(image){
        var a = document.createElement("a");
        var path = "./result/" + image.name.split('.').slice(0, -1).join('.') + '.xlsx';
        a.href = path;
        a.download = image.name.split('.').slice(0, -1).join('.') + '.xlsx';
        a.click();
    }

    function handleDelete(image) {

        var path = "../frontend/public/result/" + image.name.split('.').slice(0, -1).join('.') + '.xlsx';

        const imageData = {
            name: image.name,
            email: localStorage.getItem("email"),
            path: path
        }

        axios.post("http://localhost:4000/image/deleteimage", imageData)
        .then(res => {
            console.log("Image deleted");
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
    }

    async function importAll(imageList) {

        let email = localStorage.getItem('email');
        let final = [];
        let images = {};

        imageList.keys().map((item, index) => { images[item.replace('./', '')] = imageList(item); });

        for (const imageName in images) {
            let category = "";

            // get category based on name and email
            await axios.get("http://localhost:4000/image/getcategory", {
                params: { name: imageName, email: email } 
            })
                .then(res => {
                    if(res.data[0] != undefined){
                        category = res.data[0].category;
                    }
                })
                .catch(err => console.log(err));
            
            if(category.localeCompare("") != 0){

                var status = "Partially Extracted";
                var path = "./result/" + imageName.split('.').slice(0, -1).join('.') + '.xlsx';
                var fileCheck = doesFileExist(path) ? status = "Extracted" : status = "Partially Extracted";

                final.push({
                    name: imageName,
                    email: email,
                    category: category,
                    status: status
                });
            }
        }

        setImageList(final);

        return final;
      }
      
    //   const images = importAll(require.context('../../../public/userImages', false, /\.(mpe4|mp4|webm)$/));

    return (
        <Grid container spacing={3}>

            <Grid item xs={4} md={4} lg={4}></Grid>
            <Grid item xs={4} md={4} lg={4} align = {'center'}>
                <h1>Library</h1>
            </Grid>
            <Grid item xs={4} md={4} lg={4}></Grid>

            <Grid item xs={12} md={12} lg={12}>
                <Paper>
                    <Table size="small">

                        <TableHead>
                            <TableRow>
                            <TableCell>File Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Result</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {imageList.map((image, ind) => (
                            <TableRow key={ind}>
                                <TableCell>{image.name}</TableCell>
                                <TableCell>{image.category}</TableCell>
                                <TableCell>{image.status}</TableCell> 
                                <TableCell>
                                    {image.status == 'Extracted' ? <Button variant = "contained" onClick={() => handleDownload(image)}>Download</Button> : <></>}
                                </TableCell>
                                <TableCell> 
                                    <Button variant = "contained"  color="error" onClick = {() => handleDelete(image)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Library;
