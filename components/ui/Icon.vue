<template lang="pug">
svg.icon(
  :width="size"
  :height="size"
  :class="iconClass"
  viewBox="0 0 24 24"
  fill="currentColor"
)
  path(
    v-if="name === 'location'"
    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
  )

  // * Phone icon
  path(
    v-else-if="name === 'phone'"
    d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
  )

  // * Mail icon
  path(
    v-else-if="name === 'mail'"
    d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
  )

  // * Water drop icon
  path(
    v-else-if="name === 'water-drop'"
    d="M12 2.69l5.66 5.66c1.17 1.17 1.17 3.07 0 4.24L12 18.66l-5.66-5.07c-1.17-1.17-1.17-3.07 0-4.24L12 2.69zM12 1c-.38 0-.76.14-1.06.44L5.29 6.17c-1.95 1.95-1.95 5.12 0 7.07L12 20l6.71-6.76c1.95-1.95 1.95-5.12 0-7.07L13.06 1.44C12.76 1.14 12.38 1 12 1z"
  )

  // * Chevron down icon
  path(
    v-else-if="name === 'chevron-down'"
    d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
  )

  // * Refresh/Callback icon
  path(
    v-else-if="name === 'refresh'"
    d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
  )

  // * Calculator icon
  path(
    v-else-if="name === 'calculator'"
    d="M7 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H7zm0 2v2h2V4H7zm0 4v2h2V8H7zm0 4v2h2v-2H7zm0 4v2h2v-2H7zm4-12v2h2V4h-2zm0 4v2h2V8h-2zm0 4v2h2v-2h-2zm0 4v2h2v-2h-2zm4-12v2h2V4h-2zm0 4v2h2V8h-2zm0 4v2h2v-2h-2zm0 4v2h2v-2h-2z"
  )

  // * Factory icon
  path(
    v-else-if="name === 'factory'"
    d="M12 2L2 7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7L12 2zm0 2.5L20 8v8H4V8l8-3.5zM6 10h2v6H6v-6zm4 0h2v6h-2v-6zm4 0h2v6h-2v-6z"
  )

  // * Star icon
  path(
    v-else-if="name === 'star'"
    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
  )

  // * Blueprint icon
  path(
    v-else-if="name === 'blueprint'"
    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
  )

  // * Arrow icon
  path(
    v-else-if="name === 'arrow'"
    d="M5 12h14M12 5l7 7-7 7"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  )

  // * Default fallback
  circle(
    v-else
    cx="12"
    cy="12"
    r="10"
    stroke="currentColor"
    stroke-width="2"
    fill="none"
  )
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  size?: string | number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: '24',
  class: ''
})

const iconClass = computed(() => props.class)
</script>

<style lang="scss" scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
