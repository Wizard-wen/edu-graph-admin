import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/pr/list',
        name: 'PullRequestList',
        component: () => import(/* webpackChunkName: "about" */ '../views/pull.request/pull-request-list.vue')
      },
      {
        path: '/user/list',
        name: 'UserList',
        component: () => import(/* webpackChunkName: "about" */ '../views/user.list.vue')
      },
      {
        path: '/domainBaseType/list',
        name: 'DomainBaseTypeList',
        component: () => import('../views/domain/domain-base-type-list.vue')
      },
      {
        path: '/domain/list',
        name: 'DomainList',
        component: () => import('../views/domain/domain-list.vue')
      },
      {
        path: '/tag/list',
        name: 'TagList',
        component: () => import('../views/tag/tag-list.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
