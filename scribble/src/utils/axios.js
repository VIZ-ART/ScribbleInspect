import axios from "axios";

export const customFetch = axios.create({
  // baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
  baseURL: "http://127.0.0.1:9090/api",
});

// exports.customFetch = customFetch;
// exports.setHeader = setHeader;
