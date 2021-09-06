const mongoose = require('mongoose');
const connectionURI = require('../config/keys').mongoURI;


mongoose.connect(connectionURI, {useNewUrlParser: true, useUnifiedTopology: true});

