import express from 'express';
import { createPost, updatePost, deletePost, getPost } from './controller/postController.js';
import authenticateToken from '../auth/authMiddleware.js';

const router = express.Router();

// 게시글 작성, 수정, 삭제 시 인증 필요
router.post('/write', authenticateToken, createPost);
router.put('/:postId', authenticateToken, updatePost);
router.delete('/:postId', authenticateToken, deletePost);

// 게시글 조회는 인증 불필요
router.get('/:postId', getPost);

export default router;
