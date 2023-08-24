<script setup lang="ts">
import { ref, watch } from "vue";
import Modal from "@/components/Modal.vue";
import ModalForm from "@/components/dashboard/links/ModalForm.vue";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useLinkStore } from "@/stores/linkStore";
import debounce from "lodash/debounce";
import { toast } from "vue3-toastify";
import { handleError } from "@/utils/handleError";
import { useStatsStore } from "@/stores/statsStore";

const router = useRouter();

const modalActive = ref(false);
const search = ref("");

const linkStore = useLinkStore();

const openModalCreate = () => {
  modalActive.value = !modalActive.value;
  linkStore.$state.link = {};
};

const getInitials = (fullName: string) => {
  const allNames = fullName.trim().split(" ");
  const initials = allNames.reduce(
    (acc: string, curr: string, index: number) => {
      if (index === 0 || index === allNames.length - 1) {
        acc = `${acc}${curr.charAt(0).toUpperCase()}`;
      }
      return acc;
    },
    ""
  );
  return initials;
};

const storeUser = useAuthStore();
const { userData, isLoggedIn } = storeToRefs(storeUser);

const storeLink = useLinkStore();
const storeStats = useStatsStore();

const handleLogout = async () => {
  try {
    const id = toast.loading("Deslogando...", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });

    toast.update(id, {
      render: "Deslogado com sucesso",
      autoClose: true,
      closeOnClick: true,
      type: "success",
      isLoading: true,
    });
    toast.done(id);

    await storeUser.logout();

    linkStore.$reset();
    storeLink.$reset();
    storeStats.$reset();

    router.push("/login");
  } catch (error) {
    handleError(error);
  }
};

const cancelModal = () => {
  modalActive.value = !modalActive.value;
};

const handleSearch = debounce(async () => {
  await linkStore.all(search.value);
}, 500);
</script>

<template>
  <div class="navbar">
    <div class="navbar__content">
      <div class="navbar__logo"><a href="/dashboard">Url Shortener</a></div>
      <div class="navbar__search">
        <div class="magnifying-glass">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"
            />
          </svg>
        </div>
        <input
          v-model="search"
          @input="handleSearch"
          type="text"
          name="password"
          id="password"
          placeholder="Pesquisar URL"
          required
        />
        <div class="plus" @click="openModalCreate">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </div>
      </div>
      <div v-if="isLoggedIn" class="navbar__user" @click="handleLogout">
        <img
          :src="`https://eu.ui-avatars.com/api/?name=${getInitials(
            userData.name
          )}&size=40`"
        />
      </div>
    </div>
  </div>
  <Modal v-model="modalActive" @hideModal="modalActive = false">
    <template #title>Cadastrar URL</template>
    <template #body>
      <ModalForm @cancel="cancelModal" :edit="false" />
    </template>
  </Modal>
</template>

<style lang="scss" scoped>
.navbar {
  background: #fff;
  width: 100%;
  position: sticky;
  top: 0px;
  z-index: 20;

  &__content {
    width: 100%;
    padding: 10px 30px;
    min-height: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__logo {
    color: #9a9a9a;
    font-weight: 600;
    font-size: 18px;

    a {
      text-decoration: none;
      color: #7a96b1;
    }
  }

  &__search {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    input {
      width: 50%;
      background: #eff2f6;
      border: none;
      outline: none;
      border: 2px solid #eff2f6;
      border-radius: 8px;
      font-size: 14px;
      padding: 12px 20px 12px 20px;
      transition: all ease 0.1s;
    }

    input::placeholder {
      color: #9a9a9a;
      text-align: center;
    }
    input:focus {
      border: 2px solid #7a96b1;
    }

    .magnifying-glass svg {
      width: 20px;
      height: 20px;
      fill: #7a96b1;
    }
    .plus svg {
      width: 20px;
      height: 20px;
      color: #7a96b1;
      cursor: pointer;
    }
  }

  &__user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    &__content {
      gap: 20px;
      flex-wrap: wrap;
    }

    &__content > div:nth-child(2) {
      order: 3;
      width: 100%;
    }

    &__search {
      width: 100%;

      input {
        width: 100%;
      }
    }
  }
}
</style>
