<!-- client/src/views/ProfileView.vue -->

<template>
  <div v-if="!isLoading && userInfo" class="profile">
    <h1>User Profile</h1>
    <p><strong> Name:</strong> {{ userInfo.name }}</p>
    <p><strong>Email:</strong> {{ userInfo.email }}</p>
  </div>
  <div v-else>
    <p class="position-absolute top-50 start-50 translate-middle">Loading...</p>
  </div>
</template>

<script setup>
// vue
import { ref, computed, onMounted } from "vue";

// store
import { useUserStore } from "../store/useUserStore";
const userStore = useUserStore();

// data
let isLoading = ref(true);

// computed
const userInfo = computed(() => userStore.userInfo);

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
