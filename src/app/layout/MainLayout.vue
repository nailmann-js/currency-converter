<template>
  <div class="main-layout">
    <UiHeader class="header" />

    <main style="padding: 24px" class="content h-full w-full">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import UiHeader from '@/shared/widgets/UiHeader.vue'
import { onMounted } from 'vue'

const AppMountedHandlers = async () => {
  try {
  } catch (error) {
    console.log(error)
    // Обработка ошибок при загрузке данных
  }
}

onMounted(AppMountedHandlers)
</script>

<style lang="scss" scoped>
.header {
  padding: 20px 10px;
  border: 1px solid gray;
  position: sticky;
  top: 0;
  grid-area: header;
  display: flex;
}

.content {
  grid-area: content;
  overflow-x: hidden;

  display: flex;
  justify-content: center;
}
</style>
