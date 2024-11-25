import bcrypt from 'bcrypt';

// 비밀번호와 해시된 비밀번호 비교
const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

export { comparePassword };
