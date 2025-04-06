const generateAccountVerificationToken = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@$';
  let randomString = '';
  const length = 20;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
}

const generateAccountVerificationExpiryDate = () => {
  return new Date(Date.now() + 15 * 60 * 1000); //Expires in 15 minutes
}

export { generateAccountVerificationToken , generateAccountVerificationExpiryDate }