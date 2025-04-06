<script setup lang="ts">
import { useGamesStore } from '~/stores/GamesStore';

const GamesStore = useGamesStore();

const visibleTop = ref<boolean>(false);

const { refresh } = await useAsyncData(
  'top-games',
  async () => {
    return await GamesStore.getTopGames();
  },
  {
    server: true,
  }
);

const sendFilter = async () => {
  localStorage.setItem('currentPage', '1');
  await refresh();
  visibleTop.value = false;
};

watch(
  () => GamesStore.ratingGame,
  () => {
    const [min, max] = GamesStore.ratingGame;

    if (min > max) {
      GamesStore.ratingGame = [max, min];
    }
  }
);
</script>

<template>
  <div class="filters-main">
    <div class="justify-center">
      <button @click="visibleTop = true" class="filters-main__btn">Изменить поиск</button>
    </div>

    <Drawer v-model:visible="visibleTop" header="Фильтр" position="top" style="height: auto">
      <form class="filters-main__content" @submit.prevent="sendFilter">
        <div class="filters-main__rating">
          Рейтинг:
          <div>{{ GamesStore.ratingGame[0] }} - {{ GamesStore.ratingGame[1] }}</div>
          <Slider
            v-model="GamesStore.ratingGame"
            range
            :min="1"
            :max="5"
            :step="0.2"
            style="width: 100px"
          />
        </div>
        <button class="filters-main__btn">Применить</button>
      </form>
    </Drawer>
  </div>
</template>

<style lang="scss">
.filters-main {
  &__btn {
    padding: 10px;
    border-radius: 8px;
    border: none;
    background-color: var(--background-red);
    cursor: pointer;

    &:hover {
      background-color: var(--background-red-hover);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    position: relative;
    width: 400px;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}
</style>
