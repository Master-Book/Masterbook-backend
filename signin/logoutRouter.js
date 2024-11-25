import express from 'express';
import { logout } from './controller/logoutController.js'; // .js 확장자 추가


const router = express.Router();

// 로그아웃 처리
router.post("/", logout);

export default router;
