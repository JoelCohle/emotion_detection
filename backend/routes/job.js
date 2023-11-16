const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const axios = require('axios')

const userJobs = require('../models/jobs');
const API_TOKEN = 'e69ed6d728484972b680c1c2fd76ddc3';

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

const SRTStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '../frontend/public/userSRTs/');
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

const SRTupload = multer({
    storage: SRTStorage
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
        SRT: null,
    });
    newJob
        .save()
        .then(job => res.json("Job added!"))
        .catch(err => console.log(err));
});

// update recordingSrc to existing job and save to file location
router.post('/update', videoupload.single('recording'), (req, res) => {

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

// update SRT to existing job and save to file location
router.post('/updateSRT', SRTupload.single('srt'), (req, res) => {
    userJobs.updateOne({ _id: req.body._id }, {
        $set: {
            SRT: "../frontend/public/userSRTs/" + req.body.name,
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

// update status of job
router.post('/updateStatus', (req, res) => {
    userJobs.updateOne({ _id: req.body._id }, {
        $set: {
            status: req.body.status,
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


async function upload_file(api_token, path) {
    const data = fs.readFileSync(path);
    const url = 'https://api.assemblyai.com/v2/upload';

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/octet-stream',
                'Authorization': api_token,
            },
        });

        if (response.status === 200) {
            return response.data['upload_url'];
        } else {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error(`Error: ${error}`);
        return null;
    }
}

// Async function that sends a request to the AssemblyAI transcription API and retrieves the transcript
async function transcribeAudio(api_token, audio_url) {
    const headers = {
        authorization: api_token,
        'content-type': 'application/json',
    };

    const response = await axios.post('https://api.assemblyai.com/v2/transcript', {
        audio_url,
        speaker_labels: true
    }, { headers });

    const transcriptId = response.data.id;
    const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;

    // Poll the transcription API until the transcript is ready
    while (true) {
        const pollingResponse = await axios.get(pollingEndpoint, { headers });
        const transcriptionResult = pollingResponse.data;

        if (transcriptionResult.status === 'completed') {
            return transcriptionResult;
        }
        else if (transcriptionResult.status === 'error') {
            throw new Error(`Transcription failed: ${transcriptionResult.error}`);
        }
        else {
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
}

// Async function to export subtitles in the specified format
async function exportSubtitles(api_token, transcriptId, format) {
    const exportUrl = `https://api.assemblyai.com/v2/transcript/${transcriptId}/${format}`;
    const exportResponse = await axios.get(exportUrl, {
        headers: {
            'Content-Type': 'application/octet-stream',
            'Authorization': api_token,
        }
    });
    return exportResponse.data;
}

router.post('/getSubtitles', async (req, res) => {
    const path = "../frontend/public/userRecordings/" + req.body.videoName;
    const API_TOKEN = 'e69ed6d728484972b680c1c2fd76ddc3';

    const uploadUrl = await upload_file(API_TOKEN, path);

    if (!uploadUrl) {
        res.status(500).json({ error: 'Failed to process audio' });
    }

    // Call the transcribeAudio function to start the transcription process
    const transcript = await transcribeAudio(API_TOKEN, uploadUrl);

    // Call the exportSubtitles function with the desired format ('srt' or 'vtt')
    const subtitles = await exportSubtitles(API_TOKEN, transcript.id, 'srt');

    res.status(200).json(subtitles)
})

router.post('/delete', (req, res) => {
    const file1 = req.body.recordingSrc;
    const file2 = req.body.SRT;
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
            console.log('Recording File deleted!');
        })
    }

    if (file2 && success) {
        fs.unlinkSync(file2, (err) => {
            if (err) throw err;
            console.log('SRT File deleted!');
        })
    }
});

router.get("/getscript", async function (req, res) {
    const scriptName = req.query.scriptName;
    const scriptPath = path.join(__dirname, "../../frontend/public/userScripts/", scriptName);
    res.sendFile(scriptPath);
});

router.get("/getSRT", async function (req, res) {
    const SRTName = req.query.name;
    const SRTPath = path.join(__dirname, "../../frontend/public/userSRTs/", SRTName);
    res.sendFile(SRTPath);
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
