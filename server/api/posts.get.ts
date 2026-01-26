import { defineEventHandler, getQuery } from 'h3'

const BASE_URL = 'https://api.github.com'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const { page = 1, size = 5, labels } = query
  const owner = config.public.githubOwner
  const repo = config.public.githubRepo

  // 构建认证参数 (优先使用 Token，否则回退到 Client ID/Secret)
  const authParams = config.githubToken 
    ? {} 
    : { 
        client_id: config.githubClientId, 
        client_secret: config.githubClientSecret 
      }
  
  const headers = config.githubToken 
    ? { Authorization: `token ${config.githubToken}` }
    : {}

  try {
    const params: any = {
      page,
      per_page: size,
      filter: 'created',
      state: 'open',
      ...authParams
    }
    
    if (labels) {
      params.labels = labels
    }

    const data = await $fetch(`${BASE_URL}/repos/${owner}/${repo}/issues`, {
      params,
      headers
    })

    return data
  } catch (error) {
    console.error('GitHub API Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch posts from GitHub'
    })
  }
})
