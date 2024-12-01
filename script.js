// 今日の日付を"10/07(金)"のような形式で生成する関数
function getToday() {
    const date = new Date();
    const options = { month: '2-digit', day: '2-digit' };
    const today = date.toLocaleDateString('ja-JP', options).replace(/\//g, '/');
    const dayArray = ['日', '月', '火', '水', '木', '金', '土']; // 曜日の配列
    const thisDay = date.getDay(); // 曜日の番号を取得

    return today + "(" + dayArray[thisDay] + ")";
}

// 配列を並べ替えて最初の5個をソートして返す関数
function fudagime(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        const tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }
    return array.slice(0, 5).sort();
}

// 配列の中からランダムに1つ選ぶ関数
function chooseAtRandom(array) {
    const arrayIndex = Math.floor(Math.random() * array.length);
    return array[arrayIndex];
}

// 試合数に応じた回数の札組みを入れたメッセージを作る関数
function makeFudagumi(num) {
  // 札組みの定義
  const l1 = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ"];
  const l2 = ["サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト"];
  const l3 = ["ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ"];

  // 札組みのパターン
  const list_ptn = [
      [l1, l2, l3, l1, l2, l3, l1],
      [l1, l3, l2, l1, l3, l2, l1],
      [l2, l3, l1, l2, l3, l1, l2],
      [l2, l1, l3, l2, l1, l3, l2],
      [l3, l1, l2, l3, l1, l2, l3],
      [l3, l2, l1, l3, l2, l1, l3]
  ];

  // 試合数
  const game_num = ["① ", "② ", "③ ", "④ ", "⑤ ", "⑥ ", "⑦ "];

  // 試合数に応じた回数の札組みを入れたメッセージを作る
  const list = chooseAtRandom(list_ptn);
  let message = getToday() + "\n";

  for (let i = 0; i < num; i++) {
      message = message + game_num[i] + fudagime(list[i]) + '\n';
  }

  // テキストボックスを取得
  let textBox = document.getElementById('textBox');

  // 札組みのメッセージでテキストボックスの内容を変更
  message = message + 'の札組でお願いします';
  textBox.value = message;

  let area = document.createElement("textarea");
  area.textContent = message;
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  document.body.removeChild(area);
  alert(num + '試合分の札組みをコピーしました');
}

function copyUrl() {
  var text = "https://kg9n3n8y.github.io/fudagumi_kimeru/";
  var area = document.createElement("textarea");
  area.textContent = text;
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  document.body.removeChild(area);
  alert('URLをコピーしました');
}
