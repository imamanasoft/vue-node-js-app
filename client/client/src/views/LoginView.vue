<!-- client/src/views/LoginView.vue -->

<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input type="email" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/useUserStore";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref(null);
const userStore = useUserStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    await userStore.login(email.value, password.value);
    router.push("/profile");
  } catch (err) {
    error.value = err;
  }
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
}

.error {
  color: red;
}
</style>
