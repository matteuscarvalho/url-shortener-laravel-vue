import { ref, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/services/api";
import { toast, type ToastOptions } from "vue3-toastify";

interface Stats {
  links: number;
  clicks: number;
}

export const useStatsStore = defineStore("stats", {
  state(): {
    stats: Stats;
  } {
    return {
      stats: {
        links: 0,
        clicks: 0,
      },
    };
  },
  actions: {
    async all() {
      try {
        const { data } = await api.get("/stats");

        this.stats = data;
      } catch (error: any) {
        throw error;
      }
    },
  },
});
