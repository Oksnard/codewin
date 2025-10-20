<template>
  <section class="projects">
    <div class="container">
      <h2 class="projects__title">Проекты</h2>
      <div class="projects__grid">
        <NuxtLink v-for="project in contentStore.state.projects" :key="project.id" :to="`/projects/${project.slug}`" class="projects__card">
          <div class="projects__image">
            <img :src="getProjectImage(project)" :alt="project.title" loading="lazy" />
          </div>
          <div class="projects__content">
            <h3 class="projects__card-title">{{ project.title }}</h3>
            <p class="projects__description">{{ getProjectDescription(project) }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { buildImage } from '@/utils/api'
import { useContentStore } from '@/stores/content'
import type { ApiProjectCard } from '@/types/api'

const contentStore = useContentStore()

await contentStore.ensureHomepageData()

function getProjectImage(project: ApiProjectCard): string {
  if (project.cover) {
    return buildImage(project.cover) || ''
  }
  if (project.photos && project.photos.length > 0) {
    return buildImage(`/projects/${project.photos[0].name}`) || ''
  }
  return ''
}

function getProjectDescription(project: ApiProjectCard): string {
  if (project.shortDescription) {
    return project.shortDescription
  }
  return 'Описание проекта будет добавлено в ближайшее время'
}
</script>

<style lang="scss" scoped>
.projects {
  background: $color-primary;
  color: $color-text-primary;
  padding: 80px 0;
}

.projects__title {
  font-size: 36px;
  font-weight: 700;
  color: $color-text-primary;
  margin: 0 0 60px 0;

  @include respond(max-md) {
    font-size: 28px;
    margin-bottom: 40px;
  }
}

.projects__grid {
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

.projects__card {
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

    .projects__image img {
      transform: scale(1.05);
    }
  }
}

.projects__image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
}

.projects__content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
}

.projects__card-title {
  font-size: 20px;
  font-weight: 700;
  color: $color-text-primary;
  line-height: 1.3;
  margin: 0;
}

.projects__description {
  font-size: 14px;
  line-height: 1.6;
  color: $color-text-secondary;
  margin: 0;
}

@include respond(max-sm) {
  .projects {
    padding: 60px 0;
  }

  .projects__title {
    font-size: 24px;
    margin-bottom: 32px;
  }

  .projects__grid {
    gap: 16px;
  }

  .projects__content {
    padding: 20px;
  }

  .projects__image {
    height: 160px;
  }
}
</style>
