import express from 'express';
import { getMyPosts, getMyComments, getMyLikedPosts } from './mypageController.js';
import authenticateToken from '../auth/authMiddleware.js';

const router = express.Router();

// 마이페이지 관련 라우트 (모두 인증 필요)
router.get('/posts', authenticateToken, getMyPosts);
router.get('/comments', authenticateToken, getMyComments);
router.get('/likes', authenticateToken, getMyLikedPosts);

export default router;
