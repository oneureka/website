import type { TopicObject } from '../types/topic'
import { transformTopic } from '../types/topic'
import { withNextCursor } from '../utils'

function transformList(data: any) {
  const topics = (data.topics || []).map(transformTopic) as TopicObject[]
  return withNextCursor(topics, data.meta || {})
}

function transformRetrieve(data: any) {
  const topic = transformTopic(data.topic)
  if (data.meta) {
    topic.isLiked = !!data.meta.liked
    topic.isFollowed = !!data.meta.followed
    topic.isFavorited = !!data.meta.favorited
  }
  return topic
}

export default [
  { id: 'list', method: 'GET', url: '/topics', transform: transformList },
  { id: 'retrieve', method: 'GET', url: '/topics/:id', transform: transformRetrieve },
  { id: 'create', method: 'POST', url: '/topics' },
  { id: 'update', method: 'PUT', url: '/topics/:id' },
  { id: 'destroy', method: 'DELETE', url: '/topics/:id' },
  { id: 'follow', method: 'POST', url: '/topics/:id/follow' },
  { id: 'unfollow', method: 'POST', url: '/topics/:id/unfollow' },
  { id: 'favorite', method: 'POST', url: '/topics/:id/favorite' },
  { id: 'unfavorite', method: 'POST', url: '/topics/:id/unfavorite' },
  { id: 'action', method: 'POST', url: '/topics/:id/action' },
  { id: 'like', method: 'POST', url: '/likes' },
  { id: 'unlike', method: 'DELETE', url: '/likes' },
] as const
