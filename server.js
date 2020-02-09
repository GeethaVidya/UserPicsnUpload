const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Db Config
const db = require('./config/keys').mongoURI;
//connect to mongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDb connected!'))
    .catch(err => console.log(err));
//First route
app.get('/', (req, res) => res.send('Hello world'));

const port = 5255;
app.listen(port, () => console.log(`Server running on port ${port}`));
