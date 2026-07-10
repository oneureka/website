import { createRouter, createWebHistory } from 'vue-router'
import TopicList from '@views/TopicList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/topics' },
    { path: '/topics', name: 'topics', component: TopicList },
    {
      path: '/topics/new',
      name: 'topic-new',
      component: () => import('@views/TopicNew.vue'),
    },
    {
      path: '/topics/:id',
      name: 'topic-detail',
      component: () => import('@views/TopicDetail.vue'),
    },
    { path: '/login', name: 'login', component: () => import('@views/Login.vue') },
    {
      path: '/explore',
      name: 'explore',
      component: () => import('@views/Explore.vue'),
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('@views/Notifications.vue'),
    },
    {
      path: '/top100',
      name: 'top100',
      component: () => import('@views/Top100.vue'),
    },
    {
      path: '/:login',
      component: () => import('@views/UserHome.vue'),
    },
    {
      path: '/:login/replies',
      component: () => import('@views/UserReplies.vue'),
    },
    {
      path: '/:login/followers',
      component: () => import('@views/UserFollowers.vue'),
    },
    {
      path: '/:login/following',
      component: () => import('@views/UserFollowing.vue'),
    },
    {
      path: '/:login/favorites',
      component: () => import('@views/UserFavorites.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@views/NotFound.vue'),
    },
  ],
})

export default router
