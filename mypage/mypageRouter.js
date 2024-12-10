import express from 'express';
import authenticateToken from '../auth/authMiddleware.js';  // 인증 미들웨어
import { getPosts, getComments, getLikes, getNickname } from './mypageController.js';

const router = express.Router();

// 게시글 조회
router.get('/posts', authenticateToken, getPosts);

// 댓글 조회
router.get('/comments', authenticateToken, getComments);

// 좋아요 항목 조회
router.get('/likes', authenticateToken, getLikes);


// 사용자 nickname 조회
router.get('/', authenticateToken, getNickname);

export default router;
