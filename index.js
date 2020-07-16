const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('deuboa');
});

app.get('/', (req, res) => {
    res.send('req');
})

app.listen(3000);