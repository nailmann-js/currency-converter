<template>
  <div>Конвертация</div>
  <div class="currency-converter">
    <input type="number" v-model="inputCurrency" @input="convertOutputValues" />
    <CurrencyDropdown :selectedCurrency="selectedInputOption" @changeValue="changeInputValue" />
  </div>
  <div class="currency-converter">
    <input type="number" v-model="outputCurrency" @input="convertInputValues" />
    <CurrencyDropdown :selectedCurrency="selectedOutputOption" @changeValue="changeOutputValue" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useCurrency } from '@/shared/store/currency'
import CurrencyDropdown from '@/shared/widgets/CurrencyDropdown.vue'

const currencyStore = useCurrency()
const selectedInputOption = ref<string>('RUB')
const selectedOutputOption = ref<string>('USD')
const inputCurrency = ref<number>()
const outputCurrency = ref<number>()

const changeInputValue = (val: 'USD' | 'EUR' | 'RUB') => {
  if (val === selectedOutputOption.value) {
    selectedOutputOption.value = selectedInputOption.value
  }
  selectedInputOption.value = val
  convertOutputValues()
}

const changeOutputValue = (val: 'USD' | 'EUR' | 'RUB') => {
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

<style lang="scss">
.currency-converter {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  select {
    margin-left: 10px;
  }
}
</style>
