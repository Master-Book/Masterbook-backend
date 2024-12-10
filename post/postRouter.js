import express from 'express';
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  likePost,
  unlikePost,
  getPostLikes,
  getIsAccurate // isAccurate 엔드포인트 추가
} from './controller/postController.js';
import authenticateToken from '../auth/authMiddleware.js';

const router = express.Router();

// 게시글 CRUD
router.post('/write', authenticateToken, createPost);
router.put('/:postId', authenticateToken, updatePost);
router.delete('/:postId', authenticateToken, deletePost);
router.get('/:postId', getPost);

// 좋아요 기능
router.post('/:postId/like', authenticateToken, likePost);
router.delete('/:postId/like', authenticateToken, unlikePost);
router.get('/:postId/likes', getPostLikes);

// isAccurate 값만 반환하는 엔드포인트 추가
router.get('/:postId/isAccurate', getIsAccurate);

export default router;
