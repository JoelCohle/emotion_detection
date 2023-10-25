import React from 'react';
import {useState, useEffect,  useRef } from 'react';
import { IconCrop } from '@tabler/icons';
import { Dialog, DialogContent, DialogTitle, Grid , Button, Divider} from '@mui/material';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop} from 'react-image-crop'
import axios from 'axios';

const Upload = () => {

    const imgSrc = JSON.parse(localStorage.getItem('images'));
    const [isCrop, setIsCrop] = useState(false);
    const [image, setImage] = useState("");
    const [cropimage, setCropimage] = useState(null);
    const [crop, setCrop] = useState({
        unit: '%', // Can be 'px' or '%'
        x: 0,
        y: 0,
        width: 0,
        height: 0
      });
    const [result, setResult] = useState(null);
    const imgRef = useRef(null);
    const [file,setFile] = useState(null);

    const handleOpenclick = (img) => {
        setCrop({unit: '%', x: 0, y: 0, width: 0, height: 0});
        setIsCrop(true);
        setImage(img);
        setResult(null);
    }

    function dataURLtoFile(dataurl, filename) {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }

    const getCroppedImg = (c) => {
        // console.log(result); 
        const canvas = document.createElement("canvas");
        const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
        const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
            imgRef.current,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width  * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
        // console.log(canvas);
        const base64Image = canvas.toDataURL("image/*", 1);
        setResult(base64Image);
        // var file= dataURLtoFile(base64Image, imgSrc[key]);
        console.log(result);
    };
    const handleClose = () => {
        setIsCrop(false);
    }
    async function handleUpdate() {
        // setImage(result);
        setFile(dataURLtoFile(result, image));
        console.log("file: ", file);
        const name = image;
        const email = window.localStorage.getItem("email");
        const category = localStorage.getItem('category');
        const uploadData = new FormData();
        uploadData.append('image', file);
        uploadData.append('name', name);
        uploadData.append('email', email);
        uploadData.append('category', category);
        console.log(uploadData);
        await axios.post('http://localhost:4000/image/addcropped', uploadData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            }
        );

        setIsCrop(false);
    }

    const handleSubmit = () => {
        for(let key = 0; key < imgSrc.length; key++){
            const name = imgSrc[key];
            const email = window.localStorage.getItem("email");
            const category = localStorage.getItem('category');
            const uploadData = {
                name: name,
                email: email,
                category: category,
            };
            // console.log(uploadData);
            axios.post('http://localhost:4000/image/upload', uploadData)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                }
            );
        }
        window.location.assign("http://localhost:3000/library")
    }


    return (
        <div style={{ textAlign: "center" }}>
            <h1>UPLOAD</h1>
            <br></br>
            {console.log(imgSrc)}
            {imgSrc.map((img, key) => {
                return (
                    <>
                    <Grid rowSpacing={2}>
                        <Grid item xs={12} align={"center"}>
                            <img
                            src={"./userImages/" + img }
                            key={key}
                            width={window.screen.width / 2}
                            height={window.screen.height / 2}
                            />
                            <br></br>
                            <br></br>
                        </Grid>
                        {/* <Grid item xs={12} align={"center"}>
                            <Button 
                                variant="outlined"
                                color="secondary"
                                style={{maxWidth: '70px', maxHeight: '70px', minWidth: '150px', minHeight: '50px', marginLeft: '20px'}}
                                onClick={() => handleOpenclick(img)}
                            >
                                <IconCrop size={30} />
                                <span style={{marginLeft: '20px'}}>CROP</span>
                            </Button>   
                        </Grid> */}
                        <Grid item xs={12} align={"center"}>
                            <br></br>
                            <br></br>
                        </Grid>
                        <Grid item xs={12} align={"center"}>
                        <Dialog open={isCrop} onClose={handleClose} maxWidth="lg">
                            <DialogTitle align="center"><h1>Crop Image</h1></DialogTitle>
                            <DialogContent>
                                <Grid>
                                <Grid item xs={12} align={"center"}>
                                    <div>
                                        <div>
                                            <ReactCrop
                                                style={{maxWidth: "50%"}}
                                                onImageLoaded={setCropimage}
                                                crop={crop}
                                                onChange={c => setCrop(c)}
                                                onComplete={c => getCroppedImg(c,key)}
                                            >
                                                <img src={"./userImages/" + image} alt="Crop" ref={imgRef}/>
                                            </ReactCrop>
                                        </div>
                                        {result && (
                                            <div>
                                                <img src={result} alt="cropped image"/>
                                            </div>
                                        )}
                                    </div>
                                </Grid>
                                <Grid item xs="12" align={"center"} >
                                    <Button variant="outlined" color="error" style={{maxWidth: '70px', maxHeight: '70px', minWidth: '150px', minHeight: '50px', marginbottom: '20px'}}
                                        onClick={handleClose} >
                                        <span style={{textAlign:"center"}}>CANCEL</span>
                                    </Button>
                                    <Button variant="outlined" color="success" style={{ maxWidth: '70px', maxHeight: '70px', minWidth: '150px', minHeight: '50px', marginLeft: '20px', marginbottom: '20px' }}
                                        onClick={handleUpdate} >
                                        <span style={{ textAlign: "center" }}>SAVE</span>
                                    </Button>
                                </Grid>
                                </Grid>
                            </DialogContent>
                        </Dialog>
                        </Grid>
                    </Grid>
                    </>
                )
            })}
            <Grid>
                <Grid item xs="12" align={"center"}>
                    <Button variant="outlined" color="error" style={{ maxWidth: '100px', maxHeight: '80px', minWidth: '250px', minHeight: '60px', marginLeft: '20px' }}
                        onClick={()=> {window.location.assign("http://localhost:3000/")}} >
                        <span style={{ textAlign: "center" }}>CANCEL</span>
                    </Button>
                    <Button variant="outlined" color="success" style={{ maxWidth: '100px', maxHeight: '80px', minWidth: '250px', minHeight: '60px', marginLeft: '20px' }}
                        onClick={handleSubmit} >
                        <span style={{ textAlign: "center" }}>UPLOAD ALL</span>
                    </Button>
                    <br></br>
                </Grid>
            </Grid>
        </div>
    );
}

export default Upload;
