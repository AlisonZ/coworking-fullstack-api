const router = require('express').Router();
const Course = require('../models/course');

router.get('/', (req, res, next) => {
    Course.find().then( response => {
        console.log(response);
        res.json({response});
    });
});

module.exports = router;