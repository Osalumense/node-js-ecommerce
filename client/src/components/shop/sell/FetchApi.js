import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const sellReq = async ({ firstName, lastName, email, password, cPassword }) => {
  const data = { firstName, lastName, email, password, cPassword };
  try {
    let res = await axios.post(`${apiURL}/api/signup`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategory = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/category/all-category`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const saveSellRequest = async ({
  name,
  email,
  whatsAppContact,
  address,
  preferredDevice,
  category,
  isSale,
  isSwap,
  pImages,
  amount,
  deviceName,
  extraNotes,
}) => {
  let formData = new FormData();
  for (const file of pImages) {
    formData.append("pImages", file);
  }
  formData.append("name", name);
  formData.append("email", email);
  formData.append("whatsAppContact", whatsAppContact);
  formData.append("address", address);
  formData.append("preferredDevice", preferredDevice);
  formData.append("category", category);
  formData.append("amount", amount);
  formData.append("extraNotes", extraNotes);
  formData.append("isSwap", isSwap);
  formData.append("isSale", isSale);
  formData.append("deviceName", deviceName);
  
  try {
    let res = await axios.post(`${apiURL}/api/sell/add-request`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}