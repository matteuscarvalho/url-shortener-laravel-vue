<script setup lang="ts">

defineProps({
  isDeleting: Boolean,
});

const emit = defineEmits(["cancel", "delete"]);
</script>
<template>
  <div class="modal-delete">
    <button @click="$emit('cancel')" class="btn">Cancelar</button>
    <button @click="$emit('delete')" class="btn warning" :disabled="isDeleting">
      <font-awesome-icon :icon="['fas', 'trash']" class="icon delete" />
      <span v-if="isDeleting">Excluindo</span>
      <span v-else>Deletar</span>
    </button>
  </div>
</template>

<style scoped>
.modal-delete {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-top: 20px;
}

.btn {
  padding: 0 20px;
}

.btn svg {
  margin-right: 5px;
}

.warning {
  border: solid 2px rgb(231, 27, 27);
  color: rgb(231, 27, 27);
}

.warning:hover {
  background: red;
  color: #fff;
}
</style>
