export type UserObject = {
  id: number
  login: string
  name: string
  avatarUrl: string
  location: string
  company: string
  github: string
  twitter: string
  website: string
  bio: string
  tagline: string
  email: string
  topicsCount: number
  repliesCount: number
  followingCount: number
  followersCount: number
  favoritesCount: number
  level: string
  levelName: string
  isFollowed: boolean
  isBlocked: boolean
  createdAt: string
  updatedAt: string
}

export function transformUser(data: Record<string, any>): UserObject {
  return {
    id: data.id,
    login: data.login,
    name: data.name,
    avatarUrl: data.avatar_url,
    location: data.location,
    company: data.company,
    github: data.github,
    twitter: data.twitter,
    website: data.website,
    bio: data.bio,
    tagline: data.tagline,
    email: data.email,
    topicsCount: data.topics_count,
    repliesCount: data.replies_count,
    followingCount: data.following_count,
    followersCount: data.followers_count,
    favoritesCount: data.favorites_count,
    level: data.level,
    levelName: data.level_name,
    isFollowed: !!data.followed,
    isBlocked: !!data.blocked,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }
}
