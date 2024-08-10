<!-- client/src/views/ProductsView.vue -->

<template>
  <div class="d-flex justify-content-center">
    <h2 class="text-center mt-4">Products list:</h2>
    <button
      class="btn btn-outline-success ms-2 m-4"
      @click="displayModal = true"
    >
      Add product
    </button>
  </div>
  <div class="container">
    <div class="row row-cols-4">
      <ProductCard v-for="product in products" :cardOptions="product" />
    </div>
  </div>
  <Teleport to="body">
    <ModalComponent
      v-if="displayModal"
      :displayModalFooter="true"
      @closeModal="displayModal = false"
      @saveModal="handleAddProduct"
    >
      <template #modal-title>Add product</template>
      <template #modal-body>
        <div>
          <label for="name" class="form-label">Product name</label>
          <input
            id="name"
            type="text"
            v-model="newProduct.name"
            class="form-control"
          />
        </div>
        <div>
          <label for="description" class="form-label">Description</label>
          <input
            id="description"
            type="text"
            v-model="newProduct.description"
            class="form-control"
          />
        </div>
        <div>
          <label for="price" class="form-label">Price</label>
          <input
            id="price"
            type="number"
            v-model="newProduct.price"
            class="form-control"
          />
        </div>
        <div>
          <label for="category" class="form-label">Category</label>
          <input
            id="category"
            type="text"
            v-model="newProduct.category"
            class="form-control"
          />
        </div>
        <div>
          <label for="file">Select an image:</label>
          <input
            class="form-control"
            type="file"
            ref="fileInput"
            @change="uploadImage"
          />
        </div>
      </template>
    </ModalComponent>
  </Teleport>
</template>

<script setup>
import ProductCard from "../components/ProductCard.vue";
import ModalComponent from "../components/ModalComponent.vue";
import { ref, reactive, onMounted, watch, computed, nextTick } from "vue";
import { useProductStore } from "../store/useProductStore";

const productStore = useProductStore();
const products = computed(() => {
  return productStore.products;
});
const displayModal = ref(false);
const fileInput = ref(null);
const newProduct = reactive({});

function handleAddProduct() {
  productStore.createProduct({ ...newProduct });
  displayModal.value = false;
}

//https://www.mongodb.com/community/forums/t/storing-images-in-mongodb/152599/3
async function uploadImage() {
  await nextTick();
  const file = fileInput.value.files[0];
  const formData = new FormData();
  formData.append("file", file);
  newProduct.image = formData;

  console.log("newProduct", newProduct);
}

onMounted(async () => {
  await productStore.getAllProducts();

  console.log("products", products);
});
</script>
<style scoped></style>
