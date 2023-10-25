const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();


const userImages = require('../models/images');

// URL is of this format: ../image/..

// Routing Uploaded images to frontend/public/userImages
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, '../frontend/public/userImages/');
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});

// Createing a new instance of multer
const upload = multer({
    storage: storage
});

// Add new image to database
router.post('/add', upload.single('image'), (req, res) => {
    const newImage = new userImages({
        src: "../frontend/public/userImages/" + req.body.name,
        email: req.body.email,
        name: req.body.name,
        category: req.body.category,
    });
    newImage
        .save()
        .then(image => res.json("Image added!"))
        .catch(err => console.log(err));
});

router.post('/addcropped', upload.single('image'), (req, res) => {
    res.send("Image added!");
});

router.post('/upload', (req, res) => {
    const newImage = new userImages({
        src: "../frontend/public/userImages/" + req.body.name,
        email: req.body.email,
        name: req.body.name,
        category: req.body.category,
    });
    newImage
        .save()
        .then(image => res.status(200).json("Image uploaded!"))
        .catch(err => console.log(err));
});
    
// Get category based on name and email
router.get('/getcategory', (req, res) => {
    userImages.find({
        name: req.query.name,
        email: req.query.email
    })
        .then(image => res.json(image))
        .catch(err => console.log(err));
});

// route to return all images of user with email
router.get("/getimages", async function(req,res){
    const email = req.query.email;
    const images = await userImages.find({email: email});
    res.json(images);
});


router.post('/deleteimage', (req, res) => {
    userImages.findOneAndDelete({
        name: req.body.name,
        email: req.body.email
    })
        .then(
            fs.unlinkSync(req.body.path, (err) => {
                if (err) throw err;
                console.log('File deleted!');
            })
        )
        .catch(err => console.log(err));
});


module.exports = router;