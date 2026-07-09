export type TopicObject = {
  id: number
  title: string
  body: string
  bodyHtml: string
  nodeId: number
  nodeName: string
  excellent: boolean
  deleted: boolean
  repliesCount: number
  likesCount: number
  lastReplyUserId: number
  lastReplyUserLogin: string
  hits: number
  closedAt: string | null
  userId: number
  userName: string
  userLogin: string
  userAvatarUrl: string
  isFavorited: boolean
  isFollowed: boolean
  isLiked: boolean
  repliedAt: string
  createdAt: string
  updatedAt: string
}

export function transformTopic(data: Record<string, any>): TopicObject {
  const user = data.user || {}
  return {
    id: data.id,
    title: data.title,
    body: data.body,
    bodyHtml: data.body_html,
    nodeId: data.node_id,
    nodeName: data.node_name,
    excellent: !!data.excellent,
    deleted: !!data.deleted,
    repliesCount: data.replies_count,
    likesCount: data.likes_count,
    lastReplyUserId: data.last_reply_user_id,
    lastReplyUserLogin: data.last_reply_user_login,
    hits: data.hits,
    closedAt: data.closed_at ?? null,
    userId: user.id,
    userName: user.name,
    userLogin: user.login,
    userAvatarUrl: user.avatar_url,
    isFavorited: !!data.favorited,
    isFollowed: !!data.followed,
    isLiked: !!data.liked,
    repliedAt: data.replied_at,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }
}
