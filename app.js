const { NODE_ENV ,PORT } = process.env;
const express = require('express');
const morgan = require('morgan');
const app = express();

if(NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/api/courses', require('./api/routes/courses'));

const listener = () => console.log('working!!!!!')
app.listen(PORT, listener);

