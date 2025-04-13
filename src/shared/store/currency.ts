import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Currency, type CurrencyResponse } from '@/core/exchanger'

export const useCurrency = defineStore('currencyStore', () => {
  const currentCurrency = ref<'USD' | 'EUR' | 'RUB'>('RUB')
  const currentCourses = ref<CurrencyResponse>()

  const getCours = function () {
    try {
      Currency.GetCurrencyCours().then((res) => {
        currentCourses.value = res
      })
    } catch (error) {
      console.log(error)
    }
  }

  return {
    currentCurrency,
    currentCourses,
    getCours,
  }
})
