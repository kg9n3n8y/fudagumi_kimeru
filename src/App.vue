<script setup>
import FudagumiGenerator from './components/FudagumiGenerator.vue'
import ToastContainer from './components/ToastContainer.vue'
import PwaUpdateBanner from './components/PwaUpdateBanner.vue'
</script>

<template>
  <PwaUpdateBanner />
  <main class="app">
    <FudagumiGenerator />
  </main>
  <ToastContainer />
</template>

<style scoped>
.app {
  width: min(100%, 36rem);
  margin: 0 auto;
  padding: 1rem 0.75rem 1.5rem;
}
</style>
