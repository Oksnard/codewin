<template lang="pug">
p.block-paragraph(v-html="block.data.text")
</template>

<script setup lang="ts">
defineProps<{
  block: {
    id: string;
    data: {
      text: string;
    };
  };
}>();
</script>

<style lang="scss" scoped>
.block-paragraph {
  margin: 0;
  font-size: 16px;
  line-height: 1.8;
  color: $color-text-primary;
  opacity: 0.95;
}
</style>
