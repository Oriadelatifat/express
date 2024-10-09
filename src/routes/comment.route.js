const express = require('express');
const { createComment, editComment, getComment, deleteComment } = require('../controller/comment.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/create', authMiddleware, createComment);
router.put('/edit', authMiddleware, editComment);
router.get('/', authMiddleware, getComment);
router.delete('/delete/:commentId', authMiddleware, deleteComment);

module.exports = router;