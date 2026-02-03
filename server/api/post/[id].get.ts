import { defineEventHandler } from 'h3'

const BASE_URL = 'https://api.github.com'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = event.context.params?.id
  const owner = config.public.githubOwner
  const repo = config.public.githubRepo

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
    const data = await $fetch(`${BASE_URL}/repos/${owner}/${repo}/issues/${id}`, {
      params: { ...authParams },
      headers
    })

    return data
  } catch {
    throw createError({
      statusCode: 404,
      statusMessage: 'Post not found'
    })
  }
})
