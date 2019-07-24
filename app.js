const { PORT } = process.env;
const express = require('express');
const app = express();
//body-parser
//morgan

const listener = () => console.log('working!!!!!')
app.listen(PORT, listener);

