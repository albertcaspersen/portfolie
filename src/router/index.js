// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/Home.vue'
import About from '@/About.vue'
import Projects from '@/Projects.vue'
import Contact from '@/Contact.vue'

const routes = [
  // Din redirect er fin, den behøver ikke meta-data.
  { path: '/', redirect: '/about' },

  // Vi tildeler en logisk rækkefølge til dine sider.
  {
    path: '/about',
    component: About,
    meta: { order: 0 } // Startside
  },
  {
    path: '/projects',
    component: Projects,
    meta: { order: 1 } // Næste side
  },
  {
    path: '/contact',
    component: Contact,
    meta: { order: 2 } // Sidste side
  },
  {
    path: '/home',
    component: Home,
    meta: { order: 99 } // Giver et højt tal, hvis den er udenfor normal navigation
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router