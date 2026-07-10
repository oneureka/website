import { notifications as ep } from '../endpoints'
import type { RequestFunction } from '../request'
import type { Notification } from '../types/notification'

export class NotificationsResource {
  constructor(private api: RequestFunction) {}

  list(params?: { limit?: number; offset?: number }) {
    return this.api<{ notifications: Notification[] }>(ep.list, params)
  }

  markAsRead(params?: { ids?: number[] }) {
    return this.api<void>(ep.markAsRead, { data: params })
  }

  getUnreadCount() {
    return this.api<{ count: number }>(ep.getUnreadCount)
  }

  destroy(params: { id: number }) {
    return this.api<void>(ep.destroy, params)
  }

  clear() {
    return this.api<void>(ep.clear)
  }
}
