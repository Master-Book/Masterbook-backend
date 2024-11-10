import express from 'express';
import { createGuide } from './guideController.js';

const router = express.Router();

// 롤 공략 생성 라우터
router.post("/guide", createGuide);

export default router;
