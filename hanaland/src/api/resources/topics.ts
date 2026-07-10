import { topics as ep } from '../endpoints'
import type { RequestFunction } from '../request'
import type { Topic } from '../types/topic'

export class TopicsResource {
  constructor(private api: RequestFunction) {}

  list(params?: { limit?: number; offset?: number }) {
    return this.api<{ topics: Topic[] }>(ep.list, params)
  }

  retrieve(params: { id: number }) {
    return this.api<Topic>(ep.retrieve, params)
  }

  create(params: { title: string; body: string; node_id: number }) {
    return this.api<Topic>(ep.create, { data: params })
  }

  update(params: { id: number; title?: string; body?: string; node_id?: number }) {
    return this.api<Topic>(ep.update, { data: params })
  }

  destroy(params: { id: number }) {
    return this.api<void>(ep.destroy, params)
  }

  follow(params: { id: number }) {
    return this.api<void>(ep.follow, params)
  }

  unfollow(params: { id: number }) {
    return this.api<void>(ep.unfollow, params)
  }

  favorite(params: { id: number }) {
    return this.api<void>(ep.favorite, params)
  }

  unfavorite(params: { id: number }) {
    return this.api<void>(ep.unfavorite, params)
  }

  action(params: { id: number }) {
    return this.api<void>(ep.action, params)
  }

  like(params: { id: number; type: string }) {
    return this.api<void>(ep.like, { data: params })
  }

  unlike(params: { id: number; type: string }) {
    return this.api<void>(ep.unlike, { data: params })
  }
}
