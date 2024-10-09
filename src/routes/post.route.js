const express = require('express');
const { createPost, editPost, getPosts, deletePost } = require('../controller/post.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/create', authMiddleware, createPost);
router.put('/edit', authMiddleware, editPost);
router.get('/read', getPosts);
router.delete('/delete/:postId', authMiddleware, deletePost);

module.exports = router;
