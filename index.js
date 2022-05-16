const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
const app = express();

const httpStatus = require('http-status');
const Project = require('./project.model');

app.use(bodyParser.json());

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
        console.log(req.body);
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
        res.json(projects);

        res.send(projects);
    } catch (error) {
        return next(error);
    }
});

app.get("/", (req, res) => {
  res.send("root");
});

app.listen(3000);
