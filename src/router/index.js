import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { title: 'Login - Welcome Back' }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
      meta: { title: 'Sign Up - Create Account' }
    }
  ]
})

// Update page title on route change
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Login'
  next()
})

export default router
