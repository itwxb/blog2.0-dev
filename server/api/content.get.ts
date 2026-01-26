import { defineEventHandler, getQuery, useRuntimeConfig, createError } from '#imports'

const BASE_URL = 'https://api.github.com'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const { repo, path } = query
  const owner = config.public.githubOwner

  if (!repo || !path) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing repo or path parameter',
    })
  }

  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  }
  
  if (config.githubToken) {
    headers.Authorization = `token ${config.githubToken}`
  } else if (config.githubClientId && config.githubClientSecret) {
     // Basic Auth for rate limiting increase
     const auth = Buffer.from(`${config.githubClientId}:${config.githubClientSecret}`).toString('base64')
     headers.Authorization = `Basic ${auth}`
  }

  try {
    const data: any = await $fetch(`${BASE_URL}/repos/${owner}/${repo}/contents/${path}`, {
      headers
    })
    
    // GitHub content API returns base64 encoded content
    if (data.content && data.encoding === 'base64') {
      const content = Buffer.from(data.content, 'base64').toString('utf-8')
      return { ...data, decodedContent: content }
    }
    
    return data
  } catch (error: any) {
    console.error('GitHub API Error:', error)
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: error.message,
    })
  }
})
