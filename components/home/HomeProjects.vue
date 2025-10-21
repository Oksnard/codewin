<template lang="pug">
.projects
  .container
    h2.projects__title Проекты
    ul.projects__grid
      li.projects__item(v-for="p in projects" :key="p.id")
        NuxtLink.projects__card(:to="`/projects/${p.slug}`")
          img.projects__cover(:src="buildImage(p.cover)" :alt="p.title")
          .projects__body
            h3.projects__name {{ p.title }}
            p.projects__desc(v-if="p.shortDescription") {{ p.shortDescription }}
</template>

<script setup lang="ts">
import type { ApiProjectCard } from '@/types/api'
import { buildImage } from '@/utils/api'

defineProps<{ projects: ApiProjectCard[] }>()
</script>

<style lang="scss" scoped>
.projects {
  background: $color-primary;
  color: $color-text-primary;
  padding: 80px 0;

  &__title {
    font-size: 36px;
    font-weight: 700;
    color: $color-text-primary;
    margin: 0 0 60px 0;

    @include respond(max-md) {
      font-size: 28px;
      margin-bottom: 40px;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;

    @include respond(max-lg) {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    @include respond(max-md) {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }

  &__card {
    background: $color-card-bg;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
    }
  }

  &__cover {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  &__body {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex-grow: 1;
  }

  &__name {
    font-size: 20px;
    font-weight: 700;
    color: $color-text-primary;
    line-height: 1.3;
    margin: 0;
  }

  &__desc {
    font-size: 14px;
    line-height: 1.6;
    color: $color-text-secondary;
    margin: 0;
  }

  @include respond(max-sm) {
    padding: 60px 0;

    &__title {
      font-size: 24px;
      margin-bottom: 32px;
    }

    &__grid {
      gap: 16px;
    }

    &__body {
      padding: 20px;
    }

    &__cover {
      height: 160px;
    }
  }
}
</style>
