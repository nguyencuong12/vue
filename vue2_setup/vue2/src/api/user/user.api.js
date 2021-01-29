import axios from "../ajax/ajax";
const URL = "/api/users";

export const UserAPI = {
  getUserInfo: () => {
    const options = {
      method: "GET",
      url: URL,
    };
    return axios(options);
  },
};
