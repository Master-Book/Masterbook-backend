import mypageService from './mypageService.js';

// 내가 작성한 글 조회
export const getMyPosts = async (req, res) => {
  try {
    const userId = req.user.userId; // 인증 미들웨어에서 추출한 사용자 ID
    const posts = await mypageService.getMyPosts(userId);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user posts', error: error.message });
  }
};

// 내가 작성한 댓글 조회
export const getMyComments = async (req, res) => {
  try {
    const userId = req.user.userId;
    const comments = await mypageService.getMyComments(userId);
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user comments', error: error.message });
  }
};

// 내가 좋아요 누른 글 조회
export const getMyLikedPosts = async (req, res) => {
  try {
    const userId = req.user.userId;
    const likedPosts = await mypageService.getMyLikedPosts(userId);
    res.status(200).json(likedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving liked posts', error: error.message });
  }
};
