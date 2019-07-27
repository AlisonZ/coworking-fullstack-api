const router = require('express').Router();
// const { generate: generateId } = require('shortid');
const Units = require('../models/units');

router.get('/', async (req, res, next) => {
    const status = 200;
    const units = await Units.find();
    const response = [];

    if (units.length > 0 ){
        if (req.query.kind) {
            units.forEach((unit) => {
                if (unit.kind === req.query.kind) {
                    response.push(unit);
                }
            });
        } else if (req.query.floor) {
            units.forEach((unit) => {
                if (unit.floor === parseInt(req.query.floor)) {
                    response.push(unit);
                }
            });
        } else if (req.query.occupied) {
            if(req.query.occupied === "true") {
                units.forEach((unit) => {
                    if(unit.company.length >= 1) {
                        response.push(unit);
                    }
                });
            } else if(req.query.occupied === "false") {
                units.forEach((unit) => {
                    if(unit.company.length === 0) {
                        response.push(unit);
                    }
                });
            }
        } else {
            return res.json({ status, units });
        }
    
    }
    
    return res.json({ status, response });
});

router.get('/:id', async(req, res, next) => {
    const status = 200;
    const response = await Units.findById(req.params.id)

    res.json({ status, response });
}); 

//could not for the life of me get this to work for the company
//believe it is because of the array behavior??
//also spent too much time trying to figure out how to 
//post a unit without a company with the companies as an object instead of array
router.patch('/:id', async(req, res, next) => {
    try {
        const status = 201;
        const filter = { _id: req.params.id};
        const update = req.body;
    
        let response = await Units.findOneAndUpdate(filter, update, {
            new: true
        });
    
        res.json({ status, response });
    } catch (error) {
        error.status = 404;
        error.message = `${req.method} ${req.path} failed. Unit id could not be found`;
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const status = 201;
    const unitKinds = ["seat", "desk", "small office", "large office", "floor"];
    const response = !unitKinds.includes(req.body.kind) ? 'this is not a valid unit type' : await Units.create(req.body);

    res.json({ status, response});
});

module.exports = router;
