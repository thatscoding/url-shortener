import axios from "axios";

export const RegisterUrl = async (data) => {
  try {
    return await axios.post("/registerUrl", data);
  } catch (err) {
    console.log(err);
  }
};

export const redirectTo = async () => {
  try {
    return await axios.get("/redirectTo");
  } catch (err) {
    console.log(err);
  }
};

export const urlAnalytics = async () => {
  try {
    return await axios.get("/urlAnalytics");
  } catch (err) {
    console.log(err);
  }
};
