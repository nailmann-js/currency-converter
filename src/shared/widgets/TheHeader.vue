<template>
  <header class="flex align-items-center justify-content-between py-1 px-2 header-content">
    <router-link class="block" to="/"> Главная </router-link>
    <router-link class="block" to="/exchanger"> Конвертация </router-link>
    <div class="dropdown">
      <CurrencyDropdown
        :selectedCurrency="currencyStore.currentCurrency"
        @changeValue="changeValue"
      />
    </div>
  </header>
</template>

<script lang="ts" setup>
import CurrencyDropdown from '@/shared/widgets/CurrencyDropdown.vue'
import { useCurrency } from '../store/currency'

const currencyStore = useCurrency()

const changeValue = (val: 'USD' | 'EUR' | 'RUB') => {
  currencyStore.currentCurrency = val
}
</script>

<style lang="scss" scoped>
.header-content {
  background-color: seashell;
  z-index: 1;
}
.dropdown {
  display: flex;
  align-items: center;
}
</style>
