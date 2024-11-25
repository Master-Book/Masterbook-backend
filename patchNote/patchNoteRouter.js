import express from 'express';
import { createPostWithPatchNoteCheck } from './controller/patchNoteController.js';
import authenticateToken from '../auth/authMiddleware.js';

const router = express.Router();

// 게시글 작성 시 패치 노트와 유사도 비교
router.post('/write', authenticateToken, createPostWithPatchNoteCheck);

export default router;
