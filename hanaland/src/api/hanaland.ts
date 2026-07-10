import { createRequest, type RequestFunction } from './request'
import { TopicsResource } from './resources/topics'
import { UsersResource } from './resources/users'
import { NodesResource } from './resources/nodes'
import { RepliesResource } from './resources/replies'
import { PhotosResource } from './resources/photos'
import { NotificationsResource } from './resources/notifications'

export type HanalandOptions = {
  baseUrl?: string
  auth?: string
}

export class Hanaland {
  request: RequestFunction
  topics: TopicsResource
  users: UsersResource
  nodes: NodesResource
  replies: RepliesResource
  photos: PhotosResource
  notifications: NotificationsResource

  private _setAuth: (value?: string) => void

  constructor({ baseUrl, auth }: HanalandOptions = {}) {
    const base = baseUrl || import.meta.env.HANALAND_API_URL || ''
    const ctx = createRequest(base)
    this.request = ctx.request
    this._setAuth = ctx.setAuth

    this.topics = new TopicsResource(this.request)
    this.users = new UsersResource(this.request)
    this.nodes = new NodesResource(this.request)
    this.replies = new RepliesResource(this.request)
    this.photos = new PhotosResource(this.request)
    this.notifications = new NotificationsResource(this.request)

    if (auth) ctx.setAuth(auth)
  }

  setToken(value: string) {
    this._setAuth(value)
  }

  revokeToken() {
    this._setAuth(undefined)
  }
}
