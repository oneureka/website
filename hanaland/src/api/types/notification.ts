export interface Notification {
  id: number
  type: string
  read: boolean
  actor: {
    id: number
    login: string
    name: string
    avatar_url: string
  }
  mention_type: string
  created_at: string
  updated_at: string
}
