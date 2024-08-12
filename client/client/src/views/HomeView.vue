<!-- client/src/views/HomeView.vue -->

<template>
  <div class="home">
    <h1 class="mb-4">Welcome to FullStack App</h1>
    <div class="d-flex justify-content-center">
      <h3>List of users</h3>
      <button class="btn btn-secondary ms-2" @click="bulkDelete">
        Bulk delete
      </button>
    </div>
    <table class="table m-4">
      <thead>
        <tr>
          <th scope="col">
            <input
              type="checkbox"
              :indeterminate="isIndeterminate"
              v-model="isAllUsersChecked"
              @change="handleSelectAll($event)"
            />
          </th>
          <th scope="col">Actions</th>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user._id"
          :class="{ 'table-secondary': userInfo?._id === user._id }"
        >
          <td>
            <input
              v-if="userInfo && userInfo._id !== user._id"
              type="checkbox"
              :value="user._id"
              v-model="listOfSelectedUsersId"
            />
          </td>
          <td class="d-flex">
            <button
              class="btn btn-primary me-2"
              @click="openUserEditionModal(user)"
            >
              Edit
            </button>
            <button
              v-if="userInfo && userInfo._id !== user._id"
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
// components
import ModalComponent from "../components/ModalComponent.vue";

// vue
import { ref, toRaw, onMounted, watch, computed } from "vue";

// pinia
import { storeToRefs } from "pinia";

// store
import { useUserStore } from "../store/useUserStore";
const userStore = useUserStore();
const { userInfo, users } = storeToRefs(userStore);

// data
let displayModal = ref(false);
let editedUser = {};
let listOfSelectedUsersId = ref([]);
let isAllUsersChecked = ref(false);

// computed
const isIndeterminate = computed(() => {
  return (
    listOfSelectedUsersId.value.length > 0 &&
    listOfSelectedUsersId.value.length < users.value.length - 1
  );
});

//watchers
watch(
  listOfSelectedUsersId,
  () => {
    isAllUsersChecked.value =
      listOfSelectedUsersId.value.length === users.value.length - 1;
  },
  { deep: true }
);

watch(
  users,
  () => {
    console.log("users has been updated");
  },
  { immediate: true }, //we may want to fetch some initial data, and then re-fetch the data whenever relevant state changes.
  { once: true } //the callback to trigger only once when the source changes
);

//methods
function handleSelectAll(e) {
  if (e.target.checked) {
    let that = this;
    // we change only the content of value in order to keep reactivity
    listOfSelectedUsersId.value = users.value.map((user) => user._id);
    listOfSelectedUsersId.value = listOfSelectedUsersId.value.filter(
      (id) => id !== that.userInfo._id
    );

    return;
  }

  // we change only the content of value in order to keep reactivity
  listOfSelectedUsersId.value = [];
}

function openUserEditionModal(user) {
  displayModal.value = true;
  editedUser = { ...user }; // In order to disable reactivity
}

function handleUserEdition() {
  displayModal.value = false;
  userStore.updateUser(editedUser);
}

function deleteUser(id) {
  userStore.deleteUserById(id);
}

function bulkDelete() {
  // we need to prepare param before sending it to BE
  userStore.deleteSelectedUsers(toRaw(listOfSelectedUsersId.value));
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
