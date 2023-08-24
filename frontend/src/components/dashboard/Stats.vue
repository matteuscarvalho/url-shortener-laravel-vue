<script setup lang="ts">
const props = defineProps({
  links: {
    type: Number,
    default: 0, 
  },
  clicks: {
    type: Number,
    default: 0,
  }
})
</script>

<template>
  <div class="stats">
    <div class="stats-header">
      <div class="stats-header__title">Estatísticas</div>
      <div class="stats-header__description">Veja Tudo</div>
    </div>
    <div class="stats-information">
      <div class="stats-information__stats">
        <div class="stats-information__icon">
          <font-awesome-icon :icon="['fas', 'link']" style="color: #7a96b1" />
        </div>
        <div class="stats-information__information">
          <h3>{{ links }}</h3>
          <p>Links</p>
        </div>
      </div>
      <div class="stats-information__stats">
        <div class="stats-information__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
            fill="#7a96b1"
          >
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M0 192H176V0H160C71.6 0 0 71.6 0 160v32zm0 32V352c0 88.4 71.6 160 160 160h64c88.4 0 160-71.6 160-160V224H192 0zm384-32V160C384 71.6 312.4 0 224 0H208V192H384z"
            />
          </svg>
        </div>
        <div class="stats-information__information">
          <h3>{{ clicks }}</h3>
          <p>Click</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stats {
  width: 100%;
  display: flex;
  flex-direction: column;

  .stats-header {
    display: flex;
    justify-content: space-between;

    &__description {
      color: #7a96b1;
    }

    &__title {
      color: #7a96b1;
      font-weight: 700;
      font-size: 18px;
      letter-spacing: 1px;
    }
  }
  .stats-information {
    display: flex;
    justify-content: center;
    gap: 50px;

    &__stats {
      display: flex;
      gap: 20px;

      svg {
        font-size: 18px;
      }
    }

    &__information {
      display: flex;
      flex-direction: column;

      h3 {
        color: #24313c;
        font-weight: 700;
        font-size: 22px;
      }

      p {
        color: #7a96b1;
        font-weight: 600;
        font-size: 14px;
      }
    }
  }
}
</style>
