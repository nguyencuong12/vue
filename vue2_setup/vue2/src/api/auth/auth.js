import axios from "../ajax/ajax";
const URL = "/api/auth";
export const AuthAPI = {
  login: (formData) => {
    console.log("LOGIN API", formData);
    const options = {
      url: URL + "/login",
      method: "POST",
      data: formData,
    };
    return axios(options);
  },
  signup: () => {},
  logout: () => {},
};
