import pool from '../../config/databaseSet.js';
import { sign } from '../../auth/jwt-util.js';

const authenticate = async (userEmail, inputPassword) => {
    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE userEmail = ?", [userEmail]);

        if (rows.length === 0) {
            console.log("사용자를 찾을 수 없음");
            return { success: false, error: "사용자를 찾을 수 없습니다." };
        }

        const user = rows[0];


        // 로그인 성공 시 토큰 생성
        const accessToken = sign({ id: user.userId, role: user.role });
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
