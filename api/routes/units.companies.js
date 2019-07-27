const router = require('express').Router({ mergeParams: true });
const Units = require('../models/units');

router.get('/', async(req, res, next) => {
    const status = 200;
    const { companies } = await Units.findById(req.params.unitId);

    res.json({ status, companies });
});

router.post('/', async(req, res, next) => {
    const status = 201;
    const unit = await Units.findById(req.params.unitId);

    unit.companies = req.body;
    await unit.save();
    
    const company = unit.companies;

    res.json({ status, company });
});

router.patch('/', async(req, res, next) => {
    const status = 201;
    const unit = await Units.findById(req.params.unitId);
    const company = unit.companies[0];
    Object.assign(company, req.body);
    await unit.save();

    res.json({ status, unit });
});

router.delete('/', async(req, res, next) => {
    const status = 200;
    const unit = await Units.findById(req.params.unitId);

    const company = unit.companies[0].remove();

    unit.save();

    res.json({ status, company });
});

module.exports = router;
