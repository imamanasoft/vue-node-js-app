<!-- client/src/views/LoginView.vue -->

<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input
        ref="emailInput"
        class="form-control mb-3 mt-4"
        type="email"
        v-model="email"
        placeholder="Email"
        required
        @input="email = email.toLowerCase()"
      />
      <input
        class="form-control mb-3 mt-4"
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button class="btn btn-outline-success" type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
// vue
import { ref, onMounted } from "vue";

// store
import { useUserStore } from "../store/useUserStore";
const userStore = useUserStore();

// router
import { useRouter } from "vue-router";
const router = useRouter();

//data
const emailInput = ref(null);
const email = ref("");
const password = ref("");
const error = ref(null);

// methods
const handleLogin = async () => {
  try {
    await userStore.login(email.value, password.value);
    router.push("/profile");
  } catch (err) {
    error.value = err;
  }
};

onMounted(() => {
  emailInput.value.focus();
});
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
