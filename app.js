const { MONGO_DB, NODE_ENV ,PORT } = process.env;
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

if (MONGO_DB) {
    const options = { useFindAndModify: false, useNewUrlParser: true, }
    mongoose.connect(MONGO_DB, options);
    // console.log('connected to mongoose');
} else {
    console.log('not connected to mongo database');
}

if(NODE_ENV === 'development') app.use(morgan('dev'));
app.use(require('body-parser').json())

//Routes
app.use('/api/units', require('./api/routes/units'));
app.use('/api/units/:unitId/companies', require('./api/routes/units.companies'));
app.use('/api/units/:unitId/companies/employees', require('./api/routes/units.companies.employees'));

const listener = () => console.log('app is working')
app.listen(PORT, listener);

