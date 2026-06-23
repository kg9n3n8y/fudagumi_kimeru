<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'default',
  },
  active: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])
</script>

<template>
  <button
    type="button"
    class="game-button"
    :class="[`game-button--${variant}`, { 'game-button--active': active }]"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<style scoped>
.game-button {
  width: 100%;
  padding: 0.65rem 0.25rem;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  background: #336633;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.1s ease, border-color 0.15s ease;
  touch-action: manipulation;
}

.game-button:hover {
  background: #2d5a2d;
}

.game-button:active {
  transform: scale(0.97);
}

.game-button--active {
  border-color: #1f3d1f;
  background: #2d5a2d;
}

.game-button--special {
  background: #4a6741;
}

.game-button--special:hover {
  background: #3f5837;
}

.game-button--special.game-button--active {
  background: #3f5837;
  border-color: #2d4028;
}
</style>
