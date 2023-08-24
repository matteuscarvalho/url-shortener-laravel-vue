<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { toast, type ToastOptions } from "vue3-toastify";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { handleError } from "@/utils/handleError";

const router = useRouter();

const form = ref({
  email: "",
  password: "",
});

const store = useAuthStore();
const { loading, isLoggedIn } = storeToRefs(store);

if (isLoggedIn.value) {
  router.push("/dashboard");
}

async function handleLogin() {
  try {
    const { email, password } = form.value;

    if (email == "" || password == "") {
      toast.info("Preencha todos os campos");
      return;
    }

    await store.login({
      email,
      password,
    });

    router.push("/dashboard");
  } catch (error: any) {
    handleError(error);
  }
}
</script>

<template>
  <div class="authentication">
    <form @submit.prevent="handleLogin">
      <h1>Login</h1>
      <div class="form-group">
        <div class="form-input">
          <label for="name">Nome</label>
          <input
            v-model="form.email"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            required
          />
        </div>
        <div class="form-input">
          <label for="password">Senha</label>
          <input
            v-model="form.password"
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
            required
          />
        </div>
      </div>
      <button type="submit" class="btn" :disabled="loading">
        {{ loading ? "Carregando..." : "Entrar" }}
      </button>
      <div class="footer-text">
        <p>
          Não tem conta? <router-link to="/register">Cadastrar</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.authentication button {
  width: 100%;
  margin-top: 20px;
}
</style>
