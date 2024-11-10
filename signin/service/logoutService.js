
const redisCl = require('../../config/redisSet');

function invalidateSession(req) {
  const userId = req.user.id;

  redisCl.del(userId.toString(), (err) => {
    if (err) {
      console.error("Redis에서 리프레시 토큰 삭제 중 오류:", err);
    } else {
      console.log("Redis에서 리프레시 토큰 삭제 성공");
    }
  });
}

module.exports = { invalidateSession };
                