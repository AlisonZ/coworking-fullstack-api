const router = require('express').Router({ mergeParams: true });
const Units = require('../models/units');

router.get('/', async(req, res, next) => {

    console.log('in the company get params', req.params.unitId);
    const status = 200;
    const { companies } = await Units.findById(req.params.unitId);

    res.json({ status, companies});
});

module.exports = router;
