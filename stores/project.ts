import { defineStore } from 'pinia'
import type { ApiProjectDetail } from '@/types/api'

interface ProjectState {
  bySlug: Record<string, ApiProjectDetail>
}

export const useProjectStore = defineStore('project', () => {
  const state = reactive<ProjectState>({ bySlug: {} })

  async function fetchBySlug(slug: string): Promise<ApiProjectDetail> {
    const { Api } = await import('@/utils/api')
    const data = await Api.project(slug)
    state.bySlug[slug] = data
    return data
  }

  return { state, fetchBySlug }
})


