<script setup lang="ts">
import { useLinkStore } from "@/stores/linkStore";
import { useStatsStore } from "@/stores/statsStore";
import { handleError } from "@/utils/handleError";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { toast } from "vue3-toastify";

const props = defineProps({
  edit: {
    type: Boolean,
    default: false,
  },
});

const loading = ref(false);
const edit = ref(false);
const buttonText = ref("Adicionar");
const linkForm = ref({
  url: "",
  title: "",
  code: "",
});

const emit = defineEmits(["cancel"]);

const storeLink = useLinkStore();
const { link } = storeToRefs(storeLink);

if (props.edit) {
  edit.value = true;
  buttonText.value = "Salvar";
} else {
  edit.value = false;
  buttonText.value = "Adicionar";
}

const clearForm = () => {
  linkForm.value.url = "";
  linkForm.value.title = "";
  linkForm.value.code = "";
};

onMounted(() => {
  clearForm();
});

watch(link, () => {
  linkForm.value.url = link.value.url as string;
  linkForm.value.title = link.value.title as string;
  linkForm.value.code = link.value.code as string;
});

const statsStore = useStatsStore();

const handleCreateLink = async () => {
  try {
    loading.value = true;
    if (!props.edit) {
      await storeLink.register({
        url: linkForm.value.url,
        title: linkForm.value.title,
        code: linkForm.value.code,
      });
      emit("cancel");
      toast.success("Link cadastrado com sucesso!");
      clearForm();
      loading.value = false;
    } else {
      if (link) {
        await storeLink.update(
          {
            url: linkForm.value.url,
            title: linkForm.value.title,
            code: linkForm.value.code,
          },
          link.value.id as number
        );
        emit("cancel");
        toast.success("Link atualizado com sucesso!");
        clearForm();
        loading.value = false;
      }
    }

    await storeLink.all();
    await statsStore.all();
  } catch (error: any) {
    handleError(error);
    loading.value = false;
  }
};
</script>
<template>
  <div class="create-url-shortener">
    <form @submit.prevent="handleCreateLink">
      <div class="form-group">
        <div class="form-input">
          <label for="name">URL</label>
          <input
            v-model="linkForm.url"
            type="text"
            name="url"
            id="url"
            placeholder="Exemplo: site.com"
            required
          />
        </div>
        <div class="form-input">
          <label for="name">Titulo (Opcional)</label>
          <input
            v-model="linkForm.title"
            type="text"
            name="title"
            id="title"
            placeholder="Exemplo: Titulo do Link"
          />
        </div>
        <div class="form-input">
          <label for="name"
            >Identificador {{ !edit ? "(Opcional)" : "(Obrigátorio)" }}</label
          >
          <input v-model="linkForm.code" type="text" name="code" id="code" />
        </div>
      </div>
      <button type="submit" class="btn" :disabled="loading">
        {{ loading ? "Carregando..." : buttonText }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.create-url-shortener button {
  width: 100%;
  margin-top: 20px;
}
</style>
