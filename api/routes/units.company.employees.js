const router = require('express').Router({ mergeParams: true });
const Units = require('../models/units');

router.get('/', async(req, res, next) => {
    try {
        const status = 200;
        
        const { company } = await Units.findById(req.params.unitId);
        const employees = company[0].employees;   

        res.json({ status, employees });
    } catch (error) {
        error.status = 404;

        if (!company[0]) {
            error.message = `${req.method} ${req.path} failed. No company listed for this unit`
        } else if (!company) {
            error.message = `${req.method} ${req.path} failed. No unit listed with this id`
        }
        next(error);
    }
});

router.get('/:id', async(req, res, next) => {
    try {

        const status = 200; 
        const { company } = await Units.findById(req.params.unitId);
        const employee = await company[0].employees.id(req.params.id)
        
        res.json({ status, employee });
    } catch (error) {
        error.status = 404;
        if(!company) {
            error.message = `${req.method} ${req.path} failed. There is no company listed for the unit you entered`
        }

        if(!employee) {
            error.message = `${req.method} ${req.path} failed. There is no employee listed for the employee id you entered`   
        }
        next(error);
    }
}); 

router.post('/', async(req, res, next) => {
    const status = 201;
    const unit = await Units.findById(req.params.unitId);
    unit.company[0].employees.push(req.body);

    await unit.save();

    const employee = unit.company[0].employees[unit.company[0].employees.length -1]

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