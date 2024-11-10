const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require('express-session');
const loginRouter = require("./signin/loginRouter");
const logoutRouter = require("./signin/logoutRouter");
const mainPageRouter = require("./mainPage/mainPageRouter");
const channelPageRouter = require("./channelPage/channelPageRouter");
const postRouter = require("./post/postRouter");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));

// 로그인 및 로그아웃 라우터 설정
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

// 메인 페이지 및 채널 페이지 라우터 설정
app.use("/api/main", mainPageRouter);
app.use("/api/channel", channelPageRouter);

// 게시물 라우터 설정
app.use("/api/posts", postRouter);

// 전역 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
