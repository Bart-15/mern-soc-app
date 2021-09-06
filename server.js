const express = require('express');
const mongoose = require('mongoose');
require('./db/db')


// Routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');




const app = express();

const port = process.env.PORT || 5000;



// routes

app.use(users);
app.use(post);
app.use(profile)


app.listen(port , ()=> {
    console.log(`listening on port ${port}`)
})