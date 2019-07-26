const router = require('express').Router({ mergeParams: true });
const Units = require('../models/units');

router.get('/:id/company', async(req, res, next) => {
    // const status = 201;
    // const unit = await Units.findById(req.params.id);

    console.log('get', req.params.id);
});

module.exports = router;
