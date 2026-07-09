export default [
  { id: 'list', method: 'GET', url: '/topics' },
  { id: 'retrieve', method: 'GET', url: '/topics/:id' },
  { id: 'create', method: 'POST', url: '/topics' },
  { id: 'update', method: 'PUT', url: '/topics/:id' },
  { id: 'destroy', method: 'DELETE', url: '/topics/:id' },
  { id: 'follow', method: 'POST', url: '/topics/:id/follow' },
  { id: 'unfollow', method: 'POST', url: '/topics/:id/unfollow' },
  { id: 'favorite', method: 'POST', url: '/topics/:id/favorite' },
  { id: 'unfavorite', method: 'POST', url: '/topics/:id/unfavorite' },
  { id: 'action', method: 'POST', url: '/topics/:id/action' },
  { id: 'like', method: 'POST', url: '/likes' },
  { id: 'unlike', method: 'DELETE', url: '/likes' },
] as const
