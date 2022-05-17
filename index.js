const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
const app = express();

const httpStatus = require('http-status');
const Project = require('./project.model');

app.use(bodyParser.json());

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

mongoose.connect(
  "mongodb://localhost:27017/",
  {
    dbName: "portfolio",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => (err ? console.log(err) : console.log("Connected to database"))
);

/**
* Create Company Profile
* @public
*/
app.post("/projects", async (req, res, next) => {
    try {
        const entity = new Project(req.body);
        const saved = await entity.save();

        res.status(httpStatus.CREATED);
        res.json(saved);
    } catch (error) {
        next(error);
    }
});

app.get("/projects", async (req, res, next) => {

    try {

        let projects = await Project.find({});

        if(!projects) {
          res.status(httpStatus.NOT_FOUND);
          res.json('Not found.');
          return next();
        }

        res.status(httpStatus.OK);
        res.send(projects);
    } catch (error) {
        return next(error);
    }
});

app.get("/", (req, res) => {
  res.send("root");
});

app.listen(3000);
