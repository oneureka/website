import type { UserObject } from '../types/user'
import { transformUser } from '../types/user'
import { transformTopic } from '../types/topic'
import { transformReply } from '../types/reply'
import { withNextCursor } from '../utils'

function transformList(data: any) {
  return (data.users || []).map(transformUser) as UserObject[]
}

function transformRetrieve(data: any) {
  const user = transformUser(data.user)
  if (data.meta) {
    user.isFollowed = !!data.meta.followed
    user.isBlocked = !!data.meta.blocked
  }
  return user
}

function transformTopics(data: any, params: any) {
  const items = (data.topics || []).map(transformTopic)
  return withNextCursor(items, params)
}

function transformReplies(data: any, params: any) {
  const items = (data.replies || []).map(transformReply)
  return withNextCursor(items, params)
}

function transformUsers(data: any) {
  return (data.followers || data.following || data.users || []).map(transformUser) as UserObject[]
}

export default [
  { id: 'list', method: 'GET', url: '/users', transform: transformList },
  { id: 'retrieve', method: 'GET', url: '/users/:id', transform: transformRetrieve },
  { id: 'getAuthenticated', method: 'GET', url: '/users/me', transform: (d: any) => transformUser(d.user) },
  { id: 'follow', method: 'POST', url: '/users/:id/follow' },
  { id: 'unfollow', method: 'POST', url: '/users/:id/unfollow' },
  { id: 'block', method: 'POST', url: '/users/:id/block' },
  { id: 'unblock', method: 'POST', url: '/users/:id/unblock' },
  { id: 'listBlocked', method: 'GET', url: '/users/:id/blocked', transform: transformUsers },
  { id: 'listTopics', method: 'GET', url: '/users/:id/topics', transform: transformTopics },
  { id: 'listReplies', method: 'GET', url: '/users/:id/replies', transform: transformReplies },
  { id: 'listFavorites', method: 'GET', url: '/users/:id/favorites', transform: transformTopics },
  { id: 'listFollowers', method: 'GET', url: '/users/:id/followers', transform: transformUsers },
  { id: 'listFollowing', method: 'GET', url: '/users/:id/following', transform: transformUsers },
] as const
