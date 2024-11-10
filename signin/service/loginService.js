const pool = require('../../config/databaseSet');  
const jwt = require('../../auth/jwt-util');

// 로그인 인증 함수
const authenticate = async (user_email, inputPassword) => {
    try {
        const [rows] = await pool.query("SELECT * FROM user WHERE user_email = ?", [user_email]);

        if (rows.length === 0) {
            console.log("사용자를 찾을 수 없음");
            return { success: false, error: "사용자를 찾을 수 없습니다." };
        }

        const user = rows[0];

        // 평문 비밀번호 비교
        if (user.user_password !== inputPassword) {
            console.log("비밀번호가 일치하지 않음");
            return { success: false, error: "비밀번호가 일치하지 않습니다." };
        }

        // 로그인 성공 시 토큰 생성
        const accessToken = jwt.sign({ id: user.user_id, role: user.role });
        return {
            success: true,
            Authorization: accessToken
        };
    } catch (err) {
        console.error("인증 중 오류 발생:", err);
        return { success: false, error: "서버 에러가 발생했습니다." };
    }
};

module.exports = { authenticate };