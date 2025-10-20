<template lang="pug">
div#app
  Header
  Breadcrumb(v-if="showBreadcrumbs" :items="breadcrumbs")
  main.main-content
    NuxtPage
  Footer(@cta-click="handleFooterCta")
</template>

<script setup lang="ts">
const route = useRoute()
const { breadcrumbs } = useBreadcrumbs()

const showBreadcrumbs = computed(() => route.path !== '/')

const handleFooterCta = () => {
  console.log('Footer CTA clicked')
}
</script>

<style lang="scss">
.main-content {
  flex: 1;
}
</style>



