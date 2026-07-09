export default [
  { id: 'list', method: 'GET', url: '/topics/:topic_id/replies' },
  { id: 'retrieve', method: 'GET', url: '/replies/:id' },
  { id: 'create', method: 'POST', url: '/topics/:topic_id/replies' },
  { id: 'update', method: 'POST', url: '/replies/:id' },
  { id: 'destroy', method: 'DELETE', url: '/replies/:id' },
  { id: 'like', method: 'POST', url: '/likes' },
  { id: 'unlike', method: 'DELETE', url: '/likes' },
] as const
