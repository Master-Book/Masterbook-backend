import express from "express";
import loginController from "./controller/loginController.js";  // default import
import token from '../auth/refreshCheck.js';  // default import

const router = express.Router();

// 로그인 처리
router.post("/", loginController.login);

// 리프레시 토큰 갱신 처리
router.get("/refresh", token.refresh);

export default router;
