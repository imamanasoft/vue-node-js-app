<!-- client/src/views/RegisterView.vue -->

<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <input
        ref="nameInput"
        class="form-control mb-3 mt-4"
        type="text"
        v-model="name"
        placeholder="Name"
        required
        @input="name = name.toLowerCase()"
      />
      <input
        class="form-control mb-3 mt-4"
        type="email"
        v-model="email"
        placeholder="Email"
        required
        @change="email = email.toLowerCase()"
      />
      <input
        class="form-control mb-3 mt-4"
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button class="btn btn-outline-success" type="submit">Register</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
// vue
import { onMounted, ref } from "vue";

// store
import { useUserStore } from "../store/useUserStore";
const userStore = useUserStore();

// router
import { useRouter } from "vue-router";
const router = useRouter();

// data
const nameInput = ref(null);
const name = ref("");
const email = ref("");
const password = ref("");
const error = ref(null);

// methods
const handleRegister = async () => {
  try {
    await userStore.createUser(name.value, email.value, password.value);
    router.push("/profile");
  } catch (err) {
    error.value = err;
  }
};

onMounted(() => {
  nameInput.value.focus();
});
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
