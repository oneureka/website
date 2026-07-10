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
      component: () => import('@pages/topics/[id].vue'),
    },
    { path: '/login', name: 'login', component: () => import('@pages/login.vue') },
    {
      path: '/explore',
      name: 'explore',
      component: () => import('@pages/explore.vue'),
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('@pages/notifications.vue'),
    },
    {
      path: '/top100',
      name: 'top100',
      component: () => import('@pages/top100.vue'),
    },
    {
      path: '/:login',
      component: () => import('@pages/[login].vue'),
    },
    {
      path: '/:login/replies',
      component: () => import('@pages/[login]/replies.vue'),
    },
    {
      path: '/:login/followers',
      component: () => import('@pages/[login]/followers.vue'),
    },
    {
      path: '/:login/following',
      component: () => import('@pages/[login]/following.vue'),
    },
    {
      path: '/:login/favorites',
      component: () => import('@pages/[login]/favorites.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@pages/[...pathMatch].vue'),
    },
  ],
})

export default router
