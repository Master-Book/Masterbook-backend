import express from 'express';
import { analyzePatchNotesController } from '../controller/patchnoteController.js';

const router = express.Router();

// 패치노트 분석 요청
router.post('/analyze', analyzePatchNotesController);

export default router;
