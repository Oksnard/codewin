<template lang="pug">
.block-list(:class="`block-list--${block.data.style || 'unordered'}`")
  .block-list__item(v-for="(item, index) in block.data.items" :key="index")
    .block-list__marker(v-if="block.data.style === 'ordered'") {{ index + 1 }}
    .block-list__marker-dot(v-else)
    .block-list__item-content
      // eslint-disable-next-line vue/no-v-html
      div(v-html="parseHtml(item)")
</template>

<script setup lang="ts">
defineProps<{
  block: {
    id: string
    data: {
      items: string[]
      style?: 'ordered' | 'unordered'
    }
  }
}>()

function parseHtml(html: string): string {
  return html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
}
</script>

<style lang="scss" scoped>
.block-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.block-list__item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  position: relative;
}

.block-list__marker {
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 50%;
  background: $color-accent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 14px;
  line-height: 1;
  margin-top: 0;
}

.block-list__marker-dot {
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  background: $color-accent;
  margin-top: 8px;
}

.block-list__item-content {
  flex: 1;
  font-size: 15px;
  line-height: 1.7;
  color: $color-text-primary;
  opacity: 0.95;
  padding-top: 2px;

  :deep(b) {
    font-weight: 700;
    color: $color-text-primary;
  }

  :deep(br) {
    display: block;
    content: '';
    height: 8px;
  }
}
</style>
