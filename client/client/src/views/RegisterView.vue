<!-- client/src/views/RegisterView.vue -->

<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <input type="text" v-model="name" placeholder="Name" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/useUserStore";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const error = ref(null);
const userStore = useUserStore();
const router = useRouter();

const handleRegister = async () => {
  try {
    await userStore.createUser(name.value, email.value, password.value);
    router.push("/profile");
  } catch (err) {
    error.value = err;
  }
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
}

.error {
  color: red;
}
</style>
