<script setup>
import { ref, computed } from 'vue';
import { useGamesStore } from '~/stores/GamesStore.js';

const router = useRouter();
const route = useRoute();

const GameStore = useGamesStore();

const pageSize = 5;
const totalItems = ref(200);
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize));

const pageNumbers = computed(() => {
  let start = Math.max(1, GameStore.currentPage - 2);
  let end = Math.min(totalPages.value, GameStore.currentPage + 2);
  let pages = [];

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const goToPage = page => {
  if (page >= 1 && page <= totalPages.value) {
    GameStore.currentPage = page;
    localStorage.setItem('currentPage', GameStore.currentPage);
  }
};
</script>

<template>
  <div class="pagination">
    <button @click="goToPage(GameStore.currentPage - 1)" :disabled="GameStore.currentPage === 1">
      Назад
    </button>

    <button
      v-for="page in pageNumbers"
      :key="page"
      :class="{ active: page === GameStore.currentPage }"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>

    <button
      @click="goToPage(GameStore.currentPage + 1)"
      :disabled="GameStore.currentPage === totalPages"
    >
      Далее
    </button>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  gap: 8px;
  margin-top: 20px;

  button {
    padding: 5px 10px;
    cursor: pointer;
    color: #000;

    &.active {
      background-color: var(--background-red);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
}
</style>
