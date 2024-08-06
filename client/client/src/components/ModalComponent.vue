<template>
  <div class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="modal-title">Information</slot>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="$emit('closeModal')"
          ></button>
        </div>
        <div class="modal-body">
          <slot name="modal-body"></slot>
        </div>
        <div v-if="displayModalFooter" class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="$emit('closeModal')"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('saveModal')"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  displayModalFooter: Boolean,
});
</script>

<style scoped>
.modal {
  display: block;
}
</style>
