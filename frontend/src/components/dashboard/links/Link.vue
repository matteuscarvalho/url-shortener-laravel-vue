<script setup lang="ts">
import { ref } from "vue";
import Modal from "@/components/Modal.vue";
import ModalForm from "@/components/dashboard/links/ModalForm.vue";
import ModalDelete from "@/components/dashboard/links/ModalDelete.vue";
import { toast, type ToastOptions } from "vue3-toastify";
import useDeleteItem from "@/composables/useDeleteItem";
import { useLinkStore } from "@/stores/linkStore";
import { useRoute } from "vue-router";

const props = defineProps({
  id: {
    type: Number,
    default: false,
  },
  url: {
    type: String,
    default: false,
  },
  title: {
    type: String,
    default: false,
  },
  code: {
    type: String,
    default: false,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  redirect: {
    type: String,
    default: false,
  },
});

const storeLink = useLinkStore();

const notifyCopy = () => {
  toast.info("Copiado!!", {
    autoClose: 1000,
    position: toast.POSITION.BOTTOM_RIGHT,
    toastStyle: {
      fontSize: "14px",
    },
  } as ToastOptions);
};

const modalEditValue = ref(false);

const copyToClipboard = () => {
  const textArea = document.createElement("textarea");
  textArea.value = props.redirect;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);

  notifyCopy();
};

const editLink = async () => {
  modalEditValue.value = !modalEditValue.value;
  await storeLink.show(props.id);
};

const cancelModal = () => {
  deleteModal.value = !deleteModal.value;
};

const { deleteModal, isDeleting, showDeleteModal, handleDeleteItem } =
  useDeleteItem({
    url: `${import.meta.env.VITE_API_URL}/links/${props.id}`,
  });

const item = { id: props.id };
</script>

<template>
  <div class="link">
    <div class="link-content">
      <div class="link-content__title">
        {{
          props.title != null && props.title != "" ? props.title : "Sem titulo"
        }}
      </div>
      <div class="link-content__link">
        <a :href="props.redirect" target="_blank" id="link-content__link">{{
          props.redirect
        }}</a>
      </div>
    </div>
    <div class="link-stats">
      <span>{{ props.clicks }}</span>
      <font-awesome-icon
        :icon="['fas', 'chart-bar']"
        style="color: #7a96b1; font-size: 18px"
      />
    </div>
    <div class="link-details">
      <font-awesome-icon
        :icon="['fas', 'copy']"
        class="icon copy"
        @click="copyToClipboard"
      />
      <font-awesome-icon
        @click="editLink"
        :icon="['fas', 'edit']"
        class="icon edit"
      />
      <font-awesome-icon
        @click="showDeleteModal(item)"
        :icon="['fas', 'trash']"
        class="icon delete"
      />
    </div>
  </div>
  <Modal v-model="modalEditValue" @hideModal="modalEditValue = false">
    <template #title>Editar URL</template>
    <template #body>
      <ModalForm @cancel="editLink" :edit="true" />
    </template>
  </Modal>
  <Modal v-model="deleteModal" @hideModal="deleteModal = false">
    <template #title>Tem certeza de que deseja excluir este item?</template>
    <template #body>
      <ModalDelete
        @delete="handleDeleteItem"
        :isDeleting="isDeleting"
        @cancel="cancelModal"
      />
    </template>
  </Modal>
</template>

<style lang="scss" scoped>
.link {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
  border-radius: 8px;
  padding: 20px 30px;

  .link-content {
    position: relative;

    &__title {
      color: #324355;
      font-weight: 700;
      font-size: 18px;
      letter-spacing: 1px;
    }

    &__link {
      font-weight: 700;
      font-size: 18px;
      letter-spacing: 1px;
    }

    &__link a {
      color: #72cff9;
      font-size: 14px;
      font-weight: 500;
      text-decoration: none;
    }
  }

  .link-stats {
    margin-right: 20px;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    display: flex;
    gap: 5px;

    span {
      margin-right: 5px;
      color: #7a96b1;
      font-size: 14px;
    }
  }

  .link-details {
    margin: 0 10px;
    display: flex;
    justify-content: space-between;
    gap: 20px;

    .icon {
      font-size: 18px;
      color: #7a96b1;
      cursor: pointer;
    }
    .copy {
      color: #7a96b1;
    }
    .edit {
      color: #7a96b1;
    }
    .delete {
      transition: all ease 0.2s;
    }
    .delete:hover {
      color: red;
    }
  }
}
</style>
