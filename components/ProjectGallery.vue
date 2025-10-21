<template lang="pug">
.gallery(v-if="photos && photos.length")
  .gallery__main
    .swiper.gallery__swiper-main(ref="mainSwiperRef")
      .swiper-wrapper
        .swiper-slide(v-for="(photo, index) in photos" :key="`main-${index}`")
          .gallery__slide-content
            img.gallery__image(:src="buildImage(`/files/projects/${photo.name}`)" :alt="`Slide ${index + 1}`")
    Button.gallery__nav-button.gallery__nav-button--next(
      variant="primary"
      size="md"
      label="Следующее фото"
      aria-label="Следующее фото"
      ref="nextButtonRef"
      @click="mainSwiper?.slideNext()"
    )
  .gallery__thumbnails
    .swiper.gallery__swiper-thumbs(ref="thumbsSwiperRef")
      .swiper-wrapper
        .swiper-slide.gallery__thumbnail-slide(
          v-for="(photo, index) in photos"
          :key="`thumb-${index}`"
          @click="slideTo(index)"
        )
          img.gallery__thumbnail(:src="buildImage(`/files/projects/${photo.name}`)" :alt="`Thumbnail ${index + 1}`")
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import type Swiper from 'swiper'
import { Thumbs, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/thumbs'
import 'swiper/css/free-mode'
import { buildImage } from '@/utils/api'

interface Props {
  photos: Array<{
    id: number
    catalog: string
    name: string
    project_files: {
      id: number
      fileId: number
      projectId: number
    }
  }>
}

const props = defineProps<Props>()

const mainSwiperRef = ref<HTMLElement>()
const thumbsSwiperRef = ref<HTMLElement>()
const prevButtonRef = ref<HTMLElement>()
const nextButtonRef = ref<HTMLElement>()

let mainSwiper: Swiper | null = null
let thumbsSwiper: Swiper | null = null

const slideTo = (index: number) => {
  if (mainSwiper) {
    mainSwiper.slideTo(index)
  }
}

onMounted(async () => {
  if (!props.photos || !props.photos.length) return

  await nextTick()

  if (!thumbsSwiperRef.value || !mainSwiperRef.value) {
    console.warn('Gallery swiper refs not found')
    return
  }

  try {
    const SwiperClass = (await import('swiper')).default
    const { Thumbs: ThumbsModule, FreeMode: FreeModeModule } = await import('swiper/modules')

    SwiperClass.use([ThumbsModule, FreeModeModule])

    thumbsSwiper = new SwiperClass(thumbsSwiperRef.value, {
      modules: [FreeModeModule, ThumbsModule],
      spaceBetween: 8,
      slidesPerView: 'auto',
      freeMode: true,
      watchSlidesProgress: true,
      direction: 'horizontal',
      loop: true,
    })

    mainSwiper = new SwiperClass(mainSwiperRef.value, {
      modules: [ThumbsModule],
      spaceBetween: 0,
      slidesPerView: 1,
      loop: true,
      thumbs: {
        swiper: thumbsSwiper,
      },
    })
  } catch (error) {
    console.error('Error initializing gallery swiper:', error)
  }
})

onUnmounted(() => {
  if (mainSwiper) {
    mainSwiper.destroy()
    mainSwiper = null
  }
  if (thumbsSwiper) {
    thumbsSwiper.destroy()
    thumbsSwiper = null
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/abstracts/_mixins' as *;

.gallery {
  width: 100%;
  padding: 0;
  margin: 0;

  &__main {
    position: relative;
    width: 100%;
    height: 400px;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 16px;
    background: $color-card-bg;

    @include respond(max-md) {
      height: 350px;
      margin-bottom: 12px;
    }

    @include respond(max-sm) {
      height: 300px;
    }
  }

  &__swiper-main {
    width: 100%;
    height: 100%;
  }

  &__slide-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__image {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
  }

  &__nav-button {
    position: absolute;
    right: 6px;
    bottom: 6px;
    z-index: 10;

    &--next {
      @include respond(max-sm) {
        right: 8px;
      }
    }
  }

  &__thumbnails {
    width: 100%;
    height: 80px;

    @include respond(max-md) {
      height: 70px;
    }

    @include respond(max-sm) {
      height: 60px;
    }
  }

  &__swiper-thumbs {
    width: 100%;
    height: 100%;
    padding: 0;

    .swiper-wrapper {
      display: flex;
      flex-direction: row;
    }

    .swiper-slide {
      width: 80px;
      height: 100%;
      cursor: pointer;
      flex-shrink: 0;
      opacity: 0.6;
      transition: opacity 0.3s ease;

      &.swiper-slide-thumb-active {
        opacity: 1;
      }

      @include respond(max-sm) {
        width: 70px;
      }
    }
  }

  &__thumbnail-slide {
    width: 100%;
    height: 100%;
    padding: 2px;
    border-radius: 8px;
    border: 2px solid transparent;
    overflow: hidden;
    transition: border-color 0.2s ease;

    &.swiper-slide-thumb-active {
      border-color: $color-header-blue;
    }

    @include respond(max-sm) {
      border-radius: 6px;
      padding: 1px;
    }
  }

  &__thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 6px;
  }
}
</style>
