import express from 'express';
import { getPostsByGame } from './channelPageController.js';

const router = express.Router();

// 특정 게임의 채널 내 게시물 가져오기
router.get("/:gameId", getPostsByGame);  // gameId를 파라미터로 받음

export default router;
