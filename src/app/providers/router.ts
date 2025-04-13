import { $app } from '@/app/index'
import { type RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/home/HomeView.vue'
import { exchangeRoutes } from '@/entities/exchanger/routes'

export const $routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  ...exchangeRoutes,
]

export const $router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: $routes,
})

export const HandleRouterSettings = () => {
  $app.use($router)
}
