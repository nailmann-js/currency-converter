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
