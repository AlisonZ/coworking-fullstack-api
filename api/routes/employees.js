const router = require('express').Router();
const Units = require('../models/units');

router.get('/', async(req, res, next) => {
    const status = 200;
    const employees = [];
    const response = [];
    const units = await Units.find();

    units.forEach((unit) => {
        if (unit.companies[0] && unit.companies[0].employees.length > 0){
            unit.companies[0].employees.forEach((employee) => {
                employees.push(employee);
            })
        }
    });

    if(req.query.name) {
        employees.forEach((employee) => {
            const employeeName = `${employee.first_name} ${employee.last_name}`;
            if(employeeName.toLowerCase().includes(req.query.name.toLowerCase())) {
                response.push(employeeName);
            }
        });
    } 

    if(req.query.birthday) {
        employees.forEach((employee) => {
            if(req.query.birthday === employee.date_of_birth) {
                response.push(employee);
            }
        });
    }

    res.json({ status, response });
});

module.exports = router;