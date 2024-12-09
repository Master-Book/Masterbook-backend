import express from 'express';
import authenticateToken from '../auth/authMiddleware.js';  // JWT 인증 미들웨어
import { addComment, updateComment, deleteComment, getComments } from './commentController.js';

const router = express.Router();

// 댓글 추가
router.post("/add-comment", authenticateToken, addComment);

// 댓글 수정
router.post("/update-comment", authenticateToken, updateComment);

// 댓글 삭제 (DELETE 메서드로 변경)
router.delete("/comment/:commentId", authenticateToken, deleteComment);

// 게시글의 댓글 조회
router.get("/get-comments/:postId", authenticateToken, getComments);

export default router;
