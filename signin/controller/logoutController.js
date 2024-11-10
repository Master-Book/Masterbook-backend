import { invalidateSession } from '../service/logoutService.js';

export const logout = async (req, res) => {
  try {
    // 세션 무효화
    await invalidateSession(req); // 비동기적으로 처리

    // 클라이언트에게 로그아웃 성공 메시지 전송
    res.status(200).send("로그아웃이 성공적으로 처리되었습니다.");
  } catch (error) {
    console.error("로그아웃 처리 중 오류 발생:", error);
    res.status(500).send("로그아웃 처리 중 오류가 발생했습니다.");
  }
};
