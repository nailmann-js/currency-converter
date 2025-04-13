import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Currency, type CurrencyResponse, CurrencyAPI } from '@/core/exchanger'

export const useCurrency = defineStore('currencyStore', () => {
  const currentCurrency = ref<Currency>(Currency.RUB)
  const currentCourses = ref<CurrencyResponse>()

  const getCours = function () {
    try {
      CurrencyAPI.GetCurrencyCours().then((res) => {
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
