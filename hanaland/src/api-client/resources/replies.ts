import type { RequestFunction } from '../request'
import type { PageParams } from '../types/api'
import type { Reply } from '../types/reply'
import { replies } from '../endpoints'

export class RepliesResource {
  private api: RequestFunction

  constructor(api: RequestFunction) {
    this.api = api
  }

  list(params: { topic_id: number } & PageParams) {
    return this.api<{ replies: Reply[] }>(replies.list, params)
  }

  retrieve(params: { id: number }) {
    return this.api<Reply>(replies.retrieve, params)
  }

  create(params: { topic_id: number; body: string }) {
    return this.api<Reply>(replies.create, { data: params })
  }

  update(params: { id: number; body: string }) {
    return this.api<Reply>(replies.update, { data: params })
  }

  destroy(params: { id: number }) {
    return this.api<void>(replies.destroy, params)
  }

  like(params: { id: number; type: string }) {
    return this.api<void>(replies.like, { data: params })
  }

  unlike(params: { id: number; type: string }) {
    return this.api<void>(replies.unlike, { data: params })
  }
}
