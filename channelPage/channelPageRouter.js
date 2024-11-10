const express = require("express");
const router = express.Router();
const channelPageController = require("./channelPageController");

// 특정 게임의 채널 내 게시물 가져오기
router.get("/:gameName", channelPageController.getPostsByGame);

module.exports = router;
