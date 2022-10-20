const router = require('express').Router();

// User Routes
router.use('/api/users', require('./UserRoutes'));
// Post Routes
router.use('/api/posts', require('./PostRoutes'));
// Status API
router.get('/api', (req, res) => {
    res.json({ message: 'API WORKING.'});
})

module.exports = router;