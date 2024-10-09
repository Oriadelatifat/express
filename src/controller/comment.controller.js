const prisma = require('../../dbConfig');

exports.createComment = async (req, res) => {
    try {
      const { content, postId } = req.body;
      const { userId } = req.user;

      console.log('Request body:', req.body);
      console.log('User ID:', userId);

      const newComment = await prisma.comment.create({
        data: {
          content,
          postId,
          authorId,
        },
      });
      res.status(201).json({ message: 'Comment created successfully', comment: newComment });
    } catch (error) {
      res.status(500).json({ error: 'Error creating comment' });
    }
};

exports.editComment = async (req, res) => {
    const { commentId, content } = req.body;
    const { userId } = req.user;
    try {
      const commentExist = await prisma.comment.findUnique({ where: { id: commentId, authorId: userId } });
      if (!commentExist) {
        return res.status(404).json({ error: 'Comment does not exist or author unauthorized' });
      }
  
      const updatedComment = await prisma.comment.update({
        where: { id: commentId },
        data: { content: content ?? commentExist.content },
      });
      res.status(201).json({ message: 'Comment updated successfully', updatedComment });
    } catch (error) {
      res.status(500).json({ error: 'Error updating comment' });
    }
};

exports.getComment = async (req, res) => {
    const { postId } = req.params;
    try {
      const comments = await prisma.comment.findMany({ where: { postId: parseInt(postId) } });
      res.status(200).json({ comments });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching comments' });
    }
};

exports.deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const { userId } = req.user;
    try {
      const comment = await prisma.comment.findUnique({ where: { id: parseInt(commentId), authorId: userId } });
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found or unauthorized' });
      }
      await prisma.comment.delete({ where: { id: parseInt(commentId) } });
      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.log('Error creating comment:', error);
      res.status(500).json({ error: 'Error deleting comment' });
    }
};