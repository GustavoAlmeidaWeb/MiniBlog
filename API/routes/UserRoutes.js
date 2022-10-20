const router = require('express').Router();

// User Controller
const UserController = require('../controllers/UserController');

// Middlewares
const authGuard = require('../middlewares/authGuard');
const validate = require('../middlewares/handleValidation.js');
const { imageUpload } = require('../middlewares/imageUpload');
const { userCreateValidation, loginValidation, userUpdateValidation } = require('../middlewares/userValidation.js');

// Routes
router.post('/register', userCreateValidation(), validate, UserController.register);
router.post('/login', loginValidation(), validate, UserController.login);
router.put('/update', authGuard, userUpdateValidation(), imageUpload.single('imageprofile'), UserController.update);
router.delete('/delete', authGuard, UserController.delete);
router.get('/profile', authGuard, UserController.profile);
router.get('/:id', authGuard, UserController.getUserById);

module.exports = router;