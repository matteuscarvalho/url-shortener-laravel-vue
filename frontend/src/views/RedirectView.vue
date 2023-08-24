<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import api from "@/services/api";
import { handleError } from "@/utils/handleError";
import { onBeforeUnmount, onMounted, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

import loading from "@/components/loading.vue";
const route = useRoute();

const url = ref("");
const secondsRemaining = ref(0);
let countdownInterval = 0;

const updateCountdown = async () => {
  if (secondsRemaining.value > 0) {
    secondsRemaining.value--;
  } else if (secondsRemaining.value == 0) {
    clearInterval(countdownInterval);

    const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,}(\/\S*)?$/;

    if (urlPattern.test(url.value) && url.value != "") {
      window.location.href = url.value;
    }
  }
};

onMounted(() => {
  countdownInterval = setInterval(updateCountdown, 1000);
});

onBeforeUnmount(() => {
  clearInterval(countdownInterval);
});

onMounted(async () => {
  try {
    const code = route.params.code;

    if (code == "dashboard") return;

    const { data } = await api.get(`/redirect/${route.params.code}`);

    url.value = data.url;
  } catch (error) {
    url.value = "";
    handleError(error);
  }
});
</script>

<template>
  <AppLayout>
    <div class="error-content">
      <loading />
      <!-- {{ secondsRemaining == 0 ? "Redirecionando..." : secondsRemaining }} -->
    </div>
  </AppLayout>
</template>

<style lang="scss">
.error-content {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #9a9a9a;
  font-weight: 600;
  font-size: 28px;

  text-decoration: none;
  color: #7a96b1;
}
</style>
