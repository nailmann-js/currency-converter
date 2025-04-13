<template>
  <div>
    <h1>Конвертация</h1>
    <div class="currency-converter">
      <input
        type="number"
        v-model="inputCurrency"
        @input="convertOutputValues"
        placeholder="Введите сумму"
      />
      <CurrencyDropdown :selectedCurrency="selectedInputOption" @changeValue="changeInputValue" />
    </div>
    <div class="currency-converter">
      <input
        type="number"
        v-model="outputCurrency"
        @input="convertInputValues"
        placeholder="Результат"
      />
      <CurrencyDropdown :selectedCurrency="selectedOutputOption" @changeValue="changeOutputValue" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useCurrency } from '@/shared/store/currency'
import CurrencyDropdown from '@/shared/widgets/CurrencyDropdown.vue'
import type { PossibleCurrency } from '@/core/exchanger'

const currencyStore = useCurrency()
const selectedInputOption = ref<string>('RUB')
const selectedOutputOption = ref<string>('USD')
const inputCurrency = ref<number>()
const outputCurrency = ref<number>()

const changeInputValue = (val: PossibleCurrency) => {
  if (val === selectedOutputOption.value) {
    selectedOutputOption.value = selectedInputOption.value
  }
  selectedInputOption.value = val
  convertOutputValues()
}

const changeOutputValue = (val: PossibleCurrency) => {
  if (val === selectedInputOption.value) {
    selectedInputOption.value = selectedOutputOption.value
  }
  selectedOutputOption.value = val
  convertOutputValues()
}

const convertOutputValues = function () {
  if (typeof inputCurrency.value === 'number') {
    const number =
      inputCurrency.value *
      // @ts-expect-error: Because we need to get key from options like "usd-rub" to get value from currentCourses
      currencyStore.currentCourses[
        `${selectedInputOption.value.toLowerCase()}-${selectedOutputOption.value.toLocaleLowerCase()}`
      ]
    outputCurrency.value = parseFloat(number.toFixed(2))
  } else {
    outputCurrency.value = 0
  }
}

const convertInputValues = function () {
  if (typeof outputCurrency.value === 'number') {
    const number =
      outputCurrency.value *
      // @ts-expect-error: Because we need to get key from options like "usd-rub" to get value from currentCourses
      currencyStore.currentCourses[
        `${selectedOutputOption.value.toLocaleLowerCase()}-${selectedInputOption.value.toLowerCase()}`
      ]
    inputCurrency.value = parseFloat(number.toFixed(2))
  } else {
    inputCurrency.value = 0
  }
}

onMounted(() => {
  currencyStore.getCours()
})
</script>

<style lang="scss" scoped>
div {
  max-width: 800px;
  padding: 0 1rem;
}

.currency-converter {
  display: flex;
  gap: 1rem;
  align-items: center;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.5rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  input {
    flex: 1;
    padding: 0.8rem 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1.1rem;
    color: #2c3e50;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #42b983;
      box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
    }

    &::placeholder {
      color: #999;
    }
  }
}
</style>
