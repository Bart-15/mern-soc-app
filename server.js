const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./db/db')


// Routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');




const app = express();

const port = process.env.PORT || 5000;

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);



// routes
app.use(users);
app.use(post);
app.use(profile)


app.listen(port , ()=> {
    console.log(`listening on port ${port}`)
})