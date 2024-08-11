import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = () => {
  const token = uuidv4();
  const tokenExpiry = new Date();
  tokenExpiry.setHours(tokenExpiry.getHours() + 1);

  return { token, tokenExpiry };
};
