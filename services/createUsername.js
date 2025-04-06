import { generateUsername } from "unique-username-generator";
const cretaeUsername = () => {
  const username = generateUsername("-", 0, 15);
  return username;
};

export default cretaeUsername;
