const router = require('express').Router();
// const { generate: generateId } = require('shortid');
const Units = require('../models/units');

router.get('/', async (req, res, next) => {
    const status = 200;
    const units = await Units.find();
    const response = [];

    if (req.query.kind) {
        units.forEach((unit) => {
            if (unit.kind === req.query.kind) {
                response.push(unit);
            }
        });
    } else if (req.query.floor) {
        units.forEach((unit) => {
            if (unit.floor === req.query.floor) {
                response.push(unit);
            }
        });
        // return res.json({ status, filteredByFloorResponse });
    } else if (req.query.occupied) {
        if(req.query.occupied === "true") {
            units.forEach((unit) => {
                if(unit.companies.length >= 1) {
                    response.push(unit);
                }
            });
        } else if(req.query.occupied === "false") {
            units.forEach((unit) => {
                if(unit.companies.length === 0) {
                    response.push(unit);
                }
            });
        }
    } else {
        return res.json({ status, units });
    }

    return res.json({ status, response });
});

router.get('/:id', async(req, res, next) => {
    const status = 200;
    const response = await Units.findById(req.params.id)

    res.json({ status, response });
}); 

router.patch('/:id', async(req, res, next) => {
    const status = 201;
    const filter = { _id: req.params.id};
    const update = req.body;

    let response = await Units.findOneAndUpdate(filter, update, {
        new: true
    });

    res.json({ status, response });

    //TODO: add 404 if ID not found
});

//TODO: change to patch and actually patch
// router.patch('/:id/company', async(req, res, next) => {
//     console.log('boooooooo')
//     const status = 201;
//     const unit = await Units.findById(req.params.id);
//     unit.company = req.body;
//     unit.save();
    
//     //TODO: response is not updating correctly, but correct in dB
//     let response = await Units.findById(req.params.id);

//     res.json({ status, response });
// });


//this is for me to get some data in db to play with
router.post('/', async (req, res, next) => {
    const status = 201;

    const response = await Units.create(req.body);
    res.json({ status, response});
});

module.exports = router;
