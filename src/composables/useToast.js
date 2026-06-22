import { ref } from 'vue'

const toasts = ref([])
let nextId = 0

export function useToast() {
  function show(message, type = 'success', duration = 2800) {
    const id = nextId++
    toasts.value.push({ id, message, type })

    window.setTimeout(() => {
      toasts.value = toasts.value.filter((toast) => toast.id !== id)
    }, duration)
  }

  return { toasts, show }
}
