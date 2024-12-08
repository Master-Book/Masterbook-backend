import db from '../config/databaseSet.js';  // 데이터베이스 연결 모듈

export const createUser = async (userEmail, userPassword, nickname, role = 0) => {
  try {
    const query = 'INSERT INTO users (userId, userEmail, userPassword, role, nickname) VALUES (NULL, ?, ?, ?, ?)';
    const values = [userEmail, userPassword, role, nickname];

    const [result] = await db.execute(query, values);

    return {
      userId: result.insertId,
      userEmail,
      userPassword,  // 비밀번호를 반환하는지 확인 필요
      role,
      nickname
    };
  } catch (error) {
    console.error('회원가입 오류:', error.message);
    console.error('스택 트레이스:', error.stack);
    throw new Error(`회원가입 실패: ${error.message}`);
  }
};

