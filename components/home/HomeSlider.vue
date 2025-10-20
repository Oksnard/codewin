<template lang="pug">
ClientOnly
  .home-slider
    .home-slider__swiper(ref="swiperRef")
      .swiper-wrapper
        .swiper-slide.home-slider__slide(v-for="s in slides" :key="s.id")
          NuxtLink.home-slider__link(:to="s.link || '#'")
            img.home-slider__image(:src="imageSrc(s.image)" :alt="s.title")
            .home-slider__caption
              h2.home-slider__title {{ s.title }}
              p.home-slider__subtitle(v-if="s.subtitle") {{ s.subtitle }}
      .swiper-pagination.home-slider__pagination
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { Swiper } from "swiper";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import type { ApiSlideItem } from "@/types/api";
import { buildImage } from "@/utils/api";

defineProps<{ slides: ApiSlideItem[] }>();

const swiperRef = ref<HTMLElement>();
let swiper: Swiper | null = null;

function imageSrc(path: string) {
  return buildImage(path) || "";
}

onMounted(async () => {
  await nextTick();

  if (swiperRef.value) {
    swiper = new Swiper(swiperRef.value, {
      modules: [Pagination, Autoplay, Navigation],
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        bulletClass: "swiper-pagination-bullet home-slider__bullet",
        bulletActiveClass:
          "swiper-pagination-bullet-active home-slider__bullet--active",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      speed: 800,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      slidesPerView: 1,
      spaceBetween: 0,
      watchSlidesProgress: true,
    });
  }
});
</script>

<style lang="scss" scoped>
@use "@/assets/scss/abstracts/_mixins" as *;
@use "@/assets/scss/abstracts/_variables" as *;

.home-slider {
  width: 100%;
  height: 100%;

  &__swiper {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
  }

  &__slide {
    width: 100%;
    height: 100%;
    position: relative;
    background: #f2f2f2;
  }

  &__link {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: inherit;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  &__caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    padding: 40px 24px 24px;
    color: $color-white;
  }

  &__title {
    margin: 0 0 8px;
    font-size: 28px;
    font-weight: 700;
    line-height: 1.2;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  &__subtitle {
    margin: 0;
    font-size: 16px;
    opacity: 0.9;
    line-height: 1.4;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  &__pagination {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }

  &__bullet {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0 4px;

    &--active {
      background: $color-accent;
      transform: scale(1.2);
    }

    &:hover {
      background: rgba(255, 255, 255, 0.6);
    }
  }

  @include respond(md) {
    &__caption {
      padding: 60px 32px 32px;
    }

    &__title {
      font-size: 36px;
    }

    &__subtitle {
      font-size: 18px;
    }
  }

  @include respond(lg) {
    &__title {
      font-size: 42px;
    }

    &__subtitle {
      font-size: 20px;
    }
  }
}
</style>
