<template>
  <div :class="[{ cardInDarkMode: isDarkMode }, 'card col m-2']">
    <div class="card-body">
      <div class="d-flex justify-content-center mb-4">
        <img class="img-fluid" :src="imageSrc" />
      </div>
      <h5 class="card-title">{{ cardOptions.name }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ cardOptions.category }}
      </h6>
      <p class="card-text">{{ cardOptions.description }}</p>
      <slot name="cardFooter"></slot>
    </div>
  </div>
</template>

<script setup>
// vue
import { computed } from "vue";

// inject
import { inject } from "vue";
const isDarkMode = inject("isDarkMode");

// props
const props = defineProps({
  cardOptions: Object,
});

// computed
const imageSrc = computed(() => {
  return (
    "data:" +
    props.cardOptions.image.contentType +
    ";base64," +
    _imageEncode(props.cardOptions.image.data.data)
  );
});

//methods
//https://github.com/axios/axios/issues/513
function _imageEncode(arrayBuffer) {
  // solution1
  let b64encoded1 = btoa(
    [].reduce.call(
      new Uint8Array(arrayBuffer),
      function (p, c) {
        return p + String.fromCharCode(c);
      },
      ""
    )
  );

  // solution2
  let b64encoded2 = btoa(
    new Uint8Array(arrayBuffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );

  return b64encoded2;
}
</script>

<style scoped>
img {
  object-fit: fill;
  width: 150px;
  height: 150px;
  margin: auto;
}

.cardInDarkMode {
  background-color: orange;
}
</style>
