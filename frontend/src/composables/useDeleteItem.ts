import api from "@/services/api";
import { useLinkStore } from "@/stores/linkStore";
import { useStatsStore } from "@/stores/statsStore";
import { handleError } from "@/utils/handleError";
import { ref } from "vue";
import { toast, type ToastOptions } from "vue3-toastify";

interface Item {
  id: number;
}

export default function (params: { url: any }) {
  const { url } = params;

  const deleteModal = ref(false);
  const itemToDelete = ref<Item | {}>({ id: 0 });
  const isDeleting = ref(false);

  function showDeleteModal(item: Item) {
    deleteModal.value = true;
    itemToDelete.value = item;
  }

  async function handleDeleteItem() {
    isDeleting.value = true;

    const storeLink = useLinkStore();
    const storeStats = useStatsStore();

    try {
      await api.delete(url);

      isDeleting.value = false;
      deleteModal.value = false;

      await Promise.all([storeLink.all(), storeStats.all()]);

      toast.success("Deletado com sucesso!", {
        autoClose: 1000,
        position: toast.POSITION.BOTTOM_RIGHT,
        toastStyle: {
          fontSize: "14px",
        },
      } as ToastOptions);
      
    } catch (error) {
      handleError(error);
    }
  }

  return {
    deleteModal,
    itemToDelete,
    isDeleting,
    showDeleteModal,
    handleDeleteItem,
  };
}
