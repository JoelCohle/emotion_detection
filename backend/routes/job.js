const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();


const userJobs = require('../models/jobs');

// URL is of this format: ../image/..

// Routing Uploaded images to frontend/public/userJobs
const videoStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '../frontend/public/userRecordings/');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const scriptStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '../frontend/public/userScripts/');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

// Createing a new instance of multer
const scriptupload = multer({
    storage: scriptStorage
});

const videoupload = multer({
    storage: videoStorage
});

// Add new job to database
router.post('/add', scriptupload.single('job'), (req, res) => {
    const newJob = new userJobs({
        scriptSrc: "../frontend/public/userScripts/" + req.body.name,
        email: req.body.email,
        name: req.body.name,
        status: req.body.status,
        sourceLanguage: req.body.sourceLanguage,
        recordingSrc: null,
    });
    newJob
        .save()
        .then(job => res.json("Job added!"))
        .catch(err => console.log(err));
});

// update recordingSrc to existing job and save to file location
router.post('/update', videoupload.single('recording'), (req, res) => {

    console.log(req.body);
    userJobs.updateOne({ _id: req.body._id }, {
        $set: {
            recordingSrc: "../frontend/public/userRecordings/" + req.body.name,
            status: req.body.status
        }
    })
        .then(updatedJob => {
            console.log(updatedJob);
            res.status(200).json(updatedJob);
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to update job', details: err })
        })
});


router.post('/delete', (req, res) => {
    const file1 = req.body.recordingSrc;
    let success = false;

    userJobs.findOneAndDelete({
        _id: req.body._id,
        email: req.body.email
    })
        .then(
            fs.unlinkSync(req.body.scriptSrc, (err) => {
                if (err) throw err;
                console.log('File deleted!');
            }),
            success = true
        )
        .catch(err => console.log(err));

    if (file1 && success) {
        fs.unlinkSync(file1, (err) => {
            if (err) throw err;
            console.log('File deleted!');
        })
    }
});

router.get("/getscript", async function (req, res) {
    const scriptName = req.query.scriptName;
    const scriptPath = path.join(__dirname, "../../frontend/public/userScripts/", scriptName);
    res.sendFile(scriptPath);
});

router.get("/getjobs", async function (req, res) {
    const email = req.query.email;
    const jobs = await userJobs.find({ email: email });
    res.json(jobs);
});

router.get('/getjobdetails', (req, res) => {
    userJobs.findOne({
        _id: req.query._id,
    })
        .then(job => res.json(job))
        .catch(err => console.log(err));
});

// get video recording file based on _id
router.get("/getrecording", async function (req, res) {
    const recordingName = req.query.recordingName;
    const recordingPath = path.join(__dirname, "../../frontend/public/userRecordings/", recordingName);
    console.log(recordingPath)
    res.sendFile(recordingPath);
    // if (fs.existsSync(recordingPath)) {
    //     // Stream the video file
    //     const fileStream = fs.createReadStream(recordingPath);
    //     fileStream.pipe(res);
    // } else {
    //     res.status(404).send('Video not found');
    // }
});


// // Get category based on name and email
// router.get('/getcategory', (req, res) => {
//     userJobs.find({
//         name: req.query.name,
//         email: req.query.email
//     })
//         .then(image => res.json(image))
//         .catch(err => console.log(err));
// });

// // route to return all images of user with email
// router.get("/getimages", async function(req,res){
//     const email = req.query.email;
//     const images = await userJobs.find({email: email});
//     res.json(images);
// });


// router.post('/deleteimage', (req, res) => {
//     userJobs.findOneAndDelete({
//         name: req.body.name,
//         email: req.body.email
//     })
//         .then(
//             fs.unlinkSync(req.body.path, (err) => {
//                 if (err) throw err;
//                 console.log('File deleted!');
//             })
//         )
//         .catch(err => console.log(err));
// });


module.exports = router;
