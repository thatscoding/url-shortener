import axios from "axios";

export const RegisterUser = async (data) => {
  try {
    return await axios.post("/user/register", data);
  } catch (error) {
    console.log(error);
  }
};

export const LoginUser = async (data) => {
  try {
    return await axios.post("/user/login", data);
  } catch (error) {
    console.log(error);
  }
};

export const userProfile = async () => {
  try {
    return await axios.get("/user/profile");
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async () => {
  try {
    return await axios.get("/user/logout");
  } catch (error) {
    console.log(error);
  }
};
