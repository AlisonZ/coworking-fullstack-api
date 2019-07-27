const router = require('express').Router({ mergeParams: true });
const Units = require('../models/units');

router.get('/', async(req, res, next) => {
    const status = 200;

    //this destructuring is not working because companies needs to have the [0] 
    // const {companies: {employees} } = await Units.findById(req.params.unitId);

    const { companies } = await Units.findById(req.params.unitId);
    const employees = companies[0].employees;

    res.json({ status, employees });
});

router.get('/:id', async(req, res, next) => {
    const status = 200; 
    const { companies } = await Units.findById(req.params.unitId);
    const employee = await companies[0].employees.id(req.params.id)

    res.json({ status, employee });
}); 

router.post('/', async(req, res, next) => {
    const status = 201;
    const unit = await Units.findById(req.params.unitId);
    unit.companies[0].employees.push(req.body);

    await unit.save();

    const employee = unit.companies[0].employees[unit.companies[0].employees.length -1]

    res.json({ status, employee });
});

router.patch('/:id', async(req, res, next) => {
    const status = 201;
    const unit = await Units.findById(req.params.unitId);
    const company = unit.companies[0];
    let response;


    company.employees.forEach((employee) => {
        if(employee._id.toString() === req.params.id) {
            response = employee;
            Object.assign(response, req.body)
        }
    });

    res.json({ status, response });
});
 
router.delete('/:id', async(req, res, next) => {
    const status = 200;
    const unit = await Units.findById(req.params.unitId);

    const { employees } = await unit.companies[0];
    const employee = await employees.id(req.params.id).remove();

    unit.save();
    res.json({ status, employee });

});


module.exports = router;