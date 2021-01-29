import qs from "qs";
import axios from "axios";

import { TokenManager } from "../../tokenManager/token";

const defaultHeaders = () => ({
  "Content-Type": "application/json;charset=UTF-8",
});
axios.interceptors.request.use((request) => {
  var contentType = request.headers["Content-Type"] || "";
  if (request.data && contentType.includes("application/x-www-form-urlencoded")) {
    request.data = qs.stringify(request.data);
  }
  request.headers = request.headers || defaultHeaders();
  const token = TokenManager.getToken();
  if (token) {
    request.headers["Authorization"] = "Bearer " + token;
  }
  return request;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log("HAVE ERROR", error);
    switch (error.response.status) {
      case 201: {
        window.alert("OK Status");
        break;
      }
      case 401: {
        TokenManager.removeToken();
        window.alert("Unauthorized. Invalid API KEY");
        window.location = "/login";
        break;
      }
      case 400: {
        window.alert("Bad Request");
        break;
      }
      case 500: {
        window.alert("Server Internal Error");
        break;
      }
      default: {
        return Promise.reject(error);
      }
    }
    // return Promise.reject(error);
  },
);

export default axios;
