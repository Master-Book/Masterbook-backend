import express from 'express';
import authenticateToken from '../auth/authMiddleware.js';  // 인증 미들웨어
import { getPosts, getComments, getLikes } from './mypageController.js';

const router = express.Router();

// 게시글 조회
router.get('/mypage/posts', authenticateToken, getPosts);

// 댓글 조회
router.get('/mypage/comments', authenticateToken, getComments);

// 좋아요 항목 조회
router.get('/mypage/likes', authenticateToken, getLikes);

export default router;
