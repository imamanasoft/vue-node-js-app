// client/src/store/useProductStore.js

import { defineStore } from "pinia";
import axios from "axios";
axios.defaults.baseURL = "https://hcfn53-8000.csb.app/"; // URL du serveur Node.js

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
        const res = await axios.post("/api/products", product, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.productInfo = res.data;
        this.getAllProducts();
      } catch (error) {
        throw error.message;
      }
    },
    async getAllProducts(page, limit) {
      try {
        const res = await axios.get("/api/products", {
          params: { page, limit }, // req.query
        });

        this.products = [...this.products, ...res.data.data];

        return res;
      } catch (error) {
        throw error.message;
      }
    },
  },
});
