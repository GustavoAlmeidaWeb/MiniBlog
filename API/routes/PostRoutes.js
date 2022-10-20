const router = require('express').Router();

// User Controller
const PostController = require('../controllers/PostController');

// Middlewares

// Routes
router.get('/', PostController.getAll);

module.exports = router;