<template lang="pug">
component(
  :is="`h${block.data.level || 4}`"
  :class="['block-header', `block-header--level-${block.data.level || 4}`]"
) {{ block.data.text }}
</template>

<script setup lang="ts">
defineProps<{
  block: {
    id: string
    data: {
      text: string
      level?: number
    }
  }
}>()
</script>

<style lang="scss" scoped>
.block-header {
  margin: 0;
  font-weight: 700;
  color: $color-text-primary;

  &--level-3 {
    font-size: 24px;
    line-height: 1.3;
    margin-top: 16px;
    margin-bottom: 12px;
  }

  &--level-4 {
    font-size: 16px;
    line-height: 1.4;
    margin-top: 12px;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &--level-5 {
    font-size: 14px;
    line-height: 1.4;
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>
