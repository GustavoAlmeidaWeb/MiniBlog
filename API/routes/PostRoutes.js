const router = require('express').Router();

// User Controller
const PostController = require('../controllers/PostController');

// Middlewares
const validate = require('../middlewares/handleValidation');
const authGuard = require('../middlewares/authGuard');
const { imageUpload } = require('../middlewares/imageUpload');
const { postInsertValidation, postUpdateValidation, commentValidation } = require('../middlewares/postValidation');

// Routes
router.get('/search', PostController.searchPosts);
router.get('/dashboard', authGuard, PostController.getPostsByUser);
router.get('/user/:id', authGuard, PostController.getPostsByUserId);
router.post('/create', authGuard, imageUpload.single('imagepost'), postInsertValidation(), validate, PostController.newPost);
router.post('/:id/comment', authGuard, commentValidation(), validate, PostController.newComment);
router.delete('/comment/delete/:id', authGuard, PostController.deleteComment);
router.delete('/delete/:id', authGuard, PostController.deletePost);
router.put('/update/:id', authGuard, imageUpload.single('imagepost'), postUpdateValidation(), validate, PostController.updatePost);
router.get('/teste/:id', authGuard, PostController.getPost1);
router.get('/:id', authGuard, PostController.getPost);
router.get('/', PostController.getAll);

module.exports = router;