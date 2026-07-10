export const nodes = {
  list: { method: "GET", url: "/nodes" },
  retrieve: { method: "GET", url: "/nodes/:id" },
} as const;

export const notifications = {
  list: { method: "GET", url: "/notifications" },
  markAsRead: { method: "POST", url: "/notifications/read" },
  unreadCount: { method: "GET", url: "/notifications/unread_count" },
  destroy: { method: "DELETE", url: "/notifications/:id" },
  clear: { method: "DELETE", url: "/notifications/all" },
} as const;

export const photos = {
  create: { method: "POST", url: "/photos" },
} as const;

export const replies = {
  list: { method: "GET", url: "/topics/:topic_id/replies" },
  retrieve: { method: "GET", url: "/replies/:id" },
  create: { method: "POST", url: "/topics/:topic_id/replies" },
  update: { method: "POST", url: "/replies/:id" },
  destroy: { method: "DELETE", url: "/replies/:id" },
  like: { method: "POST", url: "/likes" },
  unlike: { method: "DELETE", url: "/likes" },
} as const;

export const topics = {
  list: { method: "GET", url: "/topics" },
  retrieve: { method: "GET", url: "/topics/:id" },
  create: { method: "POST", url: "/topics" },
  update: { method: "PUT", url: "/topics/:id" },
  destroy: { method: "DELETE", url: "/topics/:id" },
  follow: { method: "POST", url: "/topics/:id/follow" },
  unfollow: { method: "POST", url: "/topics/:id/unfollow" },
  favorite: { method: "POST", url: "/topics/:id/favorite" },
  unfavorite: { method: "POST", url: "/topics/:id/unfavorite" },
  action: { method: "POST", url: "/topics/:id/action" },
  like: { method: "POST", url: "/likes" },
  unlike: { method: "DELETE", url: "/likes" },
} as const;

export const users = {
  list: { method: "GET", url: "/users" },
  retrieve: { method: "GET", url: "/users/:id" },
  current: { method: "GET", url: "/users/me" },
  follow: { method: "POST", url: "/users/:id/follow" },
  unfollow: { method: "POST", url: "/users/:id/unfollow" },
  block: { method: "POST", url: "/users/:id/block" },
  unblock: { method: "POST", url: "/users/:id/unblock" },
  listBlocked: { method: "GET", url: "/users/:id/blocked" },
  listTopics: { method: "GET", url: "/users/:id/topics" },
  listReplies: { method: "GET", url: "/users/:id/replies" },
  listFavorites: { method: "GET", url: "/users/:id/favorites" },
  listFollowers: { method: "GET", url: "/users/:id/followers" },
  listFollowing: { method: "GET", url: "/users/:id/following" },
} as const;
