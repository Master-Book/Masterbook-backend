const express = require("express");
const router = express.Router();
const postController = require("./controller/postController");

// 게시물 작성
router.post("/", postController.createPost);

// 게시물 조회
router.get("/:postId", postController.getPost);

module.exports = router;
