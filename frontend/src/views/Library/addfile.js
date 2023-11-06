import React, { useState, useMemo, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, Typography, TextField, MenuItem, Button, Checkbox, IconButton } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { Grid } from "@mui/material";
import { CircularProgress } from "@mui/material";
import axios from 'axios';
import "./alert.css";

const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 5,
    width: "274px",
    height: "100%",
    borderColor: "#213466",
    borderStyle: "dashed",
    backgroundColor: "#f1f8fd",
    color: "#363636",
    outline: "none",
    transition: "border .24s ease-in-out",
};

const activeStyle = {
    borderColor: "#2196f3",
};

const acceptStyle = {
    borderColor: "#00e676",
};

const rejectStyle = {
    borderColor: "#ff1744",
};

const styles = (theme) => ({
    root: {
        margin: 0,
        //   padding: theme.spacing(2),
    },
    closeButton: {
        position: "absolute",
        //   right: theme.spacing(1),
        //   top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    notchedOutline: {
        borderWidth: "1px",
        borderColor: "#005893 !important",
    },
    inputCenter: {
        textAlign: "left",
    },
});

const AddNewFile = (props) => {
    const [vari, setvari] = useState(false);
    const [checkboxSelect, setCheckboxSelect] = useState(false);
    const [uploading, setUploading] = useState(false);

    const {
        getRootProps,
        getInputProps,
        open,
        acceptedFiles,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({ noClick: true, noKeyboard: true });

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept]
    );

    const handleClose = () => {
        setvari(false);
    };

    function handleUploadFile() {
        if (!uploading) setUploading(true);
        console.log(acceptedFiles)
        // var file = dataURLtoFile(src, name);
        const uploadData = new FormData();
        uploadData.append('job', acceptedFiles[0]);
        uploadData.append('name', acceptedFiles[0].name);
        uploadData.append('email', localStorage.getItem('email'));
        uploadData.append('status', "Created");
        uploadData.append('sourceLanguage', "English-US");

        axios.post('http://localhost:4000/job/add', uploadData)
            .then(res => {
                console.log(res);
                // console.log("pog?");
                setUploading(false);
                window.location.reload();
                
            })
            .catch(err => {
                console.log(err);
            });
        // uploadFile({
        //     variables: {
        //         file: acceptedFiles[0],
        //     },
        // });
    }

    return (
        <div>
            <Dialog open={vari} onClose={handleClose}>
                <div className="rectangle">
                    <DialogTitle>
                        <div className="text">
                            <p>Job with same name already exist.</p>
                            <p>Please change the input file name</p>
                        </div>
                    </DialogTitle>
                </div>
            </Dialog>
            <Dialog onClose={() => { if (props.open) { props.setOpen(false); setCheckboxSelect(false); } }} aria-labelledby="customized-dialog-title" open={props.open} maxWidth={false}>
                <DialogContent dividers style={{ width: "35vw", height: "72vh", paddingTop: 20 }} >
                    <Grid item container alignItems="flex-start" justify="space-between" style={{ width: "100%", height: "auto", marginBottom: 16, }} >
                        <Grid item container alignItems="center" xs={11}>
                            <img src="images/UploadLogo.png" alt="" style={{ height: "25px", marginRight: "25px" }} />
                            <span style={{ fontSize: "2.22vh", fontWeight: 600 }}>
                                Upload a file to get the desired output
                            </span>
                        </Grid>
                        <Grid item container style={{ height: "100%", }} justify="flex-end" alignItems="flex-start" xs={1}>
                            <IconButton aria-label="close" style={{ padding: 0 }} onClick={() => { props.setOpen(false); setCheckboxSelect(false); }}>
                                <img src="images/Close.png" alt="" style={{ height: "25px" }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item container justify="center" style={{ width: "100%", marginBottom: 16 }} >
                        <img src="images/SectionSeparator.png" style={{ width: "98.5%" }} />
                    </Grid>
                    <Grid item container style={{ height: "55vh", }} >
                        <Grid item container style={{ width: "100%", }} >
                            <Grid item container alignItems="center" style={{ width: "100%", height: "7.8vh", }} >
                                <Grid item container justifyContent="center" justify="center" alignItems="center" style={{ width: "4.6vh", height: "4.6vh", fontSize: "2.1vh", marginRight: "20px", backgroundImage: 'url("images/CircularBackground.png")', backgroundSize: "cover", }} >
                                    1
                                </Grid>
                                <Grid item style={{ fontSize: "clamp(16px, 1.85vh, 1.85vh)", color: "#555556", fontWeight: 600, }} >
                                    Select the Required File
                                </Grid>
                            </Grid>
                            <Grid item container justifyContent="center" justify="flex-start" style={{ width: "100%", height: "63.5%", }} >
                                <Grid item container style={{ width: "50%", height: "100%", }} >
                                    <div {...getRootProps({ style })}>
                                        {uploading ? (
                                            <Grid item container direction="column" justify="space-evenly" alignItems="center" style={{ height: "100%", }} >
                                                <Grid item style={{ fontSize: "clamp(20px, 2.22vh, 2.22vh)", color: "#727272", textAlign: "center", }} >
                                                    Uploading, Please wait
                                                </Grid>
                                                <Grid item>
                                                    <CircularProgress size="6.5vw" style={{ color: "rgb(14, 102, 172)", }} />
                                                </Grid>
                                            </Grid>
                                        ) : acceptedFiles.length ? (
                                            acceptedFiles[0].name
                                        ) : (
                                            <>
                                                <input {...getInputProps()} />
                                                <img src="images/textfile.png" style={{ marginBottom: 15, }} />
                                                <span style={{ marginBottom: 5 }}>
                                                    Drag and drop file here
                                                </span>
                                                <div style={{ marginBottom: 5 }}>or</div>
                                                <button type="button" onClick={open} style={{ border: "none", backgroundColor: "#0e66ac", color: "#fdffff", borderRadius: 8, padding: "5px 45px", }} >
                                                    Browse
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item container direction="column" justifyContent="center" justify="space-between" alignItems="center" style={{ height: "10%", paddingTop: "10px", paddingLeft: "20px" }} >
                                <Grid item container justify="flex-start" alignItems={"flex-start"} style={{ display: "flex", flexWrap: "nowrap" }}>
                                    <Checkbox
                                        id="copyrightCheckbox"
                                        disableTouchRipple 
                                        checked={checkboxSelect}
                                        style={{
                                            color: "#0e66ac",
                                            padding: 0,
                                            paddingRight: 0,
                                            paddingLeft: 0,
                                        }}
                                        onChange={() => {
                                            setCheckboxSelect(!checkboxSelect);
                                        }}
                                    />
                                    <label for="copyrightCheckbox" style={{ margin: 0, marginLeft: "5px" }}>
                                        <b>I have Copyright to upload the file</b>
                                    </label>
                                </Grid>
                            </Grid>
                            <Grid item container justifyContent="center">
                            {uploading ? (
                                    <Button
                                        disableRipple={true}
                                        style={{ fontSize: "1.85vh", color: "white", backgroundColor: "#0e66ac", fontWeight: 600, paddingLeft: "30px", paddingRight: "30px", }}
                                    // onClick={() => setOpen(true)}
                                    onClick={() => { props.setOpen(false); setCheckboxSelect(false);  window.location.reload();}}
                                    >
                                        Cancel
                                    </Button>
                                ) : (
                                    <Button disableRipple={true}
                                        disabled={
                                            !checkboxSelect ||
                                            !acceptedFiles[0]
                                        }
                                        style={{
                                            fontSize: "1.85vh",
                                            color: "white",
                                            backgroundColor: checkboxSelect && acceptedFiles[0] ? "#0e66ac" : "#CBCBCB",
                                            fontWeight: 600,
                                            paddingLeft: "30px",
                                            paddingRight: "30px",
                                        }}
                                        onClick={handleUploadFile}
                                    >
                                        Upload
                                    </Button>
                                )}
                                </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddNewFile;