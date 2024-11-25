import pool from '../../config/databaseSet.js';
import { sign } from '../../auth/jwt-util.js';

const authenticate = async (userEmail, inputPassword) => {
    try {
        // 사용자의 이메일로 데이터베이스에서 사용자 조회
        const [rows] = await pool.query("SELECT * FROM users WHERE userEmail = ?", [userEmail]);

        if (rows.length === 0) {
            console.log(`사용자를 찾을 수 없음: 이메일 ${userEmail}`);
            return { success: false, error: "사용자를 찾을 수 없습니다." };
        }

        const user = rows[0];

        // 디버깅: 조회된 사용자 정보 로그 출력
        console.log(`조회된 사용자: ${JSON.stringify(user)}`);

        // 입력된 비밀번호와 저장된 비밀번호 비교
        if (inputPassword !== user.userPassword) {
            console.log(`비밀번호 불일치: 입력된 비밀번호 ${inputPassword}, 저장된 비밀번호 ${user.userPassword}`);
            return { success: false, error: "비밀번호가 일치하지 않습니다." };
        }

        // 비밀번호가 일치하면 JWT 토큰 생성
        const accessToken = sign({ id: user.userId, role: user.role });
        return {
            success: true,
            Authorization: accessToken
        };
    } catch (err) {
        console.error(`인증 중 오류 발생: ${err.message}`);
        return { success: false, error: "서버 에러가 발생했습니다." };
    }
};

export { authenticate };
