import { ref, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/services/api";
import { toast, type ToastOptions } from "vue3-toastify";

interface link {
  id?: number;
  title?: string;
  url?: string;
  code?: string;
  clicks?: number;
  users_id?: number;
  created_at?: string;
  updated_at?: string;
}

export const useLinkStore = defineStore("link", {
  state(): {
    link: link;
    links: link[];
  } {
    return {
      link: {},
      links: [],
    };
  },
  actions: {
    async all(search?: string) {
      try {
        const { data } = await api.get("/links", {
          params: {
            search,
          }
        });

        this.links = data.data;
      } catch (error: any) {
        throw error;
      }
    },
    async register({ url, title, code }: link) {
      try {
        await api.post("/links", {
          title,
          url,
          code,
        });
      } catch (error: any) {
        throw error;
      }
    },
    async show(id: number) {
      try {
        const { data } = await api.get(`/links/${id}`);

        this.link = {};
        this.link = data.data;
      } catch (error) {
        throw error;
      }
    },
    async update({ url, title, code }: link, id: number) {
      try {
        await api.put(`/links/${id}`, {
          title,
          url,
          code,
        });

        this.link = {};
      } catch (error) {
        throw error;
      }
    },
    async delete(id: number) {
      try {
        await api.delete(`/links/${id}`);
      } catch (error) {
        throw error;
      }
    },
  },
});
