// patchNotesRouter.js
import express from 'express';
import { analyzePatchNotesController } from './patchNotesController.js';

const router = express.Router();

// 패치노트 분석 요청 라우팅
router.post('/analyze-patch-notes', analyzePatchNotesController);

// default로 내보내기
export default router;
