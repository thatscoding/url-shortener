import bcrypt from "bcrypt";

export const generateHashPassword = (password) => {
  try {
    const salt = bcrypt.genSalt(10);
    const hashPassword = bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    console.log(error);
  }
};

export const verifyPassword = (password, hashPassword) => {
  try {
    return bcrypt.compare(password, hashPassword);
  } catch (error) {
    console.log(error);
  }
};
