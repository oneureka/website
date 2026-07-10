import { users } from '../endpoints'
import type { RequestFunction } from '../request'
import type { User } from '../types/user'
import type { Topic } from '../types/topic'
import type { Reply } from '../types/reply'
import type { PageParams } from '../types/page'

export class UsersResource {
  constructor(private api: RequestFunction) {}

  list(params?: PageParams) {
    return this.api<{ users: User[] }>(users.list, params)
  }

  retrieve(params: { id: number }) {
    return this.api<User>(users.retrieve, params)
  }

  current() {
    return this.api<User>(users.current)
  }

  follow(params: { id: number }) {
    return this.api<void>(users.follow, params)
  }

  unfollow(params: { id: number }) {
    return this.api<void>(users.unfollow, params)
  }

  block(params: { id: number }) {
    return this.api<void>(users.block, params)
  }

  unblock(params: { id: number }) {
    return this.api<void>(users.unblock, params)
  }

  listBlocked(params: { id: number } & PageParams) {
    return this.api<{ users: User[] }>(users.listBlocked, params)
  }

  listTopics(params: { id: number } & PageParams) {
    return this.api<{ topics: Topic[] }>(users.listTopics, params)
  }

  listReplies(params: { id: number } & PageParams) {
    return this.api<{ replies: Reply[] }>(users.listReplies, params)
  }

  listFavorites(params: { id: number } & PageParams) {
    return this.api<{ topics: Topic[] }>(users.listFavorites, params)
  }

  listFollowers(params: { id: number } & PageParams) {
    return this.api<{ users: User[] }>(users.listFollowers, params)
  }

  listFollowing(params: { id: number } & PageParams) {
    return this.api<{ users: User[] }>(users.listFollowing, params)
  }
}
