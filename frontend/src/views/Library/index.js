import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Grid, Button, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText, Typography,
    Checkbox,
} from "@mui/material";
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Pagination from '@mui/material/Pagination';
import "./file.css";

import AddNewFile from "./addfile.js"

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 10,
        border: "1px solid #0e66ac",
        borderRadius: 0,
    },
    text: {
        width: "2.2vw",
        height: "2.2vw",
    },

    // root1: {
    //   border: '1px solid #0e66ac'
    // },

    label: {
        justifyContent: "space-evenly",
        alignItems: "center",
    },

    addNewFile: {
        height: "100%",
        backgroundColor: "#0e66ac",
        borderRadius: "4px",
        "&:hover": {
            backgroundColor: "#0e66ac",
        },
    },

    button1: {
        height: "100%",
        borderRadius: "4px",
        "&:hover": {
            backgroundColor: "white",
        },
    },

    selected: {
        "& .Mui-selected": {
            backgroundColor: "#0e66ac",
            color: "white",
            borderRadius: 0,
        },
    },

    statusButtons: {
        "&:hover": {
            backgroundColor: "white",
        },
    },

    paper: {
        position: "absolute",
        width: "40%",
        height: "flex",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "4vh",
        border: " solid 3px #D3D3D3",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: "30%",
        left: "40%",
    },
    paperadd: {
        position: "absolute",
        width: "40%",
        height: "flex",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "1.5vh",
        border: " solid 3px #D3D3D3",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: "30%",
        left: "30%",
    },
    paperaddsmall: {
        position: "absolute",
        width: "20%",
        height: "flex",
        borderRadius: "1.5vh",
        backgroundColor: theme.palette.background.paper,
        border: " solid 3px #D3D3D3",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: "30%",
        left: "40%",
    },

    input: {
        "&::placeholder": {
            fontSize: "16px",
        },
        "&:hover": {
            border: "none",
            backgroundColor: "rgba(255, 255, 255, 0)",
        },
    },
    notchedOutline: {
        border: "none",
    },
}));


