import { createStore } from "vuex";
import service from "../services/services";
export default createStore({
  state: {
    users: [],
  },
  getters: {
    allUsers(state) {
      return state.users;
    },
  },
  mutations: {
    SET_USERS(state, data) {
      state.users = data;
    },
  },
  actions: {
    GETALLUSERS({ commit }) {
      return service.getAllUsers().then(
        (res) => {
          console.log(res.data.data);
          commit("SET_USERS", res.data.data);
          return Promise.resolve(res);
        },
        (error) => {
          // commit("SET_TOKEN", null);
          // sessionStorage.removeItem('token')
          return Promise.reject(error);
        }
      );
    },
    MARKASPAID({ commit }, id) {
      return service.markAsPaid(id).then(
        (res) => {
          console.log(res.data.data);
          commit("SET_USERS", res.data.data);
          return Promise.resolve(res);
        },
        (error) => {
          // commit("SET_TOKEN", null);
          // sessionStorage.removeItem('token')
          return Promise.reject(error);
        }
      );
    },
  },
  modules: {},
});
