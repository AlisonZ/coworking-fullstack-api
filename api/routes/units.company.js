const router = require('express').Router({ mergeParams: true });
const Units = require('../models/units');

router.get('/', async(req, res, next) => {
    const status = 200;
    const { company } = await Units.findById(req.params.unitId);

    res.json({ status, company});
});

router.post('/', async(req, res, next) => {
    try {

        const status = 201;
        const unit = await Units.findById(req.params.unitId);
        
        unit.company= req.body;
        await unit.save();
        
        const company = unit.company;
        
        res.json({ status, company });
    } catch (error) {
        error.status = 404;
        error.message = `${req.method} ${req.path} failed. Unit id could not be found`;
        next(error);
    }
}); 

router.patch('/', async(req, res, next) => {
    try {

        const status = 201;
        const unit = await Units.findById(req.params.unitId);
        const company = unit.company[0];
        Object.assign(company, req.body);
        await unit.save();
        
        res.json({ status, unit });
    } catch (error) {
        error.status = 404;
        error.message = `${req.method} ${req.path} failed. Unit id could not be found`;
        next(error);
    }
});

router.delete('/', async(req, res, next) => {
    try {

        const status = 200;
        const unit = await Units.findById(req.params.unitId);
        
        const company = unit.company[0].remove();
        
        unit.save();
        res.json({ status, unit });
    } catch(error) {
        error.status = 404;
        error.message = `${req.method} ${req.path} failed. Unit id could not be found`;
        next(error);
    }
});

module.exports = router;
