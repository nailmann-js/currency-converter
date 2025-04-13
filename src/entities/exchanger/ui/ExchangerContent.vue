<template>
  <div>
    <h1>Конвертация</h1>
    <div class="currency-converter">
      <input type="number" v-model.number="formatedInput" placeholder="Введите сумму" />
      <CurrencyDropdown v-model="selectedInputOption" />
    </div>
    <div class="currency-converter">
      <input type="number" v-model.number="formatedOutput" placeholder="Результат" />
      <CurrencyDropdown v-model="selectedOutputOption" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, unref } from 'vue'
import { useCurrency } from '@/shared/store/currency'
import CurrencyDropdown from '@/shared/widgets/CurrencyDropdown.vue'
import { Currency, type ResponseKey } from '@/core/exchanger'
import { watch } from 'vue'

const currencyStore = useCurrency()
const selectedInputOption = ref<Currency>(Currency.RUB)
const selectedOutputOption = ref<Currency>(Currency.USD)
const input = ref(0)
const output = ref(0)

const formatedInput = computed<number>({
  get: () => {
    return unref(input)
  },
  set: (val: number) => {
    input.value = val
    output.value = convertOutputValues({
      inputVal: val,
      inputCurr: selectedInputOption.value,
      outputCurr: selectedOutputOption.value,
    })
  },
})

const formatedOutput = computed<number>({
  get: () => {
    return unref(output)
  },
  set: (val: number) => {
    output.value = val
    input.value = convertOutputValues({
      inputVal: val,
      inputCurr: selectedOutputOption.value,
      outputCurr: selectedInputOption.value,
    })
  },
})

watch([selectedInputOption, selectedOutputOption], () => {
  formatedInput.value = unref(input)
})

const convertOutputValues = ({
  inputVal,
  inputCurr,
  outputCurr,
}: {
  inputCurr: Currency
  outputCurr: Currency
  inputVal: number
}) => {
  if (inputCurr === outputCurr) {
    return inputVal
  }

  const key: ResponseKey = `${inputCurr}-${outputCurr}`
  const number = inputVal * (currencyStore.currentCourses?.[key] ?? 0)

  return parseFloat(number.toFixed(2))
}

onMounted(currencyStore.getCours)
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
