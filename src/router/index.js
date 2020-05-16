import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '',
        name: 'ulogiranioglasi',
        component: () => import(/* webpackChunkName: "post-detail" */'../views/ulogiranioglasi.vue')
      },
      {
        path: 'post/:id',
        props: true,
            name: 'post-detail',
        component: () => import('../views/detalji.vue')
      }
    ]
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/postavioglas',
    name: 'postavioglas',
    component: () => import('../views/postavioglas.vue')
  },
  {
    path: '/pregledoglasa',
    name: 'pregledoglasa',
    component: () => import('../views/pregledoglasa.vue')
  },
  {
    path: '/oglasiposlodavac',
    name: 'oglasiposlodavac',
    component: () => import('../views/oglasiposlodavac.vue')
  },
  {
    path: '/profil',
    name: 'profil',
    component: () => import('../views/profil.vue')
  },
  {
    path: '/promjenalozinke',
    name: 'promjenalozinke',
    component: () => import('../views/promjenalozinke.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin.vue')
  },
  {
    path: '/prijave',
    name: 'prijave',
    component: () => import('../views/prijave.vue')
  },
  {
    path: '/prijaveoglasivac',
    name: 'prijaveoglasivac',
    component: () => import('../views/prijaveoglasivac.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
