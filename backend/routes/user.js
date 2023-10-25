var express = require("express");
var bcrypt = require("bcryptjs");
var router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

// Initialising the google client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Load User model
const User = require("../models/user");
const { mailTransport } = require("./mailverification");

// URL is of this format: ../user/..

// GET request
// Getting all the users
router.get("/", function (req, res) {
  User.find(function (err, buyers) {
    if (err) {
      console.log(err);
    } else {
      res.json(buyers);
    }
  });
});

// POST request
// Add a user to the database
router.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  console.log("Password received:", req.body.password);
const password = bcrypt.hashSync(req.body.password, 12);

  const newUser = new User({ name, email, password });

  User.findOne({ email: req.body.email }).then((userexists) => {
    if (userexists) {
      return res.status(400).json({ email: "email exists" });
    } else {
      newUser
        .save()
        .then((user) => {
          mailTransport().sendMail({
            from: "emailverification@ocrwebapp.com",
            to: user.email,
            subject: "Email Verification",
            html: `<h1>Welcome to OCR Web App</h1>`
          });
          res.status(200).json(user);
        })
        .catch((err) => {
          console.error(`Error in saving user ${JSON.stringify(newUser)}`);
          res.status(400).send(err);
        });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  // Find buyer by email
  User.findOne({ email }).then((user) => {
    // Check if buyer email exists
    if (!user) {
      return res.status(404).json({
        error: "User with the given email not found",
      });
    } else 
    {
        // Check if password is correct
        if (bcrypt.compareSync(req.body.password, user.password)) 
            {
              mailTransport().sendMail({
                from: "emailverification@ocrwebapp.com",
                to: user.email,
                subject: "Email Verification",
                html: `<h1>New Login to OCR web app</h1>`
              });

              const token = {
                email: user.email
              }
              const signedtoken = jwt.sign(token, process.env.SECRET_ACCESS_TOKEN);
              return res.status(200).json({
                usertoken: signedtoken,
                email: email
              });

            }
            else {
                res.status(401).send({ message: 'Invalid password' });
            }
    }
  });
});

// POST request
// Add a user through google registration
router.post("/googleregister", async (req, res) => {
  // Authenticating the user with google
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email } = ticket.getPayload();
  const password = ""; // Google users do not have passwords

  // Add user to database
  const newUser = new User({ name, email, password });
  newUser
    .save()
    .then((user) => {
      res.status(200).send(user.name);
    })
    .catch((err) => {
      res.send(err);
    });
});

// POST request
// Check if user exists
router.post("/googlelogin", async (req, res) => {
  // Authenticating the user with google
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { email } = ticket.getPayload();

  // Checking if email exists in the database
  User.findOne({ email: email }, function (err, user) {
    if (user) {

      const token = {
        email: email
      }
      const signedtoken = jwt.sign(token, process.env.SECRET_ACCESS_TOKEN);
      return res.status(200).json({
        usertoken: signedtoken,
        email: email 
      });

    } else {
      res.status(400);
    }
  });
});

module.exports = router;
