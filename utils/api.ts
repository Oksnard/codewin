import type {
  ApiAdvantageItem,
  ApiAdvantageResponse,
  ApiAdvantageData,
  ApiListResponse,
  ApiProjectCard,
  ApiProjectDetail,
  ApiSlideItem,
  ApiSlideResponse,
} from '@/types/api'

const DEFAULT_TIMEOUT_MS = 10_000

export function createApiUrl(path: string): string {
  if (import.meta.server) {
    return `/api${path}`
  }
  const nuxtCfg = (globalThis as any).__NUXT__?.config
  const base = nuxtCfg?.public?.apiBase ?? 'https://api.los-bio.ru'
  return `${base}${path}`
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS)
  try {
    const res = await $fetch<T>(createApiUrl(path), {
      ...init,
      method: (init?.method as any) ?? undefined,
      signal: controller.signal as any,
      retry: 1 as any,
    } as any)
    return res
  } catch (error) {
    throw new Error(`API fetch failed for ${path}`)
  } finally {
    clearTimeout(timeoutId)
  }
}

export function buildImage(url?: string | null): string | null {
  if (!url) return null
  if (url.startsWith('http')) return url
  if (url.startsWith('/')) {
    return `https://api.los-bio.ru${url}`
  }
  return createApiUrl(`/${url}`)
}

export const Api = {
  slides: () => fetchJson<ApiSlideResponse[]>('/info/group/slide'),
  advantages: async () => {
    const raw = await fetchJson<ApiAdvantageResponse[]>('/info/group/advantage')
    const parsed: ApiAdvantageItem[] = raw.map((row) => {
      try {
        const data: ApiAdvantageData = JSON.parse(row.value)
        return {
          id: data.id ?? row.id,
          title: data.title,
          description: data.description ?? null,
          icon: data.icon ?? null,
        }
      } catch {
        return { id: row.id, title: row.name, description: null, icon: null }
      }
    })
    return { results: parsed } satisfies ApiListResponse<ApiAdvantageItem>
  },
  projects: async () => {
    const raw = await fetchJson<any>('/projects/')
    const items: any[] = Array.isArray(raw) ? raw : (raw?.results ?? [])
    const results: ApiProjectCard[] = items.map((p: any) => {
      const firstPhoto = Array.isArray(p.photos) && p.photos.length > 0 ? p.photos[0] : null
      const cover = firstPhoto ? `/projects/${firstPhoto.name}` : null
      const shortDescription = p.short_description?.blocks?.[0]?.data?.text ?? null
      return {
        id: p.id,
        title: p.title,
        slug: p.slug,
        cover,
        shortDescription,
        photos: Array.isArray(p.photos) ? p.photos : [],
      } as ApiProjectCard
    })
    return { results } satisfies ApiListResponse<ApiProjectCard>
  },
  project: (slug: string) => fetchJson<ApiProjectDetail>(`/projects/${slug}`),
}
