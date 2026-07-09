import type { User } from './user'

export type Reply = {
  id: number
  body: string
  body_html: string
  topic_id: number
  topic_title: string
  deleted: boolean
  likes_count: number
  user: User
  created_at: string
  updated_at: string
}
