import express from 'express';
import authenticateToken from '../auth/authMiddleware.js';  // JWT 인증 미들웨어
import { 
    upvoteGuide, 
    downvoteGuide, 
    cancelUpvoteGuide, 
    cancelDownvoteGuide, 
    updateGuideRating 
} from './guideController.js';  // 새로운 컨트롤러 함수들 추가

const router = express.Router();

// 유익함 올리기
router.post("/upvote-guide", authenticateToken, upvoteGuide);

// 유익함 내리기
router.post("/cancel-upvote-guide", authenticateToken, cancelUpvoteGuide);

// 유익하지 않음 올리기
router.post("/downvote-guide", authenticateToken, downvoteGuide);

// 유익하지 않음 내리기
router.post("/cancel-downvote-guide", authenticateToken, cancelDownvoteGuide);

// 각 평가가 끝난 후, guideRating을 업데이트하는 라우터
router.post("/update-guide-rating", authenticateToken, updateGuideRating);

export default router;
