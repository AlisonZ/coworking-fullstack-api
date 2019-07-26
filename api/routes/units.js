const router = require('express').Router();
// const { generate: generateId } = require('shortid');
const Units = require('../models/units');

router.get('/', async (req, res, next) => {
    const status = 200;
    const response = await Units.find();

    if (req.query.kind) {
        const filteredByKindResponse = [];
        response.forEach((unit) => {
            if (unit.kind === req.query.kind) {
                filteredByKindResponse.push(unit);
            }
        });
        return res.json({ status, filteredByKindResponse });
    } else if (req.query.floor) {
        const filteredByFloorResponse = [];
        response.forEach((unit) => {
            if (unit.floor === req.query.floor) {
                filteredByFloorResponse.push(unit);
            }
        });
        return res.json({ status, filteredByFloorResponse });
    } else if (req.query.occupied) {
        const filteredByOccupiedStatusResponse = [];
        if(req.query.occupied === "true") {
            response.forEach((unit) => {
                if (unit.company.name !== "unoccupied") {
                    filteredByOccupiedStatusResponse.push(unit);
                }
            });
        } else if (req.query.occupied === "false") {
            response.forEach((unit) => {
                if (unit.company.name === "unoccupied") {
                    filteredByOccupiedStatusResponse.push(unit)
                }
            });
        }
        return res.json({ status, filteredByOccupiedStatusResponse });
    } else {
        return res.json({ status, response });
    }

});


//this is for me to get some data in db to play with
router.post('/', async (req, res, next) => {
    console.log('in the units post', req.body);
    const status = 201;

    const response = await Units.create(req.body);
    res.json({ status, response});
});

module.exports = router;
