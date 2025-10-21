<template lang="pug">
.container
  nav.breadcrumb(v-if="items.length > 0" :aria-label="ariaLabel")
    ol.breadcrumb__list
      li.breadcrumb__item(
        v-for="(item, index) in items"
        :key="index"
        :class="{ 'breadcrumb__item--current': index === items.length - 1 }"
      )
        NuxtLink.breadcrumb__link(
          v-if="item.href && index !== items.length - 1"
          :to="item.href"
          :aria-current="index === items.length - 1 ? 'page' : undefined"
        ) {{ item.text }}
        span.breadcrumb__text(
          v-else
          :aria-current="index === items.length - 1 ? 'page' : undefined"
        ) {{ item.text }}
        span.breadcrumb__separator(
          v-if="index < items.length - 1"
          :aria-hidden="true"
        )
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  text: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  ariaLabel: 'Навигационная цепочка',
})
</script>

<style lang="scss" scoped>
.breadcrumb {
  padding: 16px 0;
  width: 100%;

  &__list {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 8px;
  }

  &__item {
    display: flex;
    align-items: center;

    &--current {
      .breadcrumb__text {
        color: $color-white;
        font-weight: 600;
      }
    }
  }

  &__link,
  &__text {
    color: $color-white;
    font-family:
      'Gilroy',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.2;
    text-decoration: none;
    transition: color 0.2s ease;
    white-space: nowrap;

    &:hover {
      color: $color-header-blue;
    }
  }

  &__link {
    &:focus {
      outline: 2px solid $color-header-blue;
      outline-offset: 2px;
      border-radius: 2px;
    }
  }

  &__text {
    cursor: default;
  }

  &__separator {
    display: inline-block;
    width: 4px;
    height: 4px;
    background: $color-header-blue;
    border-radius: 50%;
    margin: 0 8px;
    flex-shrink: 0;
  }
}

// * Responsive adjustments
@include respond(md) {
  .breadcrumb {
    padding: 12px 0;

    &__list {
      gap: 6px;
    }

    &__link,
    &__text {
      font-size: 14px;
    }

    &__separator {
      width: 3px;
      height: 3px;
      margin: 0 6px;
    }
  }
}

@include respond(sm) {
  .breadcrumb {
    padding: 8px 0;

    &__list {
      gap: 4px;
      flex-wrap: wrap;
    }

    &__link,
    &__text {
      font-size: 13px;
    }

    &__separator {
      width: 3px;
      height: 3px;
      margin: 0 4px;
    }
  }
}
</style>
