const FUDA_SETS = {
  SET1: ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ'],
  SET2: ['サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト'],
  SET3: ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
}

const GAME_NUMBERS = ['① ', '② ', '③ ', '④ ', '⑤ ', '⑥ ', '⑦ ', '⑧ ']
const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土']

const NORMAL_PATTERNS = [
  ['SET1', 'SET2', 'SET3', 'SET1', 'SET2', 'SET3', 'SET1', 'SET2'],
  ['SET1', 'SET3', 'SET2', 'SET1', 'SET3', 'SET2', 'SET1', 'SET3'],
  ['SET2', 'SET3', 'SET1', 'SET2', 'SET3', 'SET1', 'SET2', 'SET3'],
  ['SET2', 'SET1', 'SET3', 'SET2', 'SET1', 'SET3', 'SET2', 'SET1'],
  ['SET3', 'SET1', 'SET2', 'SET3', 'SET1', 'SET2', 'SET3', 'SET1'],
  ['SET3', 'SET2', 'SET1', 'SET3', 'SET2', 'SET1', 'SET3', 'SET2'],
]

const KISOREN_PATTERNS = [
  ['SET1', '基礎練', 'SET2', 'SET3', 'SET1', 'SET2', 'SET3'],
  ['SET1', '基礎練', 'SET3', 'SET2', 'SET1', 'SET3', 'SET2'],
  ['SET2', '基礎練', 'SET3', 'SET1', 'SET2', 'SET3', 'SET1'],
  ['SET2', '基礎練', 'SET1', 'SET3', 'SET2', 'SET1', 'SET3'],
  ['SET3', '基礎練', 'SET1', 'SET2', 'SET3', 'SET1', 'SET2'],
  ['SET3', '基礎練', 'SET2', 'SET1', 'SET3', 'SET2', 'SET1'],
]

function getToday() {
  const date = new Date()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${month}/${day}(${WEEKDAYS[date.getDay()]})`
}

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function generateFudagumi(source) {
  if (source === '基礎練') {
    return source
  }
  return shuffleArray(source).slice(0, 5).sort().join('')
}

function selectRandom(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function resolveSet(setKey) {
  if (setKey === '基礎練') {
    return setKey
  }
  return FUDA_SETS[setKey]
}

function buildMessage(patternKeys, gameCount) {
  const pattern = selectRandom(patternKeys)
  const lines = Array.from({ length: gameCount }, (_, i) => {
    const source = resolveSet(pattern[i])
    return `${GAME_NUMBERS[i]}${generateFudagumi(source)}`
  })

  return [getToday(), ...lines, 'の札組でお願いします'].join('\n')
}

export function createFudagumi(num) {
  return buildMessage(NORMAL_PATTERNS, num)
}

export function createKisoren(num) {
  return buildMessage(KISOREN_PATTERNS, num + 1)
}
