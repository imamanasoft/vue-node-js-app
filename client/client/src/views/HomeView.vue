<!-- client/src/views/HomeView.vue -->

<template>
  <div class="home">
    <h1>Welcome to FullStack App</h1>
    <p>This is the home page.</p>
    <h3>List of users</h3>
    <table class="table m-4">
      <thead>
        <tr>
          <th scope="col">Actions</th>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td class="d-flex">
            <button
              class="btn btn-primary me-2"
              @click="openUserEditionModal(user)"
            >
              Edit
            </button>
            <button
              v-if="userInfo._id !== user._id"
              class="btn btn-danger"
              @click="deleteUser(user._id)"
            >
              Delete
            </button>
          </td>
          <th scope="row">{{ user._id }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>
    <Teleport to="body">
      <ModalComponent
        v-if="displayModal"
        :displayModalFooter="true"
        @closeModal="displayModal = false"
        @saveModal="handleUserEdition"
      >
        <template #modal-title>Edit user</template>
        <template #modal-body>
          <div>
            <label for="name" class="form-label">Name</label>
            <input
              id="name"
              type="text"
              v-model="editedUser.name"
              class="form-control"
            />
          </div>
          <div>
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              type="text"
              v-model="editedUser.email"
              class="form-control"
            />
          </div>
        </template>
      </ModalComponent>
    </Teleport>
  </div>
</template>

<script setup>
import ModalComponent from "../components/ModalComponent.vue";
import { ref, onMounted, toRaw } from "vue";
import { storeToRefs } from "pinia";

import { useUserStore } from "../store/useUserStore";

const userStore = useUserStore();
const { userInfo, users } = storeToRefs(userStore);

let displayModal = ref(false);
let editedUser = {};

function openUserEditionModal(user) {
  displayModal.value = true;
  editedUser = toRaw(user);
}

function handleUserEdition() {
  displayModal.value = false;
  userStore.updateUser(editedUser);
}

function deleteUser(id) {
  userStore.deleteUserById(id);
}

onMounted(async () => {
  await userStore.getAllUsers();
});
</script>
<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}
</style>
