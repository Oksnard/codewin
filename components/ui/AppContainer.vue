<template lang="pug">
.container(:class="containerClass")
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'lg',
  padding: 'md'
})

const containerClass = computed(() => [
  `container--${props.size}`,
  `container--padding-${props.padding}`
])
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: $container-max;
  margin: 0 auto;
  padding: 0 $gutter;
  
  &--sm {
    max-width: 640px;
  }
  
  &--md {
    max-width: 768px;
  }
  
  &--lg {
    max-width: $container-max;
  }
  
  &--xl {
    max-width: 1400px;
  }
  
  // * Padding variants
  &--padding-none {
    padding: 0;
  }
  
  &--padding-sm {
    padding: 0 $gutter;
  }
  
  &--padding-md {
    padding: 0 $gutter;
  }
  
  &--padding-lg {
    padding: 0 calc($gutter * 2);
  }
  
  @include respond(max-md) {
    padding: 0 calc($gutter / 2);
    
    &--padding-lg {
      padding: 0 $gutter;
    }
  }
}
</style>



