export type NotificationObject = {
  id: number
  type: string
  read: boolean
  actor: {
    id: number
    login: string
    name: string
    avatarUrl: string
  }
  mentionType: string
  createdAt: string
  updatedAt: string
}

export function transformNotification(data: Record<string, any>): NotificationObject {
  const actor = data.actor || {}
  return {
    id: data.id,
    type: data.type,
    read: !!data.read,
    actor: {
      id: actor.id,
      login: actor.login,
      name: actor.name,
      avatarUrl: actor.avatar_url,
    },
    mentionType: data.mention_type,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }
}
