import postService from '../service/postService.js';  // default import 사용

// 게시글 작성
export const createPost = async (req, res) => {
  const { title, author, content, gameId, characterId } = req.body;

  try {
    // 'author'는 닉네임이고, 'authorId'는 해당 닉네임의 사용자 ID (userId)
    const [user] = await postService.getUserByNickname(author); // 사용자 정보를 가져옴
    const authorId = user.userId; // 해당 사용자 ID 사용
    
    const postId = await postService.createPost(title, authorId, author, content, gameId, characterId);
    res.status(201).json({ message: 'Post created successfully', postId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};

// 게시글 수정
export const updatePost = async (req, res) => {
  const { postId, title, author, content, gameId, characterId } = req.body;

  try {
    const [user] = await postService.getUserByNickname(author); // 사용자 정보를 가져옴
    const authorId = user.userId;

    await postService.updatePost(postId, title, authorId, author, content, gameId, characterId);
    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    console.error(error);
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
};
