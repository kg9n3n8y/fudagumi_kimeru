// 今日の日付を"10/07(金)"のような形式で生成する関数
function getToday() {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dayArray = ['日', '月', '火', '水', '木', '金', '土'];
    const thisDay = date.getDay();

    return `${month}/${day}(${dayArray[thisDay]})`;
}

// 配列をシャッフルして最初の5個をソートして返す関数
function fudagime(array) {
    const shuffled = [...array]; // 配列のコピーを作成
    for (let i = shuffled.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[r]] = [shuffled[r], shuffled[i]]; // 分割代入でスワップ
    }
    return shuffled.slice(0, 5).sort();
}

// 配列の中からランダムに1つ選ぶ関数
function chooseAtRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// クリップボードにコピーする関数
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // フォールバック方法
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(textarea);
            return true;
        } catch (err) {
            document.body.removeChild(textarea);
            return false;
        }
    }
}

// 試合数に応じた回数の札組みを入れたメッセージを作る関数
async function makeFudagumi(num) {
    // 札組みの定義
    const l1 = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ"];
    const l2 = ["サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト"];
    const l3 = ["ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ"];

    // 札組みのパターン
    const list_ptn = [
        [l1, l2, l3, l1, l2, l3],
        [l1, l3, l2, l1, l3, l2],
        [l2, l3, l1, l2, l3, l1],
        [l2, l1, l3, l2, l1, l3],
        [l3, l1, l2, l3, l1, l2],
        [l3, l2, l1, l3, l2, l1]
    ];

    // 試合数
    const game_num = ["① ", "② ", "③ ", "④ ", "⑤ ", "⑥ ", "⑦ "];

    const list = chooseAtRandom(list_ptn);
    let message = getToday() + "\n";

    for (let i = 0; i < num; i++) {
        message += game_num[i] + fudagime(list[i]).join(',') + '\n';
    }

    message += 'の札組でお願いします';

    // テキストボックスに表示
    const textBox = document.getElementById('textBox');
    textBox.value = message;

    // クリップボードにコピー
    const success = await copyToClipboard(message);
    if (success) {
        alert(`${num}試合分の札組みをコピーしました`);
    } else {
        alert('コピーに失敗しました');
    }
}

// URLをコピーする関数
async function copyUrl() {
    const url = "https://kg9n3n8y.github.io/fudagumi_kimeru/";
    const success = await copyToClipboard(url);
    if (success) {
        alert('URLをコピーしました');
    } else {
        alert('コピーに失敗しました');
    }
}
