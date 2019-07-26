const router = require('express').Router({ mergeParams: true });
const Units = require('../models/units');

router.get('/', async(req, res, next) => {
    const status = 200;
    const { companies } = await Units.findById(req.params.unitId);

    res.json({ status, companies });
});

router.delete('/', async(req, res, next) => {
    const status = 200;
    const unit = await Units.findById(req.params.unitId);
    const company = unit.companies.remove();
    unit.save();

    res.json({ status, company });
});

module.exports = router;
