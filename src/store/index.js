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
    MARK_USER(state, data) {
      //console.log(id, data)
      state.users.splice(data[1], 1, data[0]);
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
    MARKASPAID({ state, commit }, id) {
      const location = state.users.findIndex((user) => user.id === id);
      return service.markAsPaid(id).then(
        (res) => {
          console.log(res.data.data);
          const data = [res.data.data, location];
          commit("MARK_USER", data);
          console.log(data);
          return Promise.resolve(data);
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
