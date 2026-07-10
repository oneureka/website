import { topics } from '../endpoints'
import type { RequestFunction } from '../request'
import type { Topic } from '../types/topic'
import type { PageParams } from '../types/page'

export class TopicsResource {
  constructor(private api: RequestFunction) {}

  list(params?: PageParams) {
    return this.api<{ topics: Topic[] }>(topics.list, params)
  }

  retrieve(params: { id: number }) {
    return this.api<Topic>(topics.retrieve, params)
  }

  create(params: { title: string; body: string; node_id: number }) {
    return this.api<Topic>(topics.create, { data: params })
  }

  update(params: { id: number; title?: string; body?: string; node_id?: number }) {
    return this.api<Topic>(topics.update, { data: params })
  }

  destroy(params: { id: number }) {
    return this.api<void>(topics.destroy, params)
  }

  follow(params: { id: number }) {
    return this.api<void>(topics.follow, params)
  }

  unfollow(params: { id: number }) {
    return this.api<void>(topics.unfollow, params)
  }

  favorite(params: { id: number }) {
    return this.api<void>(topics.favorite, params)
  }

  unfavorite(params: { id: number }) {
    return this.api<void>(topics.unfavorite, params)
  }

  action(params: { id: number }) {
    return this.api<void>(topics.action, params)
  }

  like(params: { id: number; type: string }) {
    return this.api<void>(topics.like, { data: params })
  }

  unlike(params: { id: number; type: string }) {
    return this.api<void>(topics.unlike, { data: params })
  }
}
