const { MONGO_DB, NODE_ENV ,PORT } = process.env;
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

if (MONGO_DB) {
    mongoose.connect(MONGO_DB, {useNewUrlParser: true});
    console.log('connected to mongoose');
} else {
    console.log('not connected to mongo database');
}

if(NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/api/courses', require('./api/routes/courses'));

const listener = () => console.log('working!!!!!')
app.listen(PORT, listener);

