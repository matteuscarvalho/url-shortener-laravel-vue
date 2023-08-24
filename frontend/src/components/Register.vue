<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "vue3-toastify";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { handleError } from "@/utils/handleError";

const router = useRouter();

const form = ref({
  name: "",
  email: "",
  password: "",
});

const store = useAuthStore();
const { loading, isLoggedIn } = storeToRefs(store);

if (isLoggedIn.value) {
  router.push("/dashboard");
}

async function handleRegister() {
  try {
    const { name, email, password } = form.value;

    if (
      name == "" ||
      email == "" ||
      password == "" 
    ) {
      toast.info("Preencha todos os campos");
      return;
    }

    await store.register({
      name,
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
    <form @submit.prevent="handleRegister">
      <h1>Cadastrar</h1>
      <div class="form-group">
        <div class="form-input">
          <label for="name">Nome</label>
          <input
            v-model="form.name"
            type="text"
            name="name"
            id="name"
            placeholder="Nome"
            required
          />
        </div>
        <div class="form-input">
          <label for="email">Email</label>
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
        {{ loading ? "Carregando..." : "Cadastrar" }}
      </button>
      <div class="footer-text">
        <p>Possui conta? <router-link to="/login">Login</router-link></p>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.authentication {
  button {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
