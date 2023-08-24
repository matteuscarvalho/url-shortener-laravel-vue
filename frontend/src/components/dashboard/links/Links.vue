<script setup lang="ts"></script>

<template>
  <div class="links">
    <slot />
  </div>
</template>

<style scoped>
.links {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
</style>
