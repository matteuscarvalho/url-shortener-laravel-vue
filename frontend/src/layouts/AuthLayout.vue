<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
<template>
  <main>
    <RouterView>
      <slot />
    </RouterView>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}
</style>
