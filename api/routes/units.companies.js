const router = require('express').Router({ mergeParams: true });
const Units = require('../models/units');

router.get('/', async(req, res, next) => {
    const status = 200;
    const { companies } = await Units.findById(req.params.unitId);

    res.json({ status, companies });
});

module.exports = router;
