export interface Post {
  id: number
  number: number
  title: string
  created_at: string
  updated_at: string
  body: string
  user?: {
    login: string
    avatar_url: string
    [key: string]: unknown
  }
  labels?: Array<{
    id: number
    name: string
    color: string
    [key: string]: unknown
  }>
  [key: string]: unknown
}

export interface Friend {
  name: string
  url: string
  avatar: string
}

export interface Presentation {
  title: string
  url: string
}

export interface GitHubContent {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string
  type: string
  content?: string
  encoding?: string
  decodedContent?: string
  _links: {
    self: string
    git: string
    html: string
  }
  [key: string]: unknown
}
