import pool from '../../config/databaseSet.js';  
import { sign } from '../../auth/jwt-util.js';  // named import로 수정


// 로그인 인증 함수
const authenticate = async (userEmail, inputPassword) => {
    try {
        // 'users' 테이블에서 이메일을 기준으로 유저 찾기
        const [rows] = await pool.query("SELECT * FROM users WHERE userEmail = ?", [userEmail]);

        if (rows.length === 0) {
            console.log("사용자를 찾을 수 없음");
            return { success: false, error: "사용자를 찾을 수 없습니다." };
        }

        const users = rows[0];  // 첫 번째 사용자 데이터


        // 로그인 성공 시 토큰 생성
        const accessToken = sign({ id: users.userId, role: users.role });  // sign 함수 사용
        return {
            success: true,
            Authorization: accessToken
        };
    } catch (err) {
        console.error("인증 중 오류 발생:", err);
        return { success: false, error: "서버 에러가 발생했습니다." };
    }
};

export { authenticate };
