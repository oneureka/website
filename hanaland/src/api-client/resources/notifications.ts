import type { Notification } from '../types/notification'
import type { RequestFunction } from '../request'
import type { PageParams } from '../types/api'
import { notifications } from '../endpoints'

export class NotificationsResource {
  private api: RequestFunction

  constructor(api: RequestFunction) {
    this.api = api
  }

  list(params?: PageParams) {
    return this.api<{ notifications: Notification[] }>(notifications.list, params)
  }

  markAsRead(params?: { ids?: number[] }) {
    return this.api<void>(notifications.markAsRead, { data: params })
  }

  unreadCount() {
    return this.api<{ count: number }>(notifications.unreadCount)
  }

  destroy(params: { id: number }) {
    return this.api<void>(notifications.destroy, params)
  }

  clear() {
    return this.api<void>(notifications.clear)
  }
}
