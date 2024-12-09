import postService from '../service/postService.js';

// 게시글 작성
export const createPost = async (req, res) => {
  const { title, author, content, gameId, characterId } = req.body;

  try {
    const [user] = await postService.getUserByNickname(author);
    const authorId = user.userId;

    const postId = await postService.createPost(title, authorId, author, content, gameId, characterId);
    res.status(201).json({ message: 'Post created successfully', postId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};

// 게시글 수정
export const updatePost = async (req, res) => {
  const { postId, title, author, content, gameId, characterId } = req.body;

  try {
    const [user] = await postService.getUserByNickname(author);
    const authorId = user.userId;

    await postService.updatePost(postId, title, authorId, author, content, gameId, characterId);
    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
};

// 게시글 조회
export const getPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await postService.getPost(postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving post', error: error.message });
  }
};

// 게시글 삭제
export const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    await postService.deletePost(postId);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
};

// 좋아요 추가
export const likePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.userId;

  try {
    await postService.addLike(postId, userId);
    res.status(200).json({ message: 'Post liked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error liking post', error: error.message });
  }
};

// 좋아요 삭제
export const unlikePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.userId;

  try {
    await postService.removeLike(postId, userId);
    res.status(200).json({ message: 'Post unliked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error unliking post', error: error.message });
  }
};

// 좋아요 수 조회
export const getPostLikes = async (req, res) => {
  const { postId } = req.params;

  try {
    const likeCount = await postService.getLikeCount(postId);
    res.status(200).json({ postId, likeCount });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving like count', error: error.message });
  }
};
