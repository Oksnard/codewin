<template lang="pug">
section.project-description
  header.project__header
    h1.project__title {{ project.title }}
    .project__meta(v-if="project.customer || project.works")
      span.project__meta-item(v-if="project.customer")
      span.project__meta-item(v-if="project.works")
    .project-description__content
      template(v-for="block in blocks" :key="block.id")
        BlockParagraph(v-if="block.type === 'paragraph'" :block="block")
        BlockList(v-else-if="block.type === 'list'" :block="block")
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ApiProjectDetail, ProjectDescriptionBlock } from "@/types/api";

const props = defineProps<{
  project: ApiProjectDetail;
}>();

const blocks = computed<ProjectDescriptionBlock[]>(() => {
  return (
    (props.project?.description?.blocks as ProjectDescriptionBlock[]) || []
  );
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

  &__header {
    margin-bottom: 24px;

    @include respond(max-md) {
      margin-bottom: 16px;
    }
  }

  &__title {
    margin: 0 0 12px;
    font-size: 36px;
    font-weight: 700;
    line-height: 1.3;
    color: $color-text-primary;

    @include respond(max-md) {
      font-size: 28px;
      margin: 0 0 8px;
    }
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 15px;
    color: $color-text-secondary;
  }

  &__meta-item {
    display: block;

    strong {
      color: $color-text-primary;
      font-weight: 600;
    }
  }

  &-description {
    padding: 40px;
    background: $color-card-bg;
    border-radius: 12px;
    color: $color-text-primary;
    line-height: 1.8;

    @include respond(max-md) {
      padding: 24px;
    }

    @include respond(max-sm) {
      padding: 16px;
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
}
</style>
