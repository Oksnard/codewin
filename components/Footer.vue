<template lang="pug">
footer.footer
  .container
    .footer__content
      .footer__column.footer__column--company
        .footer__logo
          NuxtLink(to="/")
            img.footer__logo-img(:src="'/logo.svg'")
          .footer__logo-text
            .footer__company-name ООО «ТОРГОВЫЙ ДОМ «ЛОС-БИО»»
            .footer__legal
              span ИНН:
              | 2463123719
              span КПП:
              | 246301001
              br
              span ОГРН:
              | 1212400008688

      .footer__column.footer__column--navigation
        .footer__section
          h3.footer__section-title КОМПАНИЯ
          nav.footer__nav
            NuxtLink.footer__link(to="/about") О компании
            NuxtLink.footer__link(to="/projects") Проекты
            NuxtLink.footer__link(to="/catalog") Каталог
            NuxtLink.footer__link(to="/contacts") Контакты

      .footer__column.footer__column--navigation
        .footer__section
          h3.footer__section-title КАТАЛОГ
          nav.footer__nav
            NuxtLink.footer__link(to="/catalog/khc") KHC
            NuxtLink.footer__link(to="/catalog/containers") Ёмкости
            NuxtLink.footer__link(to="/catalog/storm") Ливневые очистные сооружения
            NuxtLink.footer__link(to="/catalog/household") Хозяйственно-бытовые очистные сооружения
            NuxtLink.footer__link(to="/catalog/components") Комплектующие

      .footer__column.footer__column--contacts
        h3.footer__section-title КОНТАКТЫ
        .footer__contact-info
          .footer__contact-item
            Icon.footer__icon(name="phone" size="16")
            span +7 (391) 209-57-57
          .footer__contact-item
            Icon.footer__icon(name="phone" size="16")
            span +7 (391) 215-54-33
          .footer__contact-item
            Icon.footer__icon(name="mail" size="16")
            span los-bio@mail.ru
          .footer__contact-item.footer__callback
            Icon.footer__icon(name="refresh" size="16")
            span Заказать звонок
        Button.footer__cta(
          variant="primary"
          size="md"
          label="Получить КП"
          @click="handleCtaClick"
        )
</template>

<script setup lang="ts">
// * Components are auto-imported by Nuxt

const emit = defineEmits<{
  ctaClick: []
}>()

const handleCtaClick = () => {
  emit('ctaClick')
  // * Handle CTA action
}
</script>

<style lang="scss" scoped>
.footer {
  background: $color-card-bg;
  color: $color-text-primary;
  padding: 60px 0 40px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  .container {
    @include container;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 60px;

    @include respond(max-lg) {
      gap: 40px;
    }

    @include respond(max-md) {
      gap: 32px;
    }
  }

  &__column {
    display: flex;
    flex-direction: column;
    gap: 24px;

    &--navigation {
      max-width: 179px;
    }

    &--contacts {
      max-width: 179px;
    }
  }

  &__logo {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    &-img {
      margin-bottom: 30px;
    }

    &-text {
      font-size: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      color: #ffffff;

      span {
        opacity: .4;
      }
    }
  }

  &__company-name {
    font-size: 14px;
    font-weight: 600;
    color: $color-text-primary;
    line-height: 1.3;
  }

  &__section {
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }

    &-title {
      font-size: 16px;
      font-weight: 700;
      color: $color-text-primary;
      margin-bottom: 16px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__link {
    color: $color-text-primary;
    opacity: 0.8;
    font-size: 14px;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: $color-header-blue;
    }
  }

  &__contact-info {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }

  &__contact-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: $color-text-primary;
    font-size: 14px;

    .footer__icon {
      color: $color-header-blue;
      flex-shrink: 0;
    }

    &.footer__callback {
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: $color-header-blue;
      }
    }
  }


  @include respond(max-sm) {
    padding: 40px 0 30px 0;

    &__content {
      gap: 24px;
    }

    &__column {
      gap: 20px;
    }

    &__section {
      margin-bottom: 24px;
    }
  }
}
</style>
