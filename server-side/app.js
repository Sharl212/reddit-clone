const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require("passport")
const cors = require("cors")
const app = express();

const postRoute = require('./routes/post');
const userRoute = require('./routes/user');
// * JWT authentication strategy
const { Strategy, authenticate } = require("./authentication/auth")

require('./database') // ? establish db connection

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

// * passport for authentication
passport.use(Strategy);

// app.use('/api/post', postRoute)
app.use('/api/post', authenticate, postRoute)
app.use('/api/user', userRoute)

app.listen(4000, console.log('Server up on port 4000..'))
module.exports = app;