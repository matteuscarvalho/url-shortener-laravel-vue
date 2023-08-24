<script setup lang="ts">
import Stats from "@/components/dashboard/Stats.vue";
import Separator from "@/components/Separator.vue";
import Link from "@/components/dashboard/links/Link.vue";
import Links from "@/components/dashboard/links/Links.vue";
import Loading from "@/components/loading.vue";
import { onMounted, reactive, ref } from "vue";
import { useLinkStore } from "@/stores/linkStore";
import { storeToRefs } from "pinia";
import api from "@/services/api";
import { useStatsStore } from "@/stores/statsStore";

const loading = ref(false);
const status = reactive({
  totalLinks: 0,
  totalCliks: 0,
});

const linkStore = useLinkStore();
const { links } = storeToRefs(linkStore);

const statsStore = useStatsStore();
const { stats } = storeToRefs(statsStore);

onMounted(async () => {
  loading.value = true;
  await linkStore.all();
  loading.value = false;
});

onMounted(async () => {
  await statsStore.all();
});

const BASE_URL = window.location.origin;
</script>

<template>
  <div class="dashboard">
    <Stats :links="stats.links" :clicks="stats.clicks" />
    <Separator />
    <div v-if="loading" class="loading-links">
      <loading />
    </div>
    <div v-else>
      <div v-if="links.length != 0">
        <Links>
          <Link
            v-for="{ id, title, url, code, clicks } in links"
            :key="code"
            :id="id"
            :title="title"
            :url="url"
            :code="code"
            :redirect="`${BASE_URL}/${code}`"
            :clicks="clicks"
          />
        </Links>
      </div>
      <div v-else>
        <Links>
          <h2>Nenhum Link cadastrado</h2>
        </Links>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  margin-top: 2em;
  padding: 10px;

  .loading-links {
    width: 100%;
    height: 100%;
    min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
