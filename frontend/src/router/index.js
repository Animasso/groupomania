
import VueRouter from 'vue-router'
import Perso from'../views/perso.vue'
const routes = [
    
    {
      path: '/',
      name: 'signin',
      component: () => import('../views/signin.vue')
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
    },
    {
      path: '/perso',
      name: 'perso',
      component: Perso
    }
  ]
  
  const router = new VueRouter({
    routes
  })
  
  export default router; 
  