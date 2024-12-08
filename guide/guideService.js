import db from '../config/databaseSet.js';

// 유익함 올리기 또는 내리기
export const rateGuideFeedback = async (postId, userId, feedbackType, isCancel = false) => {
  const column = feedbackType === 'useful' ? 'isUseful' : 'isNotUseful';
  const value = isCancel ? -1 : 1;  // 취소시 -1, 올리기 시 1

  try {
    // 피드백 추가 또는 취소
    await db.execute(`
      INSERT INTO guide_feedbacks (postId, userId, feedbackType) 
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE feedbackType = VALUES(feedbackType)
    `, [postId, userId, feedbackType]);

    // 해당 게시글의 isUseful 또는 isNotUseful 값을 업데이트
    await db.execute(`
      UPDATE posts
      SET ${column} = ${column} + ?
      WHERE postId = ?
    `, [value, postId]);

    // guideRating 값을 계산하여 업데이트
    await updateGuideRating(postId);

  } catch (error) {
    console.error('피드백 처리 오류:', error);
    throw error;
  }
};

// guideRating 업데이트 함수
const updateGuideRating = async (postId) => {
  try {
    // 해당 게시글의 isUseful과 isNotUseful 값을 가져옴
    const [post] = await db.execute(`
      SELECT isUseful, isNotUseful
      FROM posts
      WHERE postId = ?
    `, [postId]);

    // isUseful이 isNotUseful보다 많으면 guideRating을 0으로 설정, 반대면 1로 설정
    const guideRating = post.isUseful > post.isNotUseful ? 0 : 1;

    // guideRating 값 업데이트
    await db.execute(`
      UPDATE posts
      SET guideRating = ?
      WHERE postId = ?
    `, [guideRating, postId]);

  } catch (error) {
    console.error('guideRating 업데이트 오류:', error);
    throw error;
  }
};
