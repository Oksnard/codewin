<template lang="pug">
main.home
  HeroSection
  AdvantagesSection
  ProjectsSection
</template>

<script setup lang="ts">
import { useContentStore } from '@/stores/content'

definePageMeta({ name: 'home' })

const contentStore = useContentStore()
await contentStore.ensureHomepageData()

useHead({
  title: 'Главная — ЛОС-БИО',
  meta: [
    { name: 'description', content: 'ЛОС-БИО - производство биотехнологического оборудования. Оперативные расчёты, полный цикл производства, большой опыт работы.' },
    { property: 'og:title', content: 'Главная — ЛОС-БИО' },
    { property: 'og:description', content: 'ЛОС-БИО - производство биотехнологического оборудования. Оперативные расчёты, полный цикл производства, большой опыт работы.' },
    { property: 'og:type', content: 'website' }
  ]
})
</script>

<style lang="scss" scoped>
.home {
  background: $color-primary;
  min-height: 100vh;
}
</style>
