// Imports
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/user',
      component: () => import('@/views/user-layout/Index.vue'),
      children: [
        {
          path: 'question',
          name: 'question',
          component: () => import('@/views/user/Question.vue'),
          meta: { requireAuth: true },
        },
        {
          path: 'comment',
          name: 'comment',
          component: () => import('@/views/user/Comment.vue'),
          meta: { requireAuth: true },
        },
        {
          path: 'resource',
          name: 'resource',
          component: () => import('@/views/user/Resource.vue'),
          meta: { requireAuth: true },
        },
        {
          path: 'report',
          name: 'report',
          component: () => import('@/views/user/Report.vue'),
          meta: { requireAuth: true },
        },
        {
          path: 'count',
          name: 'count',
          component: () => import('@/views/user/User.vue'),
          meta: { requireAuth: true },
        },
      ],
    },
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
  ],
})

export default router
