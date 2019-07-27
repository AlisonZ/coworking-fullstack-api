const router = require('express').Router();
const Units = require('../models/units');

router.get('/', async(req, res, next) => {
    const status = 200;
    const response = [];
    const units = await Units.find();

    
    if (req.query.name) {
        units.forEach((unit) => {
            if(unit.companies[0]) {
                const companyName = unit.companies[0].name.toLowerCase();
                const searchQuery = req.query.name.toLowerCase();
                
                companyName.includes(searchQuery) ? response.push(unit.companies[0]) : null;
            } 
        });     
    } else {
        units.forEach((unit) => {
            if(unit.companies[0]) {
                response.push(unit.companies[0]);
            }
        });
    }
    
    res.json({ status, response });
});

module.exports = router;    