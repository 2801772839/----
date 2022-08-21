import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/Home.vue'
import DataList from '../components/DataList.vue'
import AdminEdit from '../components/AdminEdit.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'Reception',
    component: () => import('../page/Front.vue'),
    children: [
      {
        path: 'home',
        name: 'FrontHome',
        component: () => import('../page/Home.vue'),
      },
      {
        path: 'edit',
        name: 'Edit',
        component: () => import('../page/Markown.vue'),
      },
      {
        path: 'read',
        name: 'Read',
        component: () => import('../page/Read.vue'),
      },
      {
        path: 'details/:id',
        name: 'details',
        component: () => import('../components/BlogDetails.vue'),
      },
    ],
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
    children: [
      { path: '/datalist', name: 'DataList', component: DataList },
      { path: '/adminedit', name: 'AdminEdit', component: AdminEdit },
      {
        path: '/role',
        name: 'Role',
        component: () => import('../views/Role.vue'),
      },
      {
        path: '/personal',
        name: 'Personal',
        component: () => import('../views/Personal.vue'),
      },
    ],
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/Register.vue'),
  },
  {
    path: '*',
    component: () => import('../components/Err404.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
