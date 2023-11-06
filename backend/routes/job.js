const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();


const userJobs = require('../models/jobs');

// URL is of this format: ../image/..

// Routing Uploaded images to frontend/public/userJobs
const videoStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, '../frontend/public/userRecordings/');
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});

const scriptStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, '../frontend/public/userScripts/');
    },
    filename: function(req, file, callback) {
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

// Add new recording to database
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

    if(file1 && success){
        fs.unlinkSync(file1, (err) => {
            if (err) throw err;
            console.log('File deleted!');
        })
    }
});

router.get("/getjobs", async function(req,res){
    const email = req.query.email;
    const jobs = await userJobs.find({email: email});
    res.json(jobs);
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