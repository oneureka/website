export type ReplyObject = {
  id: number
  body: string
  bodyHtml: string
  topicId: number
  topicTitle: string
  deleted: boolean
  likesCount: number
  userId: number
  userName: string
  userLogin: string
  userAvatarUrl: string
  createdAt: string
  updatedAt: string
}

export function transformReply(data: Record<string, any>): ReplyObject {
  const user = data.user || {}
  return {
    id: data.id,
    body: data.body,
    bodyHtml: data.body_html,
    topicId: data.topic_id,
    topicTitle: data.topic_title,
    deleted: !!data.deleted,
    likesCount: data.likes_count,
    userId: user.id,
    userName: user.name,
    userLogin: user.login,
    userAvatarUrl: user.avatar_url,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }
}
