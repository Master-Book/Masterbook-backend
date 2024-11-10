import redisCl from '../../config/redisSet.js';

export const invalidateSession = (req) => {
  const userId = req.user.id; // 인증된 사용자 ID (req.user로 변경)

  // Redis에서 해당 사용자 ID에 대한 리프레시 토큰 삭제 (비동기 방식으로 처리)
  return new Promise((resolve, reject) => {
    redisCl.del(userId.toString(), (err) => {
      if (err) {
        console.error("Redis에서 리프레시 토큰 삭제 중 오류:", err);
        reject(new Error("Redis 삭제 실패"));
      } else {
        console.log("Redis에서 리프레시 토큰 삭제 성공");
        resolve();
      }
    });
  });
};
