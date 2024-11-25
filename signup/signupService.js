import db from '../config/databaseSet.js';  // 데이터베이스 연결 모듈

export const createUser = async (userEmail, userPassword, nickname, role) => {
  try {
    const query = 'INSERT INTO users (userEmail, userPassword, nickname, role) VALUES (?, ?, ?, ?)';
    const values = [userEmail, userPassword, nickname, role];
    
    const [result] = await db.execute(query, values);

    // 새로 생성된 사용자 정보 반환
    return {
      userId: result.insertId,
      userEmail,
      nickname,
      role
    };
  } catch (error) {
    throw new Error('회원가입 실패');
  }
};
