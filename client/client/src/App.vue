<!-- client/src/App.vue -->

<template>
  <nav
    :class="[
      'navbar navbar-expand-lg',
      isDarkMode ? 'navbar-dark-mode' : 'navbar-light bg-light',
    ]"
  >
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
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          v-model="isDarkMode"
          @change="handleModeChange"
        />
        <label class="form-check-label" for="flexSwitchCheckDefault">{{
          modeLabel
        }}</label>
      </div>
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
// vue
import { computed, ref } from "vue";

// provide
import { provide } from "vue";

// router
import { useRouter } from "vue-router";
const router = useRouter();

// store
import { useUserStore } from "./store/useUserStore";
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);

// data
const isDarkMode = ref(false);

// after init
provide(/* key */ "isDarkMode", /* value */ isDarkMode);

// computed
const modeLabel = computed(() => {
  return isDarkMode.value ? "Light mode" : "Dark mode";
});

const modeBackgroundColor = computed(() => {
  return isDarkMode.value ? "navajowhite" : "#d3d3d3";
});

// methods
const handleModeChange = () => {
  document
    .querySelector("body")
    .classList.add(isDarkMode.value ? "dark" : "light");
  document
    .querySelector("body")
    .classList.remove(isDarkMode.value ? "light" : "dark");
};

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
  background: v-bind("modeBackgroundColor");
  border-radius: 35px;
  padding: 0px 20px;
  line-height: 50px;
}

.form-check-input:checked {
  background-color: #000;
  border-color: #000;
}

.navbar-dark-mode {
  background-color: orange;
}
</style>
