import type { User } from './user'

export type Topic = {
  id: number
  title: string
  body: string
  body_html: string
  node_id: number
  node_name: string
  excellent: boolean
  deleted: boolean
  replies_count: number
  likes_count: number
  last_reply_user_id: number
  last_reply_user_login: string
  hits: number
  closed_at: string | null
  user: User
  replied_at: string
  created_at: string
  updated_at: string
}
