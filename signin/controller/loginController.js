import { authenticate } from "../service/loginService.js";

const login = async (req, res) => {
    const { userEmail, inputPassword } = req.body;

    const result = await authenticate(userEmail, inputPassword);

    if (result.success) {
        res.status(200).json({ Authorization: result.Authorization });
    } else {
        res.status(400).json({ error: result.error });
    }
};

// default export로 변경
export default { login };
