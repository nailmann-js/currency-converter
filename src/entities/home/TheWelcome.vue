<template>
  <div>
    <div v-for="[key, value] in Object.entries(selectedCourses)" :key="key">
      <span>{{ `1 ${key} = ${value} ${currencyStore.currentCurrency}` }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useCurrency } from '@/shared/store/currency'

const currencyStore = useCurrency()

onMounted(() => {
  currencyStore.getCours()
})

const selectedCourses = computed(() => {
  switch (currencyStore.currentCurrency) {
    case 'USD':
      return {
        RUB: currencyStore.currentCourses?.['rub-usd'],
        EUR: currencyStore.currentCourses?.['eur-usd'],
      }
    case 'RUB':
      return {
        USD: currencyStore.currentCourses?.['usd-rub'],
        EUR: currencyStore.currentCourses?.['eur-rub'],
      }
    case 'EUR':
      return {
        USD: currencyStore.currentCourses?.['usd-eur'],
        RUB: currencyStore.currentCourses?.['rub-eur'],
      }
    default:
      return {
        USD: 1,
        RUB: 1,
        EUR: 1,
      }
  }
})
</script>
