const { MONGO_DB, NODE_ENV ,PORT } = process.env;
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

if (MONGO_DB) {
    const options = { useFindAndModify: false, useNewUrlParser: true, }
    mongoose.connect(MONGO_DB, options);
} else {
    console.log('not connected to mongo database');
}

if(NODE_ENV === 'development') app.use(morgan('dev'));
app.use(require('body-parser').json())

//Routes
app.use('/api/units', require('./api/routes/units'));
app.use('/api/units/:unitId/company', require('./api/routes/units.company'));
app.use('/api/units/:unitId/company/employees', require('./api/routes/units.company.employees'));
app.use('/api/company', require('./api/routes/company'));
app.use('/api/employees', require('./api/routes/employees'));

const listener = () => console.log('app is working')
app.listen(PORT, listener);

