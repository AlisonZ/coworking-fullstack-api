const router = require('express').Router({ mergeParams: true });
const Units = require('../models/units');

router.get('/', async(req, res, next) => {
    const status = 200;
    const { company } = await Units.findById(req.params.unitId);

    // Can not determine why this .select() is not working
    // const { authors } = await Books.findById(req.params.bookId).select(publicKey);

    res.json({ status, company});
});
module.exports = router;
