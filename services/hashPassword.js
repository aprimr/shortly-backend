import bcrypt from "bcrypt";

const hashPass = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const decoded = await bcrypt.hash(password, salt);
  return decoded;
};

const verifyPass = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

export { hashPass, verifyPass };
