<template lang="pug">
main.projects
  AppContainer
    header.projects__header
      h1.projects__title Проекты
      p.projects__subtitle Наши реализованные проекты и достижения
    ProjectsSection
</template>

<script setup lang="ts">
import { useContentStore } from '@/stores/content'

definePageMeta({ name: 'projects' })
useHead({
  title: 'Проекты — ЛОС-БИО',
  meta: [
    { name: 'description', content: 'Наши реализованные проекты и достижения в области биотехнологического оборудования. Посмотрите примеры нашей работы.' },
    { property: 'og:title', content: 'Проекты — ЛОС-БИО' },
    { property: 'og:description', content: 'Наши реализованные проекты и достижения в области биотехнологического оборудования. Посмотрите примеры нашей работы.' },
    { property: 'og:type', content: 'website' }
  ]
})

const contentStore = useContentStore()
await contentStore.ensureHomepageData()
</script>

<style lang="scss" scoped>
.projects {
  background: $color-primary;
  min-height: 100vh;
  padding: 48px 0;

  &__header {
    text-align: center;
    margin-bottom: 48px;
  }

  &__title {
    font-size: 48px;
    font-weight: 700;
    color: $color-white;
    margin: 0 0 16px;
    line-height: 1.2;
  }

  &__subtitle {
    font-size: 18px;
    color: $color-text-secondary;
    margin: 0;
    line-height: 1.5;
  }
}

@include respond(md) {
  .projects {
    padding: 32px 0;

    &__header {
      margin-bottom: 32px;
    }

    &__title {
      font-size: 36px;
    }

    &__subtitle {
      font-size: 16px;
    }
  }
}

@include respond(sm) {
  .projects {
    padding: 24px 0;

    &__header {
      margin-bottom: 24px;
    }

    &__title {
      font-size: 28px;
    }

    &__subtitle {
      font-size: 14px;
    }
  }
}
</style>
