// client/src/store/useUserStore.js

import { defineStore } from "pinia";
import axios from "axios";
axios.defaults.baseURL = "https://8vl4v8-5000.csb.app/";

// add token to headers
if (localStorage.getItem("user")) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    JSON.parse(localStorage.getItem("user"))?.token
  }`;
}

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    users: [],
  }),
  actions: {
    async getUser(id) {
      try {
        const res = await axios.get("/api/users/" + id);
        this.userInfo = res.data;
      } catch (error) {
        throw error.message;
      }
    },
    async getAllUsers() {
      try {
        const res = await axios.get("/api/users");
        this.users = res.data;
      } catch (error) {
        throw error.message;
      }
    },
    async createUser(name, email, password) {
      try {
        const res = await axios.post("/api/users", {
          name,
          email,
          password,
        });

        this.userInfo = res.data;
        localStorage.setItem("user", JSON.stringify(this.userInfo));
      } catch (error) {
        throw error.message;
      }
    },
    async updateUser(user) {
      try {
        await axios.put(`/api/users/${user._id}`, {
          user,
        });

        this.getAllUsers();
      } catch (error) {
        throw error.message;
      }
    },
    async deleteUserById(id) {
      try {
        await axios.delete("/api/users/" + id); //axios.delete(`/api/users/${id}`)

        this.getAllUsers();
      } catch (error) {
        throw error.message;
      }
    },
    async deleteSelectedUsers(ids) {
      try {
        await axios.post("/api/users/delete", { ids });

        this.getAllUsers();
      } catch (error) {
        throw error.message;
      }
    },
    async login(email, password) {
      try {
        const res = await axios.post("/api/users/login", { email, password });
        this.userInfo = res.data;
        localStorage.setItem("user", JSON.stringify(this.userInfo));
      } catch (error) {
        throw error.message;
      }
    },
    logout() {
      this.userInfo = null;
      localStorage.removeItem("user");
    },
  },
});
