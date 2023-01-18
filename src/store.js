import { createStore } from "vuex";

const store = createStore({
  state: {
    host: "https://baku.rdivas.in/admin/",
    // host: "http://localhost:6969/admin/",
    logHost: "https://baku.rdivas.in/",
    token: null,
    authError: false,
    authMessage: null,
    auth: false,
  },
  actions: {
    async auth(context, token) {
      const auth = await fetch(`${context.getters.host}user/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const authResponse = await auth.json();
      if (authResponse.status === "success") {
        context.commit("setAuth", true);
        context.commit("setAuthError", { message: null, error: false });
        context.commit("setToken", token);
        return;
      } else if (authResponse.status !== "success") {
        console.log(authResponse);
        const authErr = {
          message: "Unauthorized",
          error: true,
        };
        alert("Invalid Credentials")
        context.commit("setAuthError", authErr);
        return context.dispatch("logout");
      }
    },
    async autoLogin(context) {
      const token = localStorage.getItem("token");
      if (token) {
        context.dispatch("auth", token);
      } else return;
    },
    async logout(context) {
      localStorage.removeItem("token");
      context.commit("setAuth", false);
    },
  },
  mutations: {
    setAuthError(state, payload) {
      state.authError = payload.error;
      state.authMessage = payload.message;
    },
    setAuth(state, payload) {
      state.auth = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
  },
  getters: {
    logHost: (state) => state.logHost,
    host: (state) => state.host,
    isAuth: (state) => state.auth,
  },
});

export default store;
