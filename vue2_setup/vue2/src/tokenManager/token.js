export const TokenManager = {
  getToken: () => {
    return localStorage.getItem("token");
  },
  setToken: (tokenArgument) => {
    localStorage.setItem("token", tokenArgument);
  },
  removeToken: () => {
    localStorage.removeItem("token");
  },
};
