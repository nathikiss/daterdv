import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Propositions from '../views/Propositions.vue'
//import Connexion from '../views/Connexion.vue'
import Inscription from '../views/Inscription.vue'
import Votes from '../views/Votes.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/propositions',
    name: 'Propositions',
    component: Propositions
  },
  // {
  //   path: '/connexion',
  //   name: 'Connexion',
  //   component: Connexion
  // },
  {
    path: '/inscription',
    name: 'Inscription',
    component: Inscription
  },
  {
    path: '/votes',
    name: 'Votes',
    component: Votes
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
