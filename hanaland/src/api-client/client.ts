import { type RequestFunction } from './types/api'
import { createRequest } from './request'
import ky from 'ky'

import { NodesResource } from './resources/nodes'
import { NotificationsResource } from './resources/notifications'
import { PhotosResource } from './resources/photos'
import { RepliesResource } from './resources/replies'
import { TopicsResource } from './resources/topics'
import { UsersResource } from './resources/users'

export interface ClientOptions {
  baseUrl?: string
  auth?: string
}

export class Client {
  readonly request: RequestFunction
  readonly nodes: NodesResource
  readonly notifications: NotificationsResource
  readonly photos: PhotosResource
  readonly replies: RepliesResource
  readonly topics: TopicsResource
  readonly users: UsersResource

  private readonly _setAuth: (value?: string) => void

  constructor({ baseUrl, auth }: ClientOptions = {}) {
    const ctx = createRequest(ky, baseUrl ?? '')
    this.request = ctx.request
    this._setAuth = ctx.setAuth

    this.nodes = new NodesResource(this.request)
    this.notifications = new NotificationsResource(this.request)
    this.photos = new PhotosResource(this.request)
    this.replies = new RepliesResource(this.request)
    this.topics = new TopicsResource(this.request)
    this.users = new UsersResource(this.request)

    if (auth) ctx.setAuth(auth)
  }

  setToken(value: string) {
    this._setAuth(value)
  }

  revokeToken() {
    this._setAuth(undefined)
  }
}
