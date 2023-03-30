import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getAllRequests = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/sell/all-requests`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editRequest = async (saleRequest) => {
    try {
        let res = await axios.post(`${apiURL}/api/sell/update-request`, saleRequest);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteRequest = async (sellId) => {
  if(window.confirm('Are you sure you want to delete request? Action can\'t be undone')) {
    try {
      let res = await axios.post(`${apiURL}/api/sell/delete-request`, { sellId });
      window.location.reload();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  
};