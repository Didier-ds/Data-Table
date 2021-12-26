import axios from "axios";
// import authHeader from "./auth_header";
// import apiClient from "./apiClient";

export default function apiClient() {
  const api = axios.create({
    baseURL: "https://cornie-assessment.herokuapp.com/",
    withCredentials: false,
    // headers: ,
  });
  return api;
}
