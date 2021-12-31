import axios from "axios";
const api = axios.create({
  baseURL: "https://cornie-assessment.herokuapp.com/",
  withCredentials: false,
  // headers: ,
});
export default {
  getAllUsers() {
    return api.get("users/Mx57oBwnSWN20s9");
  },
  markAsPaid(id) {
    return api.patch(`/mark-paid/${id}`);
  },
};
