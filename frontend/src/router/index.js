import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import signin from '../views/signin.vue'

const routes = [
    
    {
      path: '/',
      name: 'signin',
      component: signin
    },
    
    { 
      path: '/wall',
      name: 'wall',
      component: () => import('../views/wall.vue')
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import('../views/profil.vue')
    }
  ]
  
  const router = new VueRouter({
    routes
  })
  
  export default router
  