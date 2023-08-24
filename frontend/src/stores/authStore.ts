import { ref, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/services/api";
import { toast, type ToastOptions } from "vue3-toastify";

interface login {
  email: string;
  password: string;
}

interface registerUser {
  name: string;
  email: string;
  password: string;
}

interface user {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export const useAuthStore = defineStore("auth", {
  state(): {
    userData: user;
    token: string;
    loading: boolean;
    isLoggedIn: boolean;
  } {
    return {
      userData: {
        id: 0,
        name: "",
        email: "",
        password: "",
        created_at: "",
        updated_at: "",
      },
      token: sessionStorage.getItem("token") || "",
      loading: false,
      isLoggedIn: false,
    };
  },
  actions: {
    async login({ email, password }: login) {
      this.loading = true;
      try {
        const { data } = await api.post("/login", {
          email: email,
          password: password,
        });

        if (data.user) {
          this.userData = data.user;
          this.token = `Bearer ${data.access_token}`;

          sessionStorage.setItem("token", this.token);

          this.isLoggedIn = true;
        }
        this.loading = false;
      } catch (error: any) {
        this.loading = false;
        this.isLoggedIn = false;
        this.token = "";
        this.userData = {
          id: 0,
          name: "",
          email: "",
          password: "",
          created_at: "",
          updated_at: "",
        };

       throw error

      }
    },
    async register({
      name,
      email,
      password,
    }: registerUser) {
      this.loading = true;
      try {
        const { data } = await api.post("/register", {
          name: name,
          email: email,
          password: password,
        });

        this.userData = data.user;
        this.token = `${data.token_type} ${data.access_token}`;

        sessionStorage.setItem("token", this.token);

        this.isLoggedIn = true;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.isLoggedIn = false;
        this.token = "";
        this.userData = {
          id: 0,
          name: "",
          email: "",
          password: "",
          created_at: "",
          updated_at: "",
        };

        throw error
      }
    },
    async logout() {
      try {
        await api.post("/logout");

        this.userData = {
          id: 0,
          name: "",
          email: "",
          password: "",
          created_at: "",
          updated_at: "",
        };
        this.token = "";

        sessionStorage.setItem("token", "");

        this.isLoggedIn = false;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.isLoggedIn = false;
        this.token = "";
        this.userData = {
          id: 0,
          name: "",
          email: "",
          password: "",
          created_at: "",
          updated_at: "",
        };

        throw error
      }
    },
  },
  persist: true,
});
