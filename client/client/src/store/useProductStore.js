// client/src/store/useProductStore.js

import { defineStore } from "pinia";
import axios from "axios";
axios.defaults.baseURL = "https://8vl4v8-5000.csb.app/";

// add token to headers
if (localStorage.getItem("user")) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    JSON.parse(localStorage.getItem("user"))?.token
  }`;
}

export const useProductStore = defineStore("product", {
  state: () => ({
    productInfo: {},
    products: [],
  }),
  actions: {
    async createProduct(product) {
      try {
        const res = await axios.post("/api/products", {
          product,
        });
        this.productInfo = res.data;
        this.getAllProducts();
      } catch (error) {
        throw error.message;
      }
    },
    async getAllProducts() {
      try {
        const res = await axios.get("/api/products");
        this.products = res.data;
      } catch (error) {
        throw error.message;
      }
    },
  },
});
