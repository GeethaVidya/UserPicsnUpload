const express = require('express');
const mongoose = require('mongoose');
const users= require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const network = require('./routes/api/network');
const bodyparser = require('body-parser');
const passport = require('passport');

const app = express();

//Bodyparser Middleware
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//Db Config
const db = require('./config/keys').mongoURI;
//connect to mongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDb connected!'))
    .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());
require('./config/passport') (passport);

//First route
//app.get('/', (req, res) => res.send('Hello world'));

//use routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);
app.use('/api/network', network);
 
const port = 5255;
app.listen(port, () => console.log(`Server running on port ${port}`));
