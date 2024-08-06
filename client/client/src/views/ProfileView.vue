<!-- client/src/views/ProfileView.vue -->

<template>
  <div v-if="!isLoading" class="profile">
    <h1>User Profile</h1>
    <p><strong>Name:</strong> {{ userInfo.name }}</p>
    <p><strong>Email:</strong> {{ userInfo.email }}</p>
    <button @click="handleLogout">Logout</button>
  </div>
  <div v-else>
    <p class="position-absolute top-50 start-50 translate-middle">Loading...</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "../store/useUserStore";
import { useRouter } from "vue-router";

let isLoading = ref(true);
const userStore = useUserStore();
const router = useRouter();

const userInfo = computed(() => userStore.userInfo);

const handleLogout = () => {
  userStore.logout();
  router.push("/");
};

onMounted(async () => {
  await userStore.getUser(userStore.userInfo._id);
  isLoading.value = false;
});
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
}
</style>
