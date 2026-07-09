export default [
  { id: 'list', method: 'GET', url: '/notifications' },
  { id: 'markAsRead', method: 'POST', url: '/notifications/read' },
  { id: 'getUnreadCount', method: 'GET', url: '/notifications/unread_count' },
  { id: 'destroy', method: 'DELETE', url: '/notifications/:id' },
  { id: 'clear', method: 'DELETE', url: '/notifications/all' },
] as const
