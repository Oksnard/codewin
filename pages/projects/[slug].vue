<template lang="pug">
main.project
  AppContainer
    article.project__article(v-if="project")
      img.project__cover(v-if="project.cover" :src="buildImage(project.cover)" :alt="project.title")
      ProjectDescription(v-if="project.description" :project="project")
      section.project__gallery(v-if="project.gallery?.length")
        ul.project__grid
          li.project__grid-item(v-for="(src,i) in project.gallery" :key="i")
            img(:src="buildImage(src)" :alt="`${project.title} ${i+1}`")
    .project__loading(v-else-if="pending")
      p Загрузка проекта...
    .project__error(v-else-if="error")
      p Ошибка загрузки проекта
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useProjectStore } from "@/stores/project";
import { buildImage } from "@/utils/api";

definePageMeta({ name: "project" });

const route = useRoute();
const slug = route.params.slug as string;
const store = useProjectStore();

const {
  data: project,
  pending,
  error,
} = await useAsyncData(
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
  },
);

useHead({
  title: computed(() =>
    project.value
      ? `${project.value.title} — Проекты — LOS BIO`
      : "Проект — LOS BIO",
  ),
  meta: [
    {
      name: "description",
      content: computed(
        () =>
          project.value?.description ||
          `Проект ${project.value?.title || ""} от ЛОС-БИО`,
      ),
    },
    {
      property: "og:title",
      content: computed(() =>
        project.value
          ? `${project.value.title} — Проекты — LOS BIO`
          : "Проект — LOS BIO",
      ),
    },
    {
      property: "og:description",
      content: computed(
        () =>
          project.value?.description ||
          `Проект ${project.value?.title || ""} от ЛОС-БИО`,
      ),
    },
    {
      property: "og:image",
      content: computed(() =>
        project.value?.cover ? buildImage(project.value.cover) : "",
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
    padding-block: 24px 48px;

    @include respond(max-md) {
      padding-block: 16px 32px;
    }
  }

  &__cover {
    width: 100%;
    height: auto;
    border-radius: 12px;
    margin: 24px 0;

    @include respond(max-md) {
      margin: 16px 0;
    }
  }

  &__gallery {
    margin-top: 40px;

    @include respond(max-md) {
      margin-top: 32px;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }

  &__grid-item img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    display: block;
  }

  &__loading,
  &__error {
    padding: 40px 0;
    text-align: center;
    color: $color-text-secondary;
  }

  @include respond(md) {
    &__grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
