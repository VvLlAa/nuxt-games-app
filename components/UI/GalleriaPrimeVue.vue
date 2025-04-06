<script setup lang="ts">
import Galleria from 'primevue/galleria';
import type { ShortScreenshotsType } from '~/type/types';
const props = defineProps<{
  game: ShortScreenshotsType[];
}>();
</script>

<template>
  <div class="galleria">
    <Galleria
      :value="props.game"
      :numVisible="5"
      :circular="true"
      containerStyle="max-width: 640px"
      :showItemNavigators="true"
    >
      <template #item="slotProps">
        <NuxtImg :src="slotProps.item.image" :alt="slotProps.item.alt" class="galleria-image" />
      </template>
      <template #thumbnail="slotProps">
        <NuxtImg :src="slotProps.item.image" :alt="slotProps.item.alt" class="galleria-thumbnail" />
      </template>
    </Galleria>
  </div>
</template>

<style lang="scss">
.galleria {
  .p-galleria-items {
    height: 100%;
  }

  .p-galleria-thumbnail {
    img {
      object-fit: cover;
      height: 80px;
      width: 100px;
    }
  }
}
</style>
