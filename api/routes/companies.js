const router = require('express').Router();
const Units = require('../models/units');

router.get('/', async(req, res, next) => {
    const status = 200;
    const companies = [];
    const units = await Units.find();

    units.forEach((unit) => {
        if(unit.companies[0]) {
            companies.push(unit.companies[0]);
        }
    });

    res.json({ status, companies });
});

module.exports = router;    