<template lang="pug">
main.project
  AppContainer
    article.project__article(v-if="project")
      .project__content
        .project__info
          .project__description-wrapper
            ProjectDescription(v-if="project.description" :project="project")

        .project__gallery-sidebar
          ProjectGallery(v-if="project.photos && project.photos.length" :photos="project.photos")

    .project__loading(v-else-if="pending")
      .project__loading-content
        .project__loading-spinner
        p.project__loading-text Загрузка проекта...
    .project__error(v-else-if="error")
      .project__error-content
        h3.project__error-title Ошибка загрузки проекта
        p.project__error-text {{ error.message }}
        button.project__error-button(@click="handleBack") Вернуться назад
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useProjectStore } from "@/stores/project";
import { buildImage } from "@/utils/api";

definePageMeta({ name: "project" });

const router = useRouter();
const route = useRoute();
const slug = route.params.slug as string;
const store = useProjectStore();

const { data: project, pending, error } = await useAsyncData(
    `project-${slug}`,
    async () => {
      try {
        const result = await store.fetchBySlug(slug);
        if (!result) {
          throw createError({
            statusCode: 404,
            statusMessage: "Проект не найден",
          });
        }
        return result;
      } catch (err) {
        console.error("Error fetching project:", err);
        throw err;
      }
    },
    {
      server: true,
      client: true,
    }
);

const handleBack = () => {
  router.back();
};

useHead({
  title: computed(() =>
      project.value
          ? `${project.value.title} — Проекты — LOS BIO`
          : "Проект — LOS BIO"
  ),
  meta: [
    {
      name: "description",
      content: computed(
          () =>
              project.value?.description ||
              `Проект ${project.value?.title || ""} от ЛОС-БИО`
      ),
    },
    {
      property: "og:title",
      content: computed(() =>
          project.value
              ? `${project.value.title} — Проекты — LOS BIO`
              : "Проект — LOS BIO"
      ),
    },
    {
      property: "og:description",
      content: computed(
          () =>
              project.value?.description ||
              `Проект ${project.value?.title || ""} от ЛОС-БИО`
      ),
    },
    {
      property: "og:image",
      content: computed(() =>
          project.value?.photos?.[0] ? buildImage(project.value.photos[0].name) : ""
      ),
    },
    { property: "og:type", content: "article" },
  ],
});
</script>

<style lang="scss" scoped>
@use "@/assets/scss/abstracts/_mixins" as *;

.project {
  &__article {
    padding-block: 32px 48px;

    @include respond(max-md) {
      padding-block: 24px 32px;
    }

    @include respond(max-sm) {
      padding-block: 16px 24px;
    }
  }

  &__header {
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid $color-header-border;

    @include respond(max-md) {
      margin-bottom: 24px;
      padding-bottom: 16px;
    }

    @include respond(max-sm) {
      margin-bottom: 20px;
      padding-bottom: 12px;
    }
  }

  &__title {
    margin: 0 0 16px;
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.2;
    color: $color-text-primary;
    word-wrap: break-word;

    @include respond(max-lg) {
      font-size: 2.25rem;
    }

    @include respond(max-md) {
      font-size: 2rem;
      margin-bottom: 12px;
    }

    @include respond(max-sm) {
      font-size: 1.75rem;
      margin-bottom: 8px;
    }
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-size: 1.125rem;
    color: $color-text-secondary;

    @include respond(max-md) {
      font-size: 1rem;
      gap: 8px;
    }
  }

  &__meta-item {
    display: block;

    strong {
      color: $color-text-primary;
      font-weight: 600;
    }
  }

  &__content {
    display: flex;
    gap: 48px;
    align-items: flex-start;

    @include respond(max-lg) {
      gap: 32px;
    }

    @include respond(max-md) {
      flex-direction: column;
      gap: 32px;
    }

    @include respond(max-sm) {
      gap: 24px;
    }
  }

  &__info {
    flex: 0 0 60%;
    display: flex;
    flex-direction: column;
    gap: 32px;

    @include respond(max-md) {
      flex: none;
      width: 100%;
      gap: 24px;
    }

    @include respond(max-sm) {
      gap: 20px;
    }
  }

  &__description-wrapper {
    background: $color-card-bg;
    border-radius: 12px;
    overflow: hidden;
  }

  &__gallery-sidebar {
    flex: 0 0 40%;
    position: sticky;
    top: 32px;
    max-width: 40%;
    width: 100%;

    @include respond(max-md) {
      flex: none;
      width: 100%;
      max-width: 100%;
      position: static;
    }
  }

  &__loading,
  &__error {
    padding: 80px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;

    @include respond(max-md) {
      padding: 60px 0;
      min-height: 300px;
    }
  }

  &__loading-content,
  &__error-content {
    text-align: center;
    max-width: 400px;
  }

  &__loading-spinner {
    width: 48px;
    height: 48px;
    border: 3px solid $color-header-border;
    border-top: 3px solid $color-header-blue;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;

    @include respond(max-sm) {
      width: 40px;
      height: 40px;
      margin-bottom: 16px;
    }
  }

  &__loading-text {
    font-size: 1.125rem;
    color: $color-text-secondary;
    margin: 0;

    @include respond(max-sm) {
      font-size: 1rem;
    }
  }

  &__error-title {
    font-size: 1.5rem;
    color: $color-text-primary;
    margin: 0 0 12px;
    font-weight: 600;

    @include respond(max-sm) {
      font-size: 1.25rem;
    }
  }

  &__error-text {
    font-size: 1rem;
    color: $color-text-secondary;
    margin: 0 0 24px;
    line-height: 1.5;
  }

  &__error-button {
    background: $color-header-blue;
    color: $color-white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.9;
    }

    @include respond(max-sm) {
      padding: 10px 20px;
      font-size: 0.9rem;
    }
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
