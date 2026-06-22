<script setup>
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { onMounted, onUnmounted } from 'vue'

const { needRefresh, updateServiceWorker } = useRegisterSW({
  immediate: true,
})

let registration = null

function checkForUpdates() {
  registration?.update()
}

onMounted(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((reg) => {
      registration = reg
      checkForUpdates()
    })
  }

  document.addEventListener('visibilitychange', onVisibilityChange)
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', onVisibilityChange)
})

function onVisibilityChange() {
  if (document.visibilityState === 'visible') {
    checkForUpdates()
  }
}

async function applyUpdate() {
  await updateServiceWorker(true)
}
</script>

<template>
  <Transition name="slide-down">
    <div v-if="needRefresh" class="update-banner" role="alert">
      <p>新しいバージョンがあります</p>
      <button type="button" class="update-button" @click="applyUpdate">
        今すぐ更新
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.update-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: #2d5a2d;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.update-banner p {
  margin: 0;
  font-size: 0.9rem;
}

.update-button {
  flex-shrink: 0;
  padding: 0.4rem 0.9rem;
  border: none;
  border-radius: 0.4rem;
  background: #fff;
  color: #336633;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
