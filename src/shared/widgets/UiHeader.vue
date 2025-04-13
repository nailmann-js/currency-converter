<template>
  <header class="flex align-items-center justify-content-between py-1 px-2 header-content">
    <router-link class="block" to="/"> Главная </router-link>
    <router-link class="block" to="/exchanger"> Конвертация </router-link>
    <div>
      <CurrencyDropdown v-model="currentCurrency" />
    </div>
  </header>
</template>

<script lang="ts" setup>
import CurrencyDropdown from '@/shared/widgets/CurrencyDropdown.vue'
import { useCurrency } from '../store/currency'
import { Currency } from '@/core/exchanger'
import { computed } from 'vue'

const currencyStore = useCurrency()
const currentCurrency = computed({
  get: () => {
    return currencyStore.currentCurrency
  },
  set: (val: Currency) => {
    currencyStore.currentCurrency = val
  },
})
</script>

<style lang="scss" scoped>
.header-content {
  background-color: seashell;
  z-index: 1;
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;

  a {
    text-decoration: none;
    color: #2c3e50;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.3s ease;
    font-weight: 500;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    &.router-link-active {
      color: #42b983;
      font-weight: bold;
    }
  }
}
</style>
