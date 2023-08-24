<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/dashboard/Navbar.vue";
</script>
<template>
  <main>
    <Navbar />
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  max-width: 992px;
  width: 100%;
}
</style>
