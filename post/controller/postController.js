const postService = require('../service/postService');

// 게시물 작성
async function createPost(req, res) {
    const { gameName, characterName, title, authorId, content } = req.body;
    try {
        const newPost = await postService.createPost({ gameName, characterName, title, authorId, content });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
}

// 게시물 조회
async function getPost(req, res) {
    const { postId } = req.params;
    try {
        const post = await postService.getPostById(postId);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error });
    }
}

module.exports = { createPost, getPost };
