<template>
  <section class="advantages">
    <div class="container">
      <h2 class="advantages__title">Наши преимущества</h2>
      <div class="advantages__grid">
        <Card
          v-for="advantage in contentStore.state.advantages"
          :key="advantage.id"
          :image="advantage.icon || 'efficiency'"
          :title="advantage.title"
          variant="elevated"
          padding="lg"
          class="advantages__card-wrapper"
        >
          {{ advantage.description }}
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// * Card component is auto-imported by Nuxt
import { useContentStore } from '@/stores/content'

const contentStore = useContentStore()

await contentStore.ensureHomepageData()
</script>

<style lang="scss" scoped>
.advantages {
  background: $color-primary;
  color: $color-text-primary;
  padding: 80px 0;
}

.container {
  @include container;
}

.advantages__title {
  font-size: 36px;
  font-weight: 700;
  color: $color-text-primary;
  margin: 0 0 80px 0;

  @include respond(max-md) {
    font-size: 28px;
    margin-bottom: 40px;
  }
}

.advantages__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;

  @include respond(max-md) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.advantages__card-wrapper {
  font-size: 16px;
  line-height: 1.6;
  color: $color-text-secondary;
}

@include respond(max-sm) {
  .advantages {
    padding: 60px 0;
  }

  .advantages__title {
    font-size: 24px;
    margin-bottom: 32px;
  }

  .advantages__grid {
    gap: 20px;
  }
}
</style>
