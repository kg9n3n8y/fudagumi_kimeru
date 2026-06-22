<script setup>
import { useToast } from '../composables/useToast'

const { toasts } = useToast()
</script>

<template>
  <div class="toast-container" aria-live="polite">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="`toast--${toast.type}`"
      >
        {{ toast.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: min(90vw, 22rem);
  pointer-events: none;
}

.toast {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.6rem;
  font-size: 0.9rem;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.toast--success {
  background: #336633;
  color: #fff;
}

.toast--error {
  background: #8b3a3a;
  color: #fff;
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(0.75rem);
}
</style>
