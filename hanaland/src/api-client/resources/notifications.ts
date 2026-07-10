import { notifications } from '../endpoints'
import type { RequestFunction } from '../request'
import type { Notification } from '../types/notification'
import type { PageParams } from '../types/page'

export class NotificationsResource {
  constructor(private api: RequestFunction) {}

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
