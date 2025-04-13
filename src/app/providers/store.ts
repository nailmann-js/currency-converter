import { createPinia } from 'pinia'
import { $app } from '@/app/index'

export const $store = createPinia()
export const HandleStoreSettings = () => {
  $app.use($store)
}
