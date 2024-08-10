<template>
  <div class="card col m-2">
    <div class="card-body">
      <img :src="cardOptions.image" class="card-img-top" alt="card image" />
      <p>{{ cardOptions.image }}</p>
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
defineProps({
  cardOptions: Object,
});
</script>
