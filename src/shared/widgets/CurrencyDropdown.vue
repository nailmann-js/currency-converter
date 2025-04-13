<template>
  <div>
    <select name="select" v-model="selectedValue" @change="$emit('changeValue', selectedValue)">
      <option v-for="value in availableOptions" :key="value">{{ value }}</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    selectedCurrency: string
  }>(),
  {
    selectedCurrency: 'RUB',
  },
)

const availableOptions = ['USD', 'EUR', 'RUB']
const selectedValue = ref(props.selectedCurrency)

watch(
  () => props.selectedCurrency,
  (val) => {
    selectedValue.value = val
  },
)
</script>
