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
    //not really liking this const,
    const company = unit.companies;

    res.json({ status, company });
});

router.patch('/', async(req, res, next) => {
    const status = 201;
    const unit = await Units.findById(req.params.unitId);

    unit.update(
        {
            _id: req.params.unitId
        },
        {
            $set: {
                "name":  "new nammmmmmeeeeee"
            }
        }
     )

    // console.log('request body', req.body);
    // console.log('unit', unit);

    // res.json({ status, response });
});

router.delete('/', async(req, res, next) => {
    const status = 200;
    const unit = await Units.findById(req.params.unitId);

    //if there is a change where multiple companies can share one unit
    //replace this [0] index by finding by the id and having the id be part of the params
    const company = unit.companies[0].remove();

    unit.save();

    res.json({ status, company });
});

module.exports = router;
