const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.json({ message: 'ok' });
});

module.exports = router;