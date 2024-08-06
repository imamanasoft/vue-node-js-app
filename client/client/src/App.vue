<!-- client/src/App.vue -->

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link v-if="!userInfo" to="/login">Login</router-link>
    <router-link v-if="!userInfo" to="/register">Register</router-link>
    <router-link to="/profile">Profile</router-link>
  </nav>
  <router-view />
</template>

<script setup>
import { computed } from 'vue'

import { useUserStore } from "./store/useUserStore";

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
</script>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}
</style>
