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
import signupRouter from "./signup/signupRouter.js";  // 추가된 회원가입 라우터
import patchnoteRouter from "./patchNote/patchNotesRouter.js";  // 추가된 패치노트 라우터
import commentRouter from "./comment/commentRouter.js";
import mypageRouter from "./mypage/mypageRouter.js";
import path from "path";

// ES 모듈에서 __dirname을 사용하려면 아래와 같이 설정
const __dirname = new URL('.', import.meta.url).pathname;

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
    cookie: {
      secure: process.env.NODE_ENV === "production", // https에서만 쿠키를 전송하도록 설정
      httpOnly: true, // 클라이언트에서 쿠키에 접근하지 못하도록 설정
      maxAge: 60 * 60 * 1000, // 쿠키 유효시간 (1시간)
    },
  })
);

// 로그인 및 로그아웃 라우터 설정
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

// 회원가입 라우터 추가
app.use("/signup", signupRouter);  // /signup 경로로 회원가입 처리

// 메인 페이지 및 채널 페이지 라우터 설정
app.use("/main", mainPageRouter);
app.use("/channel", channelPageRouter);
app.use("/mypage", mypageRouter);

// 게시물 라우터 설정
app.use("/post", postRouter);

// 롤 공략 자동 생성 라우터 설정
app.use("/api", guideRoutes); // /api/guide 경로에서 사용

// 패치노트 분석 라우터 설정
app.use("/patchnote", patchnoteRouter); // 패치노트 분석 라우터 추가

// 댓글 라우터 설정
app.use("/comment", commentRouter);

// React 빌드된 파일 서빙
app.use(express.static(path.resolve(__dirname, '../MasterBook-FrontEnd/masterbook/build')));

// React의 index.html 파일을 서빙
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../MasterBook-FrontEnd/masterbook/build', 'index.html'));
});

// 전역 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// 서버 실행
const PORT = process.env.PORT || 15020;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
