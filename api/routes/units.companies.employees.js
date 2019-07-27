const router = require('express').Router({ mergeParams: true });
const Units = require('../models/units');

router.get('/', async(req, res, next) => {
    const status = 200;

    //Not sure why this destructuring is not working
    //maybe it is and I need to create a post to populate the employees part
    // const {companies: {employees} } = await Units.findById(req.params.unitId);

    const { companies } = await Units.findById(req.params.unitId);
    // const employees = companies.employees;

    // console.log('employees', employees);

    //this is not returning a unit object but instead a query object
    //not sure how to get this working, so moved logic to the unit.companies.js
    res.json({ status, companies });
});

router.post('/', async(req, res, next) => {
    const status = 201;
    const unit = await Units.findById(req.params.unitId);
    unit.companies[0].employees.push(req.body);

    await unit.save();

    const employee = unit.companies[0].employees[unit.companies[0].employees.length -1]

    res.json({ status, employee });
});


module.exports = router;