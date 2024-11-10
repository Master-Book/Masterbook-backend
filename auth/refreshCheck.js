
const redisCl = require('../config/redisSet');
const jwt = require('./jwt-util');

const refresh = (req, res) => {
  const refreshToken = req.headers.authorization.split(' ')[1];
  
  // Redis에서 토큰 검증 및 새로운 액세스 토큰 발급
  // (구현 코드 추가 필요)
};

module.exports = { refresh };
            