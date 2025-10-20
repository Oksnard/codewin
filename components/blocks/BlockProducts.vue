<template lang="pug">
.block-products
  //a.block-products__link(
  //  v-if="block.data.link"
  //  :href="block.data.link"
  //  target="_blank"
  //  rel="noopener noreferrer"
  //)
    Icon.block-products__icon(name="arrow" size="16")
    .block-products__text Подробнее об оборудовании
</template>

<script setup lang="ts">
defineProps<{
  block: {
    id: string;
    data: {
      link: string;
    };
  };
}>();
</script>

<style lang="scss" scoped>
.block-products {
  display: flex;
  align-items: center;
  margin: 16px 0;
}

.block-products__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 6px;
  background: $color-accent;
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: $color-accent;
    transform: translateX(4px);
  }
}

.block-products__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

.block-products__text {
  white-space: nowrap;
}
</style>