const Library = () => {

    const navigate = useNavigate();
    const [jobsList, setJobsList] = useState([]);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [filesOnPage, setFilesOnPage] = useState([]);
    const [selectedPageNumber, setSelectedPageNumber] = useState(1);
    const [jobsChecked, setJobsChecked] = useState([]);
    let filesPerPage = 6;

    let files = [
        {
            _id: 1,
            name: "AA.mp4",
            length: "10 Min",
            sourceLanguage: "English-US",
            date: "26-07-2021, 12:00:00 PM",
            status: "Created",
        },
        {
            _id: 2,
            name: "file2_kqjwenkqweibqweqiwbe.mp4",
            length: "10 Min",
            sourceLanguage: "English-US",
            date: "26-07-2021, 12:00:00 PM",
            status: "In Progress (MT)",
        },
        {
            _id: 3,
            name: "file3_kqjwenkqweibqweqiwbe.mp4",
            length: "10 Min",
            sourceLanguage: "English-US",
            date: "26-07-2021, 12:00:00 PM",
            status: "Published",
        },
        {
            _id: 4,
            name: "file4_kqjwenkqweibqweqiwbe.mp4",
            length: "10 Min",
            sourceLanguage: "English-US",
            date: "26-07-2021, 12:00:00 PM",
            status: "Completed",
        },
        {
            _id: 5,
            name: "file5_kqjwenkqweibqweqiwbe.mp4",
            length: "10 Min",
            sourceLanguage: "English-US",
            date: "26-07-2021, 12:00:00 PM",
            status: "Convert",
        },
        {
            _id: 6,
            name: "file6_kqjwenkqweibqweqiwbe.mp4",
            length: "10 Min",
            sourceLanguage: "English-US",
            date: "26-07-2021, 12:00:00 PM",
            status: "In Progress (ASR)",
        },
        {
            _id: 7,
            name: "file7_kqjwenkqweibqweqiwbe.mp4",
            length: "10 Min",
            sourceLanguage: "English-US",
            date: "26-07-2021, 12:00:00 PM",
            status: "In Progress (MT)",
        },
        {
            _id: 8,
            name: "file8_kqjwenkqweibqweqiwbe.mp4",
            length: "10 Min",
            sourceLanguage: "English-US",
            date: "26-07-2021, 12:00:00 PM",
            status: "In Progress (MT)",
        },
        {
            _id: 9,
            name: "file9_kqjwenkqweibqweqiwbe.mp4",
            length: "10 Min",
            sourceLanguage: "English-US",
            date: "26-07-2021, 12:00:00 PM",
            status: "In Progress (MT)",
        },
        {
            _id: 10,
            name: "file10_kqjwenkqweibqweqiwbe.mp4",
            length: "10 Min",
            sourceLanguage: "English-US",
            date: "26-07-2021, 12:00:00 PM",
            status: "In Progress (MT)",
        },
    ];
    let numberOfPages = jobsList && jobsList.length > 0 ? Math.ceil(jobsList.length / filesPerPage) : 1;

    // useEffect that automatically loads all images of the specific user
    useEffect(() => {
        axios.get("http://localhost:4000/job/getjobs", {
            params: { email: localStorage.getItem("email") }
        })
            .then(res => {
                console.log(res.data);
                setJobsList(res.data);
            }
            )
            .catch(err => {
                console.log(err);
                console.log("Failure in response")
            });
    }, []);

    useEffect(() => {
        if (jobsList) {
            let jobsChecked = Array(jobsList.length).fill(false);
            for (let i = 0; i < jobsList.length; i++) {
                jobsList[i].index = i;
            }
            setJobsChecked(jobsChecked);
            // setFilesOnPage(jobsList.findPipelineJobs.slice(0, filesPerPage));
            setFilesOnPage(jobsList.slice(0, filesPerPage));
        }
        // console.log(jobsChecked)
        // console.log(jobsList)
    }, [jobsList]);

    useEffect(() => {
        if (jobsList && jobsList.length > 0) {
            setFilesOnPage(
                jobsList.slice(
                    (selectedPageNumber - 1) * filesPerPage,
                    selectedPageNumber * filesPerPage
                )
            );
        }
    }, [selectedPageNumber]);

    const handleClickOpen = () => {
        setDeleteConfirm(true);
    };

    const handleClickClose = () => {
        setDeleteConfirm(false);
    };

    function changePage(event, value) {
        setSelectedPageNumber(value);
    }

    function toggleChecked(index) {
        if (index < jobsList.length) {
            setJobsChecked((previousValue) => [
                ...previousValue.slice(0, index),
                !previousValue[index],
                ...previousValue.slice(index + 1, previousValue.length),
            ]);
        }
        console.log(jobsChecked)
    }

    // function doesFileExist(urlToFile) {
    //     var xhr = new XMLHttpRequest();
    //     xhr.open('HEAD', urlToFile, false);
    //     xhr.send();

    //     if (xhr.status == "404") {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }

    // function handleDownload(image) {
    //     var a = document.createElement("a");
    //     var path = "./result/" + image.name.split('.').slice(0, -1).join('.') + '.xlsx';
    //     a.href = path;
    //     a.download = image.name.split('.').slice(0, -1).join('.') + '.xlsx';
    //     a.click();
    // }

    // function handleDelete(image) {

    //     var path = "../frontend/public/result/" + image.name.split('.').slice(0, -1).join('.') + '.xlsx';

    //     const imageData = {
    //         name: image.name,
    //         email: localStorage.getItem("email"),
    //         path: path
    //     }

    //     axios.post("http://localhost:4000/image/deleteimage", imageData)
    //         .then(res => {
    //             console.log("Image deleted");
    //             window.location.reload();
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }

    // async function importAll(imageList) {

    //     let email = localStorage.getItem('email');
    //     let final = [];
    //     let images = {};

    //     imageList.keys().map((item, index) => { images[item.replace('./', '')] = imageList(item); });

    //     for (const imageName in images) {
    //         let category = "";

    //         // get category based on name and email
    //         await axios.get("http://localhost:4000/image/getcategory", {
    //             params: { name: imageName, email: email }
    //         })
    //             .then(res => {
    //                 if (res.data[0] != undefined) {
    //                     category = res.data[0].category;
    //                 }
    //             })
    //             .catch(err => console.log(err));

    //         if (category.localeCompare("") != 0) {

    //             var status = "Partially Extracted";
    //             var path = "./result/" + imageName.split('.').slice(0, -1).join('.') + '.xlsx';
    //             var fileCheck = doesFileExist(path) ? status = "Extracted" : status = "Partially Extracted";

    //             final.push({
    //                 name: imageName,
    //                 email: email,
    //                 category: category,
    //                 status: status
    //             });
    //         }
    //     }

    //     setJobsList(final);

    //     return final;
    // }

    function deleteJobs() {
        let deletedFilesCount1 = 0;
        let deletedFilesCount2 = 0;

        for (let i = 0; i < jobsChecked.length; i++) {
            if (jobsChecked[i]) {
                deletedFilesCount1++;
            }
        }

        for (let i = jobsChecked.length - 1; i >= 0; i--) {
            if (jobsChecked[i] == true) {
                axios.post("http://localhost:4000/job/delete", jobsList[i])
                    .then(res => {
                        deletedFilesCount2++;
                        jobsList.splice(i, 1);
                        if (deletedFilesCount2 == deletedFilesCount1) {
                            setFilesOnPage(
                                jobsList.slice(0, filesPerPage)
                            );
                            setSelectedPageNumber(1);
                            setJobsChecked(
                                Array(jobsChecked.length - deletedFilesCount1).fill(false)
                            );
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
        handleClickClose();
        window.location.reload();
    }

    function redirectToRecordPage(file) {
        // var matchedTasks = []
        // var check = 0;
        // for (let i = 0; i < jobsList.findPipelineJobs.length; i++) {
        //     if (jobsList.findPipelineJobs[i]._id.toString() === file._id.toString()) {
        //         check = 1;
        //         break;
        //     }
        // }

        // for (let i = 0; i < file.allTasks.length; i++) {
        //     if (!check && data_astasks.findAssignedTasks.includes(file.allTasks[i]._id.toString())) {
        //         matchedTasks.push(file.allTasks[i]._id)
        //     } else if (check) {
        //         matchedTasks.push(file.allTasks[i]._id)
        //     }
        // }
        
        console.log(file);

        var jobStruct = {
            jobID: file._id,
            JobStatus: file.status,
            filename: file.name,
            // taskDetails: file.allTasks,
            // gender: file.gender,
            sourceLanguage: file.sourceLanguage,
            // inputFileURL: file.InputFileURL,
            // targetLanguage: file.Pipeline.TargetLanguage,
            // pipelineName: file.Pipeline.Name,
            // taskTemplates: file.Pipeline.TaskTemplates,
            // matchedTasks: matchedTasks,
            toPublish: 0,
            createdAt: file.createdAt,
            index: file.index,
            recordingSrc: file.recordingSrc,
            scriptSrc: file.scriptSrc,
            updatedAt: file.updatedAt,
        };
        console.log(jobStruct)
        navigate('/recordpage', { from: "Library", payload: jobStruct })
    }

    //   const images = importAll(require.context('../../../public/userImages', false, /\.(mpe4|mp4|webm)$/));

    return (
        <section className="" id="1" style={{ height: "80vh", justifyContent: "center", overflow: "hidden" }}>
            <Grid item container justify="center" alignItems="center" style={{ width: "100%", height: "100vh", paddingTop: "3vh", }} >
                <Grid item container direction="column" justifyContent="center" wrap="nowrap" style={{ width: "100vw", height: "100vh", position: "relative", paddingLeft: "5vw", paddingRight: "5vw" }} >
                    <Grid item container style={{ width: "100%", height: "2vh", }}>
                        <Grid item style={{ width: "3%", height: "100%", }} />
                        <Grid item container xs={12} justify="space-between" alignItems="flex-end" style={{ width: "95%", }} >
                            <Grid item container justify="flex-start" alignItems="center" style={{ width: "50%", paddingLeft: "2vw", }} >
                                <Button className={`${classes.addNewFile} ${classes.label}`} disableRipple={true} style={{ width: "8vw", height: "4vh", color: "white", }} onClick={() => setOpen(true)} >
                                    <img src="images/AddNewFile.png" alt="Add File" style={{ display: "inline-block", minHeight: "15px", height: ".9rem", }} />
                                    <span style={{ marginLeft: 5, fontSize: "0.63vw" }}>Add New Job</span>
                                </Button>
                            </Grid>
                            <Grid item container xs={4} justify="flex-end" alignItems="flex-end" style={{ height: "100%", }} ></Grid>
                            <Grid item container xs={2} justifyContent="flex-end" alignItems="flex-end" style={{ height: "100%", paddingRight: "2vw" }} >
                                <Button className={`${classes.addNewFile} ${classes.label}`} disableRipple={true} style={{ width: "8vw", height: "4vh", color: "white", }} onClick={handleClickOpen} >
                                    <img src="images/Delete.png" alt="Delete File" style={{ display: "inline-block", minHeight: "15px", height: ".6rem", }} />
                                    <span style={{ marginLeft: 1, fontSize: "0.63vw" }}>Delete</span>
                                </Button>
                                <div>
                                    <Dialog open={deleteConfirm} onClose={handleClickClose} fullWidth maxWidth="sm" >
                                        <div className="delete">
                                            <DialogTitle>
                                                <div className="title">Delete File</div>
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    <div className="contenttext">
                                                        Permanently delete your file? You can't undo this.
                                                    </div>
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <div className="buttons">
                                                    <div className="cancel">
                                                        <Button onClick={handleClickClose}>
                                                            <div className="text2">Cancel</div>
                                                        </Button>
                                                    </div>
                                                    <div className="deletebutton">
                                                        <Button onClick={deleteJobs} autoFocus>
                                                            <div className="text2">Delete</div>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </DialogActions>
                                        </div>
                                    </Dialog>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} style={{ width: "100%", height: "90vh", marginTop: "3vh", }} >
                        <Grid item container justify="flex-end" style={{ width: "100%", height: "1vh", }} >
                            <Grid item style={{ width: "2.6vw", height: "100%", }} />
                            <Grid item container style={{ width: "85vw", height: "100%", color: "#a6a6a6", }} >
                                <Grid item container alignItems="center" style={{ width: "38%", height: "100%", paddingLeft: "4vw", paddingTop: "2.8vw", }} >
                                    <h3>File Name</h3>
                                </Grid>
                                <Grid item container justify="center" alignItems="center" style={{ width: "21%", height: "100%", paddingTop: "2.8vw", }}>
                                    <h3>Source Language</h3>
                                </Grid>
                                <Grid item container justify="center" alignItems="center" style={{ width: "20%", height: "100%", paddingTop: "2.8vw", }} >
                                    <h3>Date</h3>
                                </Grid>
                                <Grid item container justify="center" alignItems="center" style={{ width: "21%", height: "100%", paddingTop: "2.8vw", }} >
                                    <h3>Status</h3>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid style={{ width: "100%", height: "70vh", }} >
                            <Grid item container alignContent="flex-start" style={{ width: "100%", height: "70%", borderRadius: "4px", }} >
                                {filesOnPage.length === 0 ? (
                                    <Grid item container justify="center" alignItems="center" style={{ width: "100%", height: "7.52vh", backgroundColor: "#f3f9fd", fontSize: 14, fontWeight: "bold", color: "#555556", }}>
                                        Add a file to have it displayed on the screen
                                    </Grid>
                                ) : (
                                    <React.Fragment>
                                        {filesOnPage.map((file, index) => (
                                            <button className={classes.rowButton}
                                                key={file._id}
                                                onClick={() => redirectToRecordPage(file)}
                                                style={{ border: "none", background: "none" }} >
                                                <Grid item container justify="flex-end" style={{ width: "100%", height: "7.52vh", }} >
                                                    <Grid item container
                                                        style={{
                                                            width: "84.5vw",
                                                            height: "100%",
                                                            borderRadius: index == 0 ? "5px 5px 0px 0px" : index == filesPerPage - 1 ? "0px 0px 5px 5px" : 0,
                                                            borderBottom: index < filesOnPage.length - 1 ? "1px solid rgba(14, 102, 172, 0.3)" : "none",
                                                            backgroundColor: "#f3f9fd", fontSize: 14, fontWeight: "bold", color: "#555556", transition: "background-color 0.3s ease-in-out"
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.backgroundColor = "#e1edff"; // Change background color on hover
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.backgroundColor = "#f3f9fd"; // Restore original background color on mouse leave
                                                        }}
                                                    >
                                                        {jobsList && index < jobsList.length ? (
                                                            <Grid item style={{ height: "100%", }} >
                                                                <Checkbox
                                                                    id={`checkbox${file._id}`}
                                                                    disableRipple={true}
                                                                    style={{ paddingLeft: 0, color: "#0e66ac", width: "inherit", height: "inherit", }}
                                                                    checked={jobsChecked[index]}
                                                                    onChange={() => toggleChecked(index)}
                                                                    onClick={(e) => e.stopPropagation()} />
                                                            </Grid>
                                                        ) : (
                                                            <Grid item style={{ height: "100%", }} />
                                                        )}
                                                        <Grid item container title={file.name} alignItems="center" style={{ height: "100%", paddingLeft: "2vw", width: "34%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis ", }} >
                                                            {file.name}
                                                        </Grid>
                                                        <Grid style={{ width: "2%", }} />
                                                        <Grid item container justify="center" alignItems="center" style={{ width: "21%", height: "100%", }} >
                                                            {file.sourceLanguage}
                                                        </Grid>
                                                        <Grid item container justify="center" alignItems="center" style={{ width: "20%", height: "100%", }} >
                                                            {`${new Date(file.createdAt).getDate()}-${new Date(file.createdAt).getMonth() + 1}-${new Date(file.createdAt).getFullYear()}`}
                                                        </Grid>
                                                        <Grid item container justify="center" alignItems="center" style={{ width: "20%", height: "100%", color: file.JobStatus == "Published" ? "#22c01f" : "black", }} >
                                                            {file.JobStatus === "Published" ? (
                                                                <>
                                                                    {file.status}
                                                                    <img src="images/Published.png" alt=" " height="12px" style={{ marginLeft: 7, }} />
                                                                </>
                                                            ) : (
                                                                <div>
                                                                    {file.status != "Completed" ? (
                                                                        <button
                                                                            className={classes.statusButtons}
                                                                            style={{ color: file.status === "Created" ? "#0e66ac" : file.status.includes("In Progress") || file.status === "Preview" ? "#ea6a22" : "#22c01f", textAlign: "center", border: "none", background: "none", }}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                        >
                                                                            {file.status}
                                                                        </button>
                                                                    ) : (
                                                                        <div style={{ display: "flex", flexDirection: "row", width: "100%", }} >
                                                                            <button
                                                                                className={classes.statusButtons}
                                                                                style={{ color: "#22c01f", textAlign: "center", border: "none", background: "none", }}
                                                                            // onClick={() => redirectToPublishPage(file)}
                                                                            >
                                                                                Publish
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </button>
                                        ))}
                                    </React.Fragment>
                                )}
                            </Grid>
                            <Grid item container justifyContent="flex-end" alignItems="flex-end" style={{ width: "100%", height: "10%", }} >
                                <Grid item container justifyContent="flex-end" alignItems="center">
                                    <Grid item style={{ color: "#a6a6a6", }} ></Grid>
                                    <Grid>
                                        <Pagination
                                            count={numberOfPages}
                                            shape="rounded"
                                            color="primary"
                                            className={classes.selected}
                                            page={selectedPageNumber}
                                            onChange={changePage}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <AddNewFile
                open={open}
                setOpen={setOpen}
            />
        </section>
    );
}

export default Library;
