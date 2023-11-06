const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;
const authorize = require("./middleware/tokenAuth");
require('dotenv').config();

// routes
var UserRouter = require("./routes/user");
var JobRouter = require("./routes/job");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
const uri = process.env.URI;
mongoose.connect(String(uri), { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/user", UserRouter);
app.use(authorize);
app.use("/job", JobRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
