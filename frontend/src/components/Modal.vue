<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value as string),
  },
});

const emits = defineEmits(["update:modelValue"]);

const openModalEvent = () => {
  emits("update:modelValue", true);
};

const closeModalEvent = () => {
  emits("update:modelValue", false);
};

const modalSizeClass = computed(() => `modal-${props.size}`);
</script>

<template>
  <transition name="modal-animation">
    <div v-show="modelValue" class="modal">
      <transition name="modal-animation-content">
        <div v-show="modelValue" class="modal-content" :class="modalSizeClass">
          <div class="modal-header">
            <div class="close-modal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                @click="closeModalEvent"
              >
                <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
                />
              </svg>
            </div>
            <div class="modal-header__title">
              <h3>
                <slot name="title"></slot>
              </h3>
            </div>
          </div>

          <div class="modal-body">
            <slot name="body" />
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(122, 150, 177, 0.7);
  z-index: 30;

  .modal-content {
    position: relative;
    max-width: 640px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
    background: #fff;
    border-radius: 8px;
    padding: 10px 30px 20px 30px;
  }

  .modal-sm {
    width: 20%;
  }

  .modal-md {
    width: 40%;
  }

  .modal-lg {
    width: 60%;
  }

  .modal-header {
    .close-modal {
      position: absolute;
      top: -10px;
      right: -10px;
    }

    .modal-header__title h3 {
      font-size: 22px;
      color: #9a9a9a;
      margin: 10px 0;
    }
  }

  .close-modal svg {
    fill: #7a96b1;
    transition: all ease 0.1s;
    cursor: pointer;
    font-size: 32px;
  }
  .close-modal svg:hover {
    fill: #324355;
  }
}

.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-content-enter-active {
  transition: all 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-content-leave-active {
  transition: all 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-content-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-content-leave-to {
  transform: scale(0.8);
}
</style>
