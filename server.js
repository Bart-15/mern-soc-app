const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./db/db')
const path = require('path');

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

// server static assets if in production
if(process.env.NODE_ENV == 'production') {
    // Set static folder
    app.use(express.static('./client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
    })
}




app.listen(port , ()=> {
    console.log(`listening on port ${port}`)
})