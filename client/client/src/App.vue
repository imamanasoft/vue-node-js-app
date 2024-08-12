<!-- client/src/App.vue -->

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <template v-if="userInfo">
      <router-link activeClass="activeLink" class="navbar-brand" to="/"
        >Home</router-link
      >
      <router-link activeClass="activeLink" class="navbar-brand" to="/products"
        >Products</router-link
      >
      <router-link activeClass="activeLink" class="navbar-brand" to="/profile"
        >Profile</router-link
      >
      <button class="btn btn-outline-danger" @click="handleLogout">
        Logout
      </button>
    </template>
    <template v-else>
      <router-link
        activeClass="activeLink"
        class="navbar-brand"
        v-if="!userInfo"
        to="/login"
        >Login
      </router-link>
      <router-link
        activeClass="activeLink"
        class="navbar-brand"
        v-if="!userInfo"
        to="/register"
        >Register</router-link
      >
    </template>
  </nav>
  <router-view />
</template>

<script setup>
import { computed } from "vue";

// router
import { useRouter } from "vue-router";
const router = useRouter();

// store
import { useUserStore } from "./store/useUserStore";
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);

// methods
const handleLogout = () => {
  userStore.logout();
  router.push("/login");
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.activeLink {
  background: #d3d3d3;
  border-radius: 35px;
  padding: 0px 20px;
  line-height: 50px;
}
</style>
