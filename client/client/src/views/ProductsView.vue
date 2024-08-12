<!-- client/src/views/ProductsView.vue -->

<template>
  <div
    v-if="isLoading"
    class="position-absolute top-50 start-50 translate-middle"
  >
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <template v-else>
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
        <ProductCard
          v-for="product in products"
          :key="product._id"
          :cardOptions="product"
        />
      </div>
    </div>
  </template>
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
          <label for="stock" class="form-label">Stock</label>
          <input
            id="stock"
            type="number"
            v-model="newProduct.stock"
            class="form-control"
            min="0"
          />
        </div>
        <div>
          <label for="file">Select an image:</label>
          <input
            class="form-control"
            type="file"
            ref="fileInput"
            id="image"
            name="image"
            accept="image/*"
            @change="uploadImage"
          />
        </div>
      </template>
    </ModalComponent>
  </Teleport>
</template>

<script setup>
// components
import ProductCard from "../components/ProductCard.vue";
import ModalComponent from "../components/ModalComponent.vue";

//vue
import { ref, reactive, onMounted, computed, nextTick } from "vue";

// store
import { useProductStore } from "../store/useProductStore";
const productStore = useProductStore();
const products = computed(() => {
  return productStore.products;
});

// data
const isLoading = ref(true);
const displayModal = ref(false);
const fileInput = ref(null);
const newProduct = reactive({});

// methods
function handleAddProduct() {
  const formData = new FormData();
  formData.append("name", newProduct.name);
  formData.append("description", newProduct.description);
  formData.append("price", newProduct.price);
  formData.append("category", newProduct.category);
  formData.append("stock", newProduct.stock);
  formData.append("image", newProduct.image);

  productStore.createProduct(formData);
  displayModal.value = false;
  newProduct = reactive({});
}

//https://www.mongodb.com/community/forums/t/storing-images-in-mongodb/152599/3
async function uploadImage(e) {
  await nextTick();
  //const file = fileInput.value.files[0];
  const file = e.target.files;
  newProduct.image = file[0];
}

onMounted(async () => {
  await productStore.getAllProducts();

  isLoading.value = false;
});
</script>
<style scoped></style>
