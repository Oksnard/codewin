import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'
import type { ApiAdvantageItem, ApiProjectCard, ApiSlideItem, ApiSlideResponse, ApiSlideData } from '@/types/api'

interface ContentState {
  slides: ApiSlideItem[] | null
  advantages: ApiAdvantageItem[] | null
  projects: ApiProjectCard[] | null
  lastFetchedAt: number | null
}

export const useContentStore = defineStore('content', () => {
  const state = reactive<ContentState>({
    slides: null,
    advantages: null,
    projects: null,
    lastFetchedAt: null,
  })

  const isStale = computed(() => {
    if (!state.lastFetchedAt) return true
    return Date.now() - state.lastFetchedAt > 60_000
  })

  async function ensureHomepageData() {
    if (!isStale.value && state.slides && state.advantages && state.projects) return
    const [{ Api }] = await Promise.all([import('@/utils/api')])
    try {
      const [slidesRes, advRes, projectsRes] = await Promise.all([
        Api.slides(),
        Api.advantages(),
        Api.projects(),
      ])

      state.slides = slidesRes.map((slide: ApiSlideResponse) => {
        const slideData: ApiSlideData = JSON.parse(slide.value)
        return {
          id: slideData.id,
          title: slideData.title,
          subtitle: slideData.description,
          image: slideData.image && slideData.image.length > 0 ? `/files/${slideData.image[0].catalog}/${slideData.image[0].name}` : '',
          link: slideData.link
        }
      })

      state.advantages = advRes.results
      state.projects = projectsRes.results
    } catch (error) {
      console.warn('Failed to load homepage data from API, using fallback data', error)
      if (!state.slides) {
        state.slides = [
          { id: 1, title: 'Слайд 1', image: '' }
        ]
      }
      if (!state.advantages) {
        state.advantages = [
          { id: 1, icon: 'correspondence', title: 'Оперативность расчётов', description: 'Рассчитываем стоимость производства необходимого вам оборудования в течение нескольких часов после заявки' },
          { id: 2, icon: 'production', title: 'Производство полного цикла', description: 'Рассчитываем стоимость производства необходимого вам оборудования в течение нескольких часов после заявки' },
          { id: 3, icon: 'expertise', title: 'Большой опыт работы', description: 'Рассчитываем стоимость производства необходимого вам оборудования в течение нескольких часов после заявки' },
          { id: 4, icon: 'efficiency', title: 'Полное соответствие чертежам', description: 'Рассчитываем стоимость производства необходимого вам оборудования в течение нескольких часов после заявки' }
        ]
      }
      if (!state.projects) {
        state.projects = [
          { id: 1, slug: 'project-1', title: 'Оперативность расчётов', shortDescription: 'Рассчитываем стоимость производства необходимого вам оборудования в течение нескольких часов после заявки' },
          { id: 2, slug: 'project-2', title: 'Производство полного цикла', shortDescription: 'Рассчитываем стоимость производства необходимого вам оборудования в течение нескольких часов после заявки' },
          { id: 3, slug: 'project-3', title: 'Большой опыт работы', shortDescription: 'Рассчитываем стоимость производства необходимого вам оборудования в течение нескольких часов после заявки' },
          { id: 4, slug: 'project-4', title: 'Полное соответствие чертежам', shortDescription: 'Рассчитываем стоимость производства необходимого вам оборудования в течение нескольких часов после заявки' }
        ]
      }
    }
    state.lastFetchedAt = Date.now()
  }

  return { state, ensureHomepageData }
})
