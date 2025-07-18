import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/Home.vue'
import About from '@/About.vue'
import Projects from '@/Projects.vue'
import Contact from '@/Contact.vue'

const routes = [
  { path: '/', redirect: '/about' }, // 👈 Redirect til /about
  { path: '/about', component: About },
  { path: '/projects', component: Projects },
  { path: '/contact', component: Contact },
  { path: '/home', component: Home } // 👈 Hvis du stadig vil beholde Home
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
