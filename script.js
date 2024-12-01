// 定数の定義
const FUDA_SETS = {
    SET1: ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ"],
    SET2: ["サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト"],
    SET3: ["ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ"]
};

const GAME_NUMBERS = ["① ", "② ", "③ ", "④ ", "⑤ ", "⑥ ", "⑦ "];
const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

// 日付フォーマット関数
function getToday() {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}(${WEEKDAYS[date.getDay()]})`;
}

// 配列をシャッフルして返す関数
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// 札組みを生成する関数
function generateFudagumi(array) {
    return shuffleArray(array).slice(0, 5).sort();
}

// ランダム選択関数
function selectRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// クリップボードにコピーする関数
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        
        try {
            textarea.select();
            document.execCommand('copy');
            return true;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

// メイン関数
async function makeFudagumi(num) {
    try {
        const { SET1, SET2, SET3 } = FUDA_SETS;
        const patterns = [
            [SET1, SET2, SET3, SET1, SET2, SET3, SET1],
            [SET1, SET3, SET2, SET1, SET3, SET2, SET1],
            [SET2, SET3, SET1, SET2, SET3, SET1, SET2],
            [SET2, SET1, SET3, SET2, SET1, SET3, SET2],
            [SET3, SET1, SET2, SET3, SET1, SET2, SET3],
            [SET3, SET2, SET1, SET3, SET2, SET1, SET3]
        ];

        const selectedPattern = selectRandom(patterns);
        const message = [
            getToday(),
            ...Array.from({ length: num }, (_, i) => 
                `${GAME_NUMBERS[i]}${generateFudagumi(selectedPattern[i])}`
            ),
            'の札組でお願いします'
        ].join('\n');

        // テキストボックスに表示
        document.getElementById('textBox').value = message;

        // クリップボードにコピー
        const success = await copyToClipboard(message);
        alert(success ? `${num}試合分の札組みをコピーしました` : 'コピーに失敗しました');

    } catch (error) {
        console.error('エラーが発生しました:', error);
        alert('処理中にエラーが発生しました');
    }
}

// URL共有関数
async function copyUrl() {
    const url = "https://kg9n3n8y.github.io/fudagumi_kimeru/";
    const success = await copyToClipboard(url);
    alert(success ? 'URLをコピーしました' : 'コピーに失敗しました');
}
