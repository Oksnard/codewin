<template lang="pug">
header.header
// * Top information bar
.header__info
  .container
    .header__info-content
      .header__contact-item
        Icon.header__icon(name='location' size='16')
        span г. Красноярск, ул. Телевизорная 1, стр. 14, оф. 204
      .header__contact-item
        Icon.header__icon(name='phone' size='16')
        span +7 (391) 209 57-57
      .header__contact-item
        Icon.header__icon(name='phone' size='16')
        span +7 (391) 215 54-33
      .header__contact-item
        Icon.header__icon(name='mail' size='16')
        span los-bio@mail.ru
      .header__callback
        Icon.header__icon(name='refresh' size='16')
        span Заказать звонок
// * Main navigation bar
.header__main
  .container
    .header__main-content
      .header__logo
        NuxtLink(to="/")
          img(:src="'/logo.svg'")
      nav.header__nav-list
          NuxtLink.header__nav-link(to='/about') О компании
          NuxtLink.header__nav-link(to='/projects') Проекты
          NuxtLink.header__nav-link.header__nav-link--dropdown(to='/catalog')
            span Каталог
            span.header__dropdown-arrow &#x25BC;
          NuxtLink.header__nav-link(to='/contacts') Контакты
      .header__actions
        Button.header__cta-button(
          variant="primary"
          size="md"
          label="Получить КП"
          @click="handleCtaClick"
        )
        // * Mobile menu toggle
        button.header__mobile-toggle(:class="{ 'header__mobile-toggle--active': isMobileMenuOpen }" @click='toggleMobileMenu')
          span.header__mobile-toggle-line
          span.header__mobile-toggle-line
          span.header__mobile-toggle-line
// * Mobile menu
.header__mobile-menu(v-if='isMobileMenuOpen')
  .container
    .header__mobile-nav
      NuxtLink.header__mobile-link(to='/about') О компании
      NuxtLink.header__mobile-link(to='/projects') Проекты
      NuxtLink.header__mobile-link(to='/contacts') Контакты
      .header__mobile-cta
        Button.header__mobile-cta-button(
          variant="primary"
          size="lg"
          label="Получить КП"
          full-width
          @click="handleCtaClick"
        )

</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const handleCtaClick = () => {
  console.log("CTA button clicked");
};

watch(
  () => router.currentRoute.value.path,
  () => {
    isMobileMenuOpen.value = false;
  }
);

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    isMobileMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);
});
</script>

<style lang="scss" scoped>
.header {
  background: $color-header-bg;
  color: $color-text-primary;
  position: sticky;
  top: 0;
  z-index: 1000;

  &__info {
    height: 48px;
    border-bottom: 1px solid $color-header-border;
    display: flex;
    align-items: center;
    background: $color-header-bg;

    @include respond(max-md) {
      display: none;
    }

    &-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 32px;
      width: 100%;
      font-size: 14px;

      @include respond(lg) {
        gap: 24px;
      }

      @include respond(md) {
        gap: 16px;
      }
    }
  }

  &__contact-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: $color-text-primary;
    white-space: nowrap;
    font-size: 14px;

    .header__icon {
      color: $color-header-blue;
      flex-shrink: 0;
    }
  }

  &__callback {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: color 0.2s ease;
    color: $color-text-primary;
    white-space: nowrap;
    font-size: 14px;

    &:hover {
      color: $color-header-blue;
    }

    .header__icon {
      color: $color-header-blue;
      flex-shrink: 0;
    }
  }

  &__main {
    height: 80px;
    display: flex;
    align-items: center;

    &-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 280px;

    @include respond(max-md) {
      min-width: auto;
    }

    &-icon {
      width: 40px;
      height: 40px;
      background: $color-header-blue;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $color-white;
    }

    &-drop {
      font-size: 24px;
    }

    &-text {
      display: flex;
      flex-direction: column;
    }

    &-title {
      font-size: 20px;
      font-weight: 700;
      line-height: 1.2;
      color: $color-text-primary;

      @include respond(max-md) {
        font-size: 18px;
      }
    }

    &-subtitle {
      font-size: 12px;
      color: $color-text-secondary;
      line-height: 1.3;

      @include respond(max-md) {
        font-size: 10px;
      }
    }
  }

  &__nav {
    display: flex;
    align-items: center;

    @include respond(max-md) {
      display: none;
    }

    &-list {
      display: flex;
      align-items: center;
      gap: 32px;
      max-width: 470px;
      width: 100%;
      justify-content: space-between;

      @include respond(lg) {
        gap: 24px;
      }
    }

    &-link {
      display: flex;
      align-items: center;
      gap: 4px;
      color: $color-text-primary;
      font-size: 16px;
      transition: color 0.2s ease;

      &:hover {
        color: $color-header-blue;
      }

      &--dropdown {
        .header__dropdown-arrow {
          color: $color-header-blue;
          font-size: 12px;
        }
      }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 16px;
    min-width: 200px;
    justify-content: flex-end;

    @include respond(max-md) {
      min-width: auto;
    }
  }

  &__cta-button {
    @include respond(max-md) {
      display: none;
    }
  }

  &__mobile-toggle {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;

    @include respond(max-md) {
      display: flex;
    }

    &-line {
      width: 24px;
      height: 2px;
      background: $color-text-primary;
      transition: all 0.3s ease;
    }

    &--active {
      .header__mobile-toggle-line {
        &:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        &:nth-child(2) {
          opacity: 0;
        }

        &:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }
      }
    }
  }

  &__mobile-menu {
    background: $color-header-bg;
    border-top: 1px solid $color-header-border;
    padding: 16px 0;
    animation: slideDown 0.3s ease;
  }

  &__mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__mobile-link {
    color: $color-text-primary;
    font-size: 16px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(224, 224, 224, 0.1);
    transition: color 0.2s ease;

    &:hover {
      color: $color-header-blue;
    }
  }

  &__mobile-cta {
    margin-top: 16px;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @include respond(sm) {
    &__logo-text {
      display: none;
    }

    &__info-center {
      flex-direction: column;
      gap: 8px;
    }

    &__nav-list {
      gap: 16px;
    }
  }
}
</style>
