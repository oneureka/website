import type { ReplyObject } from '../types/reply'
import { transformReply } from '../types/reply'
import { withNextCursor } from '../utils'

function transformList(data: any, params: any) {
  const items = (data.replies || []).map(transformReply) as ReplyObject[]
  return withNextCursor(items, params)
}

function transformRetrieve(data: any) {
  return transformReply(data.reply)
}

export default [
  { id: 'list', method: 'GET', url: '/topics/:topic_id/replies', transform: transformList },
  { id: 'retrieve', method: 'GET', url: '/replies/:id', transform: transformRetrieve },
  { id: 'create', method: 'POST', url: '/topics/:topic_id/replies' },
  { id: 'update', method: 'POST', url: '/replies/:id' },
  { id: 'destroy', method: 'DELETE', url: '/replies/:id' },
  { id: 'like', method: 'POST', url: '/likes' },
  { id: 'unlike', method: 'DELETE', url: '/likes' },
] as const
