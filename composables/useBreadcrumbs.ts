import type { BreadcrumbItem } from '@/types/breadcrumb'

export const useBreadcrumbs = () => {
  const route = useRoute()
  const projectStore = useProjectStore()

  const generateBreadcrumbs = async (): Promise<BreadcrumbItem[]> => {
    const breadcrumbs: BreadcrumbItem[] = []

    breadcrumbs.push({
      text: 'Главная',
      href: '/'
    })

    if (route.name === 'project' && route.params.slug) {
      breadcrumbs.push({
        text: 'Проекты',
        href: '/projects'
      })

      const slug = route.params.slug as string
      try {
        const project = await projectStore.fetchBySlug(slug)
        breadcrumbs.push({
          text: project.title,
          href: undefined
        })
      } catch (error) {
        breadcrumbs.push({
          text: slug,
          href: undefined
        })
      }
    } else if (route.path.startsWith('/projects')) {
      breadcrumbs.push({
        text: 'Проекты',
        href: undefined
      })
    } else if (route.path !== '/') {
      const pathSegments = route.path.split('/').filter(segment => segment !== '')
      let currentPath = ''

      pathSegments.forEach((segment, index) => {
        currentPath += `/${segment}`

        const readableText = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')

        breadcrumbs.push({
          text: readableText,
          href: index === pathSegments.length - 1 ? undefined : currentPath
        })
      })
    }

    return breadcrumbs
  }

  const breadcrumbs = ref<BreadcrumbItem[]>([])

  watch(() => route.path, async () => {
    breadcrumbs.value = await generateBreadcrumbs()
  }, { immediate: true })

  return {
    breadcrumbs: readonly(breadcrumbs)
  }
}
