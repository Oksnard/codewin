<template lang="pug">

.card(
  :class="cardClass"
  :style="cardStyle"
)
  .card__header(v-if="$slots.header || title || image")
    img.card__image(v-if="image" :src="imageUrl" :alt="title")
    .card__title(v-if="title") {{ title }}
    slot(name="header")

  .card__content
    slot

  .card__footer(v-if="$slots.footer")
    slot(name="footer")
</template>

<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  variant?: "default" | "elevated" | "outlined";
  padding?: "none" | "sm" | "md" | "lg";
  title?: string;
  image?: string;
  background?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  padding: "md",
  title: "",
  image: "",
  background: "",
});

const cardClass = computed(() => [
  `card--${props.variant}`,
  `card--padding-${props.padding}`,
]);

const cardStyle = computed(() => {
  const styles: Record<string, string> = {};
  if (props.background) {
    styles.backgroundColor = props.background;
  }
  return styles;
});

const imageUrls = {
  efficiency: "assets/images/advantages/efficiency.png",
  production: "assets/images/advantages/production.png",
  correspondence: "assets/images/advantages/correspondence.png",
  expertise: "assets/images/advantages/expertise.png",
} as const;

const imageUrl = computed(() => {
  if (!props.image) return null;
  if (typeof props.image === 'string' && (props.image.startsWith('http://') || props.image.startsWith('https://'))) {
    return props.image;
  }
  return imageUrls[props.image as keyof typeof imageUrls] || null;
});
</script>

<style lang="scss" scoped>
.card {
  background: $color-card-bg;
  border-radius: 19px;
  overflow: hidden;
  transition: all 0.2s ease;

  &__header {
    max-width: 460px;
    display: flex;
    align-items: center;
    gap: 30px;
    margin-bottom: 16px;
  }

  &__image {
    flex-shrink: 0;
    display: block;
    height: 75px;
    object-fit: contain;
  }

  &__title {
    font-size: 30px;
    font-weight: 600;
    color: $color-text-primary;
    line-height: 1.3;
  }

  &__content {
    color: $color-text-primary;
    line-height: 1.6;
    font-size: 18px;
  }

  &__footer {
    padding: 0 24px 24px 24px;
    margin-top: 16px;
  }

  &--default {
    background: $color-card-bg;
  }

  &--elevated {
    background: $color-card-bg;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &--outlined {
    background: $color-card-bg;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  &--padding-none {
    padding: 0;
  }

  &--padding-sm {
    padding: 16px;
  }

  &--padding-md {
    padding: 24px 32px;
  }

  &--padding-lg {
    padding: 40px 50px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
}
</style>
