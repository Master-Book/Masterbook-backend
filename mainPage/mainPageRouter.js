import express from 'express';
import { getLatestPosts, getPopularPosts } from './mainPageController.js';
import authenticateToken from '../auth/authMiddleware.js'; // JWT 인증 미들웨어 추가

const router = express.Router();

// 최신 글 목록 가져오기 (JWT 인증 필요)
router.get('/latest', authenticateToken, getLatestPosts);

// 인기 글 목록 가져오기 (JWT 인증 필요)
router.get('/popular', authenticateToken, getPopularPosts);

export default router;
