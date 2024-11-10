const express = require("express");
const router = express.Router();
const mainPageController = require("./mainPageController");

// 최신 글 목록 가져오기
router.get("/latest", mainPageController.getLatestPosts);

// 인기 글 목록 가져오기
router.get("/popular", mainPageController.getPopularPosts);

module.exports = router;
