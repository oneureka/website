import { users as ep } from '../endpoints'
import type { RequestFunction } from '../request'
import type { User } from '../types/user'
import type { Topic } from '../types/topic'
import type { Reply } from '../types/reply'

export class UsersResource {
  constructor(private api: RequestFunction) {}

  list(params?: { limit?: number; offset?: number }) {
    return this.api<{ users: User[] }>(ep.list, params)
  }

  retrieve(params: { id: number }) {
    return this.api<User>(ep.retrieve, params)
  }

  getAuthenticated() {
    return this.api<User>(ep.getAuthenticated)
  }

  follow(params: { id: number }) {
    return this.api<void>(ep.follow, params)
  }

  unfollow(params: { id: number }) {
    return this.api<void>(ep.unfollow, params)
  }

  block(params: { id: number }) {
    return this.api<void>(ep.block, params)
  }

  unblock(params: { id: number }) {
    return this.api<void>(ep.unblock, params)
  }

  listBlocked(params: { id: number } & { limit?: number; offset?: number }) {
    return this.api<{ users: User[] }>(ep.listBlocked, params)
  }

  listTopics(params: { id: number } & { limit?: number; offset?: number }) {
    return this.api<{ topics: Topic[] }>(ep.listTopics, params)
  }

  listReplies(params: { id: number } & { limit?: number; offset?: number }) {
    return this.api<{ replies: Reply[] }>(ep.listReplies, params)
  }

  listFavorites(params: { id: number } & { limit?: number; offset?: number }) {
    return this.api<{ topics: Topic[] }>(ep.listFavorites, params)
  }

  listFollowers(params: { id: number } & { limit?: number; offset?: number }) {
    return this.api<{ users: User[] }>(ep.listFollowers, params)
  }

  listFollowing(params: { id: number } & { limit?: number; offset?: number }) {
    return this.api<{ users: User[] }>(ep.listFollowing, params)
  }
}
