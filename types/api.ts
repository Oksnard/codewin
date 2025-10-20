export interface ApiSlideItem {
  id: number
  title: string
  subtitle?: string | null
  image: string
  link?: string | null
}

export interface ApiSlideResponse {
  id: number
  name: string
  value: string
}

export interface ApiSlideData {
  id: number
  sort: string
  title: string
  description: string
  btnText: string
  link: string
  image: Array<{
    id: number
    catalog: string
    name: string
    isDeleted: boolean
  }>
  isSaved: boolean
  deleted: boolean
}

export interface ApiAdvantageItem {
  id: number
  title: string
  description?: string | null
  icon?: string | null
}

export interface ApiAdvantageResponse {
  id: number
  name: string
  value: string
}

export interface ApiAdvantageData {
  id: number
  title: string
  description?: string | null
  icon?: string | null
  iconError?: boolean | string | null
  isSaved?: boolean
}

export interface ApiProjectCard {
  id: number
  title: string
  slug: string
  cover?: string | null
  shortDescription?: string | null
  photos?: Array<{
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

export interface ProjectDescriptionBlock {
  id: string
  type: 'header' | 'paragraph' | 'list' | 'Products'
  data: {
    text?: string
    level?: number
    items?: string[]
    style?: 'ordered' | 'unordered'
    link?: string
  }
}

export interface ProjectDescription {
  time: number
  blocks: ProjectDescriptionBlock[]
  version: string
}

export interface ApiProjectDetail extends ApiProjectCard {
  contentHtml?: string | null
  gallery?: string[]
  description?: ProjectDescription | null
  works?: string
  equipment?: string
  customer?: string
  date?: string
  published?: boolean
}

export interface ApiListResponse<T> {
  results: T[]
}
