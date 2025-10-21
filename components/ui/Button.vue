<template lang="pug">
button.button(
  :class="buttonClass"
  :disabled="disabled"
  :type="type"
  @click="handleClick"
)
  Icon.header__icon(v-if="icon" :name="icon" :size="iconSize")
  span(v-if="$slots.default")
    slot
  span(v-else) {{ label }}
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  iconSize?: string | number
  label?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  icon: '',
  iconSize: '16',
  label: '',
  disabled: false,
  type: 'button',
  fullWidth: false
})

const emit = defineEmits<{
  click: [event: MouseEvent | TouchEvent]
}>()

const slots = useSlots()

const buttonClass = computed(() => [
  `button--${props.variant}`,
  `button--${props.size}`,
  {
    'button--disabled': props.disabled,
    'button--icon-only': props.icon && !props.label && !slots.default,
    'button--full-width': props.fullWidth
  }
])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 4px;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  &:focus {
    outline: 2px solid $color-header-blue;
    outline-offset: 2px;
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  // * Variants
  &--primary {
    background: $color-header-blue;
    color: $color-white;

    &:hover:not(.button--disabled) {
      background: $color-header-blue-dark;
    }
  }

  &--secondary {
    background: transparent;
    color: $color-white;
    border: 1px solid $color-white;

    &:hover:not(.button--disabled) {
      background: $color-white;
      color: $color-primary;
    }
  }

  &--outline {
    background: transparent;
    color: $color-header-blue;
    border: 1px solid $color-header-blue;

    &:hover:not(.button--disabled) {
      background: $color-header-blue;
      color: $color-white;
    }
  }

  // * Sizes
  &--sm {
    padding: 8px 16px;
    font-size: 14px;
    gap: 6px;
  }

  &--md {
    padding: 12px 24px;
    font-size: 16px;
    gap: 8px;
  }

  &--lg {
    padding: 16px 32px;
    font-size: 18px;
    gap: 10px;
  }

  &--icon-only {
    padding: 12px;

    &.button--sm {
      padding: 8px;
    }

    &.button--lg {
      padding: 16px;
    }
  }

  &--full-width {
    width: 100%;
  }
}
</style>
