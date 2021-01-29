import store from "../../store";

export default {
  isOpen: () => {
    store.commit("CHANGE_STATE_SIDEBAR");
  },
};
