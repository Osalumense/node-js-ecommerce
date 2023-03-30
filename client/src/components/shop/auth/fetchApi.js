import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const isAuthenticate = () =>
  localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : false;

export const isAdmin = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).user.role === 1
    : false;

export const loginReq = async ({ email, password }) => {
  const data = { email, password };
  try {
    let res = await axios.post(`${apiURL}/api/signin`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const signupReq = async ({ firstName, lastName, email, password, cPassword }) => {
  const data = { firstName, lastName, email, password, cPassword };
  try {
    let res = await axios.post(`${apiURL}/api/signup`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const verifyAccountReq = async ({ token }) => {
  const data = { token };
  try {
    let res = await axios.post(`${apiURL}/api/verifyUser`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const resendVerifyMailReq = async ({ email }) => {
  const data = { email };
  try {
    let res = await axios.post(`${apiURL}/api/resendVerifyUser`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
