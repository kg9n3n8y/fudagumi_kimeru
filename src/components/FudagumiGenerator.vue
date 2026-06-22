<script setup>
import { ref } from 'vue'
import { createFudagumi, createKisoren } from '../composables/useFudagumi'
import { copyToClipboard } from '../composables/useClipboard'
import { useToast } from '../composables/useToast'
import GameButton from './GameButton.vue'

const PLACEHOLDER = 'ボタンを押してね'
const APP_URL = `${window.location.origin}${import.meta.env.BASE_URL}`

const result = ref(PLACEHOLDER)
const lastSelection = ref(null)
const copied = ref(false)
const { show: showToast } = useToast()

let copiedTimer = null

const gameOptions = [
  { id: 'g2', label: '２試合', games: 2 },
  { id: 'g3', label: '３試合', games: 3 },
  { id: 'g4', label: '４試合', games: 4 },
  { id: 'g5', label: '５試合', games: 5 },
  { id: 'g6', label: '６試合', games: 6 },
  { id: 'g7', label: '７試合', games: 7 },
  { id: 'g8', label: '８試合', games: 8 },
  { id: 'kisoren', label: '３試合 + 基礎練', games: 3, kisoren: true, variant: 'special' },
]

async function generate(option) {
  try {
    const message = option.kisoren
      ? createKisoren(option.games)
      : createFudagumi(option.games)

    result.value = message
    lastSelection.value = option.id

    const success = await copyToClipboard(message)
    if (success) {
      flashCopied()
      const toastMessage = option.kisoren
        ? `${option.games}試合 + 基礎練の札組みをコピーしました`
        : `${option.games}試合分の札組みをコピーしました`
      showToast(toastMessage)
    } else {
      showToast('コピーに失敗しました。テキストを手動でコピーしてください', 'error')
    }
  } catch (error) {
    console.error('エラーが発生しました:', error)
    showToast('処理中にエラーが発生しました', 'error')
  }
}

async function copyResult() {
  if (result.value === PLACEHOLDER) {
    return
  }

  const success = await copyToClipboard(result.value)
  if (success) {
    flashCopied()
    showToast('札組みをコピーしました')
  } else {
    showToast('コピーに失敗しました', 'error')
  }
}

async function copyUrl() {
  const success = await copyToClipboard(APP_URL)
  if (success) {
    showToast('URLをコピーしました')
  } else {
    showToast('コピーに失敗しました', 'error')
  }
}

function flashCopied() {
  copied.value = true
  if (copiedTimer) {
    clearTimeout(copiedTimer)
  }
  copiedTimer = setTimeout(() => {
    copied.value = false
  }, 1500)
}
</script>

<template>
  <div class="generator">
    <header class="header">
      <h1>
        札組み作成「<ruby><rb>組</rb><rp>（</rp><rt>くみ</rt><rp>）</rp><rb>子</rb><rp>（</rp><rt>こ</rt><rp>）</rp></ruby>」
      </h1>
      <p class="subtitle">試合数を選ぶと、札組みを生成してコピーします</p>
    </header>

    <section class="button-grid" aria-label="試合数の選択">
      <GameButton
        v-for="option in gameOptions"
        :key="option.id"
        :label="option.label"
        :variant="option.variant"
        :active="lastSelection === option.id"
        @click="generate(option)"
      />
    </section>

    <section class="result-card">
      <div class="result-header">
        <label for="result-text">生成結果</label>
        <span v-if="copied" class="copied-badge">コピー済み</span>
      </div>
      <textarea
        id="result-text"
        v-model="result"
        class="result-text"
        rows="6"
        readonly
        aria-label="生成された札組み"
      />
      <div class="result-actions">
        <button
          type="button"
          class="secondary-button"
          :disabled="result === PLACEHOLDER"
          @click="copyResult"
        >
          もう一度コピー
        </button>
        <button type="button" class="secondary-button" @click="copyUrl">
          URLをコピー
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.generator {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.header {
  text-align: center;
}

.header h1 {
  margin: 0;
  font-size: clamp(1.5rem, 5vw, 2rem);
  color: #333;
  line-height: 1.4;
}

.subtitle {
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: #5a5345;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
}

@media (min-width: 480px) {
  .button-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.result-card {
  background: #fff;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.result-header label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #444;
}

.copied-badge {
  font-size: 0.75rem;
  font-weight: 600;
  color: #336633;
  animation: fade-in 0.2s ease;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.result-text {
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem;
  border: 1px solid #d4cbb5;
  border-radius: 0.5rem;
  background: #faf8f3;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.6;
  resize: vertical;
  color: #333;
}

.result-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.secondary-button {
  flex: 1;
  min-width: 8rem;
  padding: 0.6rem 1rem;
  border: 1px solid #336633;
  border-radius: 0.5rem;
  background: transparent;
  color: #336633;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;
  touch-action: manipulation;
}

.secondary-button:hover:not(:disabled) {
  background: rgba(51, 102, 51, 0.08);
}

.secondary-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
