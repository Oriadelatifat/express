const prisma = require('../../dbConfig');

exports.createPost = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    const { userId } = req.user;
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    res.status(201).json({
      message: 'Post created successfully',
      post: newPost,
    });
  } catch (error) {
    console.log('Error is: ', error);
    res.status(500).json({ error: 'Error creating post' });
  }
};

exports.editPost = async (req, res) => {
  const { postId, title, content } = req.body;
  const { userId } = req.user;
  try {
    const postExist = await prisma.post.findUnique({
      where: {
        id: postId,
        authorId: userId,
      },
    });
    if (!postExist) {
      return res.status(404).json({ error: 'Post does not exist or author unauthorized' });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: title ?? postExist.title,
        content: content ?? postExist.content,
      },
    });
    res.status(201).json({
      message: 'Post updated successfully',
      success: true,
      updatedPost,
    });
  } catch (error) {
    console.log('Error is: ', error);
    res.status(500).json({ error: 'Error updating post', success: false });
  }
};

exports.getPosts = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await prisma.post.findUnique({ where: { id: parseInt(postId) } });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching post' });
  }
};

exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.user;
  try {
    const post = await prisma.post.findUnique({ where: { id: parseInt(postId), authorId: userId } });
    if (!post) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }
    await prisma.post.delete({ where: { id: parseInt(postId) } });
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post' });
  }
};
