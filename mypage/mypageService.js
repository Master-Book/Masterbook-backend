import db from '../config/databaseSet.js';

// 사용자 ID로 닉네임 가져오기
export const getUserNickname = async (userId) => {
  try {
      const result = await db.query('SELECT nickname FROM users WHERE userId = ?', [userId]);
      console.log('Query result:', result);  // 쿼리 결과 확인
      if (result[0] && result[0][0] && result[0][0].nickname) {
          return result[0][0].nickname;  // nickname을 반환
      }
      return null;  // 닉네임이 없다면 null 반환
  } catch (error) {
      console.error('Error fetching nickname from database:', error);
      throw new Error('Error fetching nickname from database');
  }
};


// 게시글 조회
export const getPostsByUserId = async (userId) => {
  try {
      // 쿼리 실행
      const result = await db.query('SELECT * FROM posts WHERE authorId = ?', [userId]);
      
      // 결과가 정상적으로 반환되었는지 확인
      console.log('Query result:', result);

      // 반환되는 결과에서 첫 번째 요소를 반환 (배열 배열일 경우)
      return result[0];
  } catch (error) {
      console.error('Error fetching posts from database:', error);  // 쿼리 오류 확인
      throw new Error('Error fetching posts from database');
  }
};


// 댓글 조회
export const getCommentsByUserId = async (userId) => {
    try {
        const comments = await db.query('SELECT * FROM comments WHERE userId = ?', [userId]);
        return comments;
    } catch (error) {
        throw new Error('Error fetching comments from database');
    }
};

// 좋아요 항목 조회
export const getLikesByUserId = async (userId) => {
    try {
        const likes = await db.query('SELECT * FROM likes WHERE userId = ?', [userId]);
        return likes;
    } catch (error) {
        throw new Error('Error fetching likes from database');
    }
};
