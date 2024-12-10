import jwt from 'jsonwebtoken';

// 인증 미들웨어
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>에서 token 추출
    if (!token) return res.status(401).json({ message: 'Access Token Required' });  // 토큰이 없으면 401

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: 'Token has expired' }); // 만료된 토큰 처리
            }
            return res.status(403).json({ message: 'Invalid Token' });  // 그 외 유효하지 않은 토큰 처리
        }

        req.user = user;  // 유효한 토큰일 경우, user 정보를 req.user에 저장
        next();  // 다음 미들웨어나 라우트로 이동
    });
};

export default authenticateToken;
