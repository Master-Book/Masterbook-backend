import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import loginRouter from "./signin/loginRouter.js";
import logoutRouter from "./signin/logoutRouter.js";
import mainPageRouter from "./mainPage/mainPageRouter.js";
import channelPageRouter from "./channelPage/channelPageRouter.js";
import postRouter from "./post/postRouter.js";
import guideRoutes from "./AI/guideRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

// 로그인 및 로그아웃 라우터 설정
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

// 메인 페이지 및 채널 페이지 라우터 설정
app.use("/main", mainPageRouter);
app.use("/channel", channelPageRouter);

// 게시물 라우터 설정
app.use("/post", postRouter);

// 롤 공략 자동 생성 라우터 설정
app.use("/api", guideRoutes); // /api/guide 경로에서 사용

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
