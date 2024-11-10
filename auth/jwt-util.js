const jwt = require("jsonwebtoken");

// 환경 변수에서 JWT_SECRET 값을 가져옵니다.
const secretKey = process.env.JWT_SECRET; // 수정된 부분

const sign = (user) => {
    return jwt.sign(user, secretKey, { expiresIn: '1h' }); // 1시간 만료
};

module.exports = { sign };