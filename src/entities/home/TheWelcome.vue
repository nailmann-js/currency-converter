<template>
  <div>
    <h1>Курс валют</h1>
    <ul class="currency-list">
      <li
        v-for="[key, value] in Object.entries(selectedCourses)"
        :key="key"
        class="currency-list-item"
      >
        <span>{{ `1 ${key}` }}</span>
        <span>
          {{ value }}
          <span class="current-currency">{{ currencyStore.currentCurrency }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, unref } from 'vue'
import { useCurrency } from '@/shared/store/currency'
import { Currency, type ResponseKey, currencyOptions } from '@/core/exchanger'

const currencyStore = useCurrency()
const currentCurrency = computed<Currency>(() => currencyStore.currentCurrency)

onMounted(currencyStore.getCours)

const selectedCourses = computed(() => {
  return currencyOptions
    .filter((currency) => currency !== currencyStore.currentCurrency)
    .reduce(
      (acc, currency) => {
        const key: ResponseKey = `${currency}-${unref(currentCurrency)}`
        acc[currency] = currencyStore.currentCourses?.[key] ?? 0

        return acc
      },
      {} as Record<Currency, number>,
    )
})
</script>

<style lang="scss" scoped>
div {
  min-width: 800px;
  padding: 0 1rem;
}

.currency-list {
  display: grid;
  gap: 1rem;
  padding: 0;
  margin: 0;
  list-style: none;

  &-item {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.1rem;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    span {
      color: #2c3e50;
      font-weight: 500;

      &:first-child {
        font-size: 1.2rem;
        font-weight: bold;
      }
    }

    .current-currency {
      background-color: #42b983;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      margin-left: 0.5rem;
      font-size: 0.9rem;
    }
  }
}
</style>
