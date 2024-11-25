import { authenticate } from "../service/loginService.js";

const login = async (req, res) => {
    const { userEmail, inputPassword } = req.body;

    if (!userEmail || !inputPassword) {
        console.log("입력값 부족: userEmail 또는 inputPassword가 누락되었습니다.");
        return res.status(400).json({ error: "이메일과 비밀번호를 모두 입력해주세요." });
    }

    const result = await authenticate(userEmail, inputPassword);

    if (result.success) {
        console.log(`로그인 성공: 이메일 ${userEmail}`);
        res.status(200).json({ Authorization: result.Authorization });
    } else {
        console.log(`로그인 실패: ${result.error}`);
        res.status(400).json({ error: result.error });
    }
};

export default { login };
