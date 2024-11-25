import express from 'express';
import { signup } from './signupController.js';

const router = express.Router();

// 회원가입 엔드포인트
router.post('/', signup);

export default router;
