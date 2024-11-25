import { createUser } from './signupService.js';

export const signup = async (req, res) => {
  try {
    const { userEmail, userPassword, nickname, role } = req.body;

    if (!userEmail || !userPassword || !nickname) {
      return res.status(400).json({ message: "필수 항목이 누락되었습니다." });
    }

    // 서비스에서 회원가입 처리
    const newUser = await createUser(userEmail, userPassword, nickname, role);

    return res.status(201).json({ message: '회원가입 성공', user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 오류', error: error.message });
  }
};
