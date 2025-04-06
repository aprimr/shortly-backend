import jwt from "jsonwebtoken";

const signJwt = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export { signJwt, verifyJwt };
