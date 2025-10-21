export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, 'slug')
    const response = await $fetch(`https://api.los-bio.ru/projects/${slug}`)
    return response
  } catch (error) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch project from API',
    })
  }
})
