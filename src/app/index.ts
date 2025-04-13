import '@/app/assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { HandleStoreSettings } from '@/app/providers/store'
import { HandleRouterSettings } from '@/app/providers/router'

export const $app = createApp(App)

// Подключаем роутер и его преднастройки
HandleRouterSettings()

// Подключаем хранилище и его преднастройки
HandleStoreSettings()
