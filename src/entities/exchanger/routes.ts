import { type RouteRecordRaw } from 'vue-router'

export const exchangeRoutes: RouteRecordRaw[] = [
  {
    path: '/exchanger',
    name: 'Exchanger',
    children: [
      {
        name: 'Main page',
        path: '',
        component: () => import('@/pages/exchanger/ExchangerIndexPage.vue'),
      },
    ],
  },
]
