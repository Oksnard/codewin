<template lang="pug">
  section.hero
    ClientOnly
      .hero__swiper(ref="swiperRef")
        .swiper-wrapper
          .hero__slide.swiper-slide(v-for="s in slides" :key="s.id")
            .hero__content
              .hero__text
                h1.hero__title {{ s.title }}
                p.hero__description(v-if="s.subtitle") {{ s.subtitle }}
                p.hero__description(v-else) Производим автономные канализации, очистные сооружения, накопительные ёмкости и различные комплектующие к ним.
                Button.hero__cta(
                  variant="primary",
                  size="lg",
                  label="Перейти в каталог",
                  @click="handleCtaClick"
                )
              .hero__image-wrapper
                img.hero__image(:src="buildImage(s.image)" :alt="s.title")
        .hero__pagination.swiper-pagination
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useContentStore } from '@/stores/content'
import { Swiper } from 'swiper'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { buildImage } from '@/utils/api'

const router = useRouter()
const contentStore = useContentStore()
const swiperRef = ref<HTMLElement>()
let swiper: Swiper | null = null

const slides = computed(() => contentStore.state.slides || [])

const handleCtaClick = () => {
  router.push('/catalog')
}

onMounted(async () => {
  await nextTick()
  await contentStore.ensureHomepageData()
  await nextTick()

  if (swiperRef.value && slides.value.length > 0) {
    swiper = new Swiper(swiperRef.value, {
      modules: [Pagination, Autoplay],
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.hero__pagination',
        clickable: true,
        bulletClass: 'hero__pagination-bullet',
        bulletActiveClass: 'hero__pagination-bullet--active',
      },
      speed: 800,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      slidesPerView: 1,
      spaceBetween: 0,
      watchSlidesProgress: true,
    })
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/abstracts/_mixins' as *;

.hero {
  background: $color-primary;
  color: $color-text-primary;
  padding: 0;
  min-height: 600px;
  display: flex;
  align-items: stretch;
  position: relative;
  overflow: hidden;

  @include respond(md) {
    min-height: 700px;
  }

  @include respond(lg) {
    min-height: 800px;
  }

  @include respond(max-md) {
    min-height: 500px;
  }

  @include respond(max-sm) {
    min-height: 400px;
  }

  &__swiper {
    width: 100%;
    height: 100%;
    min-height: 600px;

    @include respond(md) {
      min-height: 700px;
    }

    @include respond(lg) {
      min-height: 800px;
    }

    @include respond(max-md) {
      min-height: 500px;
    }

    @include respond(max-sm) {
      min-height: 400px;
    }
  }

  &__slide {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
    background: $color-primary;
    padding: 0;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    gap: 60px;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 80px 0;

    @include container;

    @include respond(max-lg) {
      gap: 40px;
      flex-direction: column;
      justify-content: center;
    }

    @include respond(max-md) {
      padding: 60px 0 40px 0;
    }

    @include respond(max-sm) {
      padding: 40px 0 30px 0;
      gap: 30px;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 24px;
    max-width: 100%;

    @include respond(max-lg) {
      order: 2;
    }
  }

  &__title {
    font-size: 48px;
    font-weight: 700;
    line-height: 1.2;
    color: $color-text-primary;
    margin: 0;

    @include respond(max-lg) {
      font-size: 36px;
      text-align: center;
    }

    @include respond(max-md) {
      font-size: 28px;
    }
  }

  &__description {
    font-size: 18px;
    line-height: 1.6;
    color: $color-text-primary;
    opacity: 0.9;
    max-width: 400px;
    margin: 0;

    @include respond(max-lg) {
      max-width: 100%;
      margin: 0 auto;
      text-align: center;
    }

    @include respond(max-md) {
      font-size: 16px;
    }
  }

  &__cta {
    align-self: flex-start;

    @include respond(max-lg) {
      align-self: center;
    }
  }

  &__image-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    width: 100%;

    @include respond(max-lg) {
      order: 1;
      min-height: 300px;
    }

    @include respond(max-md) {
      min-height: 250px;
    }

    @include respond(max-sm) {
      min-height: 200px;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  &__pagination {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;

    @include respond(max-sm) {
      bottom: 20px;
    }
  }

  :deep(.hero__pagination-bullet) {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0 10px;
    display: inline-block;
    background: #ffffff20;
    position: relative;

    @include respond(max-sm) {
      width: 10px;
      height: 10px;
      margin: 0 4px;
    }

    &.hero__pagination-bullet--active {
      background: $color-accent;
      box-shadow: 0 0 0 10px rgba(33, 150, 243, 0.2);
    }

    &:hover {
      background: #ffffff40;
    }
  }
}
</style>
