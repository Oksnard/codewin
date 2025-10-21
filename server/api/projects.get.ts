export default defineEventHandler(async (event) => {
  try {
    const response = await $fetch('https://api.los-bio.ru/projects/')
    return response
  } catch (error) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch projects from API',
    })
  }
})
