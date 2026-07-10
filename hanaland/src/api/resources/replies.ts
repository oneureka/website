import { replies as ep } from '../endpoints'
import type { RequestFunction } from '../request'
import type { Reply } from '../types/reply'

export class RepliesResource {
  constructor(private api: RequestFunction) {}

  list(params: { topic_id: number } & { limit?: number; offset?: number }) {
    return this.api<{ replies: Reply[] }>(ep.list, params)
  }

  retrieve(params: { id: number }) {
    return this.api<Reply>(ep.retrieve, params)
  }

  create(params: { topic_id: number; body: string }) {
    return this.api<Reply>(ep.create, { data: params })
  }

  update(params: { id: number; body: string }) {
    return this.api<Reply>(ep.update, { data: params })
  }

  destroy(params: { id: number }) {
    return this.api<void>(ep.destroy, params)
  }

  like(params: { id: number; type: string }) {
    return this.api<void>(ep.like, { data: params })
  }

  unlike(params: { id: number; type: string }) {
    return this.api<void>(ep.unlike, { data: params })
  }
}
