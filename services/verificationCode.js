const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const generateVerificationCodeExpiration = () => {
  return new Date(Date.now() + 15 * 60 * 1000); //Expires in 15 minutes
};

export { generateVerificationCode, generateVerificationCodeExpiration };
