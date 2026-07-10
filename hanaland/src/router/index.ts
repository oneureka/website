import { createRouter, createWebHistory } from 'vue-router'
import TopicList from '@pages/topics.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/topics' },
    { path: '/topics', name: 'topics', component: TopicList },
    {
      path: '/topics/new',
      name: 'topic-new',
      component: () => import('@pages/topics/new.vue'),
    },
    {
      path: '/topics/:id',
      name: 'topic-detail',
      component: () => import('@pages/topics/detail.vue'),
    },
    { path: '/login', name: 'login', component: () => import('@pages/login.vue') },
    {
      path: '/nodes',
      name: 'explore',
      component: () => import('@pages/nodes.vue'),
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('@pages/notifications.vue'),
    },
    {
      path: '/:login',
      component: () => import('@pages/user/home.vue'),
    },
    {
      path: '/:login/replies',
      component: () => import('@pages/user/replies.vue'),
    },
    {
      path: '/:login/followers',
      component: () => import('@pages/user/followers.vue'),
    },
    {
      path: '/:login/following',
      component: () => import('@pages/user/following.vue'),
    },
    {
      path: '/:login/favorites',
      component: () => import('@pages/user/favorites.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@pages/not-found.vue'),
    },
  ],
})

export default router
