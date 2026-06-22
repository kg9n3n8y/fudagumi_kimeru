# 組子（くみこ）

競技かるたの練習・試合で使う**札組み**をランダムに決めて、クリップボードへコピーする Web アプリです。

**公開 URL:** https://kg9n3n8y.github.io/fudagumi_kimeru/

## 札組みとは

札組みとは、各試合で取り組む歌の範囲を示すものです。本アプリでは 30 音（ア〜ホ）を 3 つのセットに分け、各試合ごとにそのセットから 5 文字をランダムに選んで札組みを生成します。

| セット | 含まれる文字 |
|--------|-------------|
| SET1 | ア イ ウ エ オ カ キ ク ケ コ |
| SET2 | サ シ ス セ ソ タ チ ツ テ ト |
| SET3 | ナ ニ ヌ ネ ノ ハ ヒ フ ヘ ホ |

各試合では、割り当てられたセットから 5 文字をシャッフルして選び、五十音順に並べ替えて表示します。

## 機能

- **2〜8 試合**の札組みをワンタップで生成
- **3 試合 + 基礎練**モード（2 試合目を「基礎練」として扱う）
- 生成と同時に**クリップボードへ自動コピー**（トースト通知でフィードバック）
- 当日の日付（`MM/DD(曜)` 形式）を先頭に付与
- ページ URL のコピーボタン
- **PWA 対応**（ホーム画面への追加が可能）
- アプリ起動時に**新バージョンを確認**し、更新がある場合はバナーからワンタップで適用
- スマホブラウザでも使いやすいレスポンシブ UI

## 使い方

1. 試合数に合わせたボタンを押す
2. 結果エリアに札組みが表示され、同時にクリップボードへコピーされる
3. 画面下部のトーストでコピー完了を確認する
4. LINE などの連絡先へそのまま貼り付けて共有する

### 出力例（3 試合の場合）

```
05/29(木)
① イウオカコ
② サスタチト
③ ナニヌノハ
の札組でお願いします
```

### 出力例（3 試合 + 基礎練の場合）

```
05/29(木)
① イウオカコ
② 基礎練
③ サスタチト
④ ナニヌノハ
の札組でお願いします
```

## 生成ロジック

### セットの割り当てパターン

試合数に応じて、各試合へ割り当てるセットの並びを 6 パターンからランダムに 1 つ選びます。3 セットを偏りなく回すためのローテーションです。

通常モード（8 試合まで）のパターン例:

```
[SET1, SET2, SET3, SET1, SET2, SET3, SET1, SET2]
[SET1, SET3, SET2, SET1, SET3, SET2, SET1, SET3]
[SET2, SET3, SET1, SET2, SET3, SET1, SET2, SET3]
…（計 6 パターン）
```

基礎練モードでは、2 試合目の位置に「基礎練」が入る 6 パターンを同様に使用します。

### 各試合の文字選択

- セットが割り当てられた試合: セット内 10 文字から 5 文字をランダム抽出し、五十音順にソート
- 基礎練の試合: 文字列 `基礎練` をそのまま出力

## プロジェクト構成

```
fudagumi_kimeru/
├── .github/workflows/deploy.yml  # GitHub Pages への自動デプロイ
├── public/
│   └── icon.png                  # ファビコン・PWA アイコン
├── src/
│   ├── App.vue
│   ├── main.js
│   ├── assets/main.css
│   ├── components/
│   │   ├── FudagumiGenerator.vue  # メイン UI
│   │   ├── GameButton.vue
│   │   ├── PwaUpdateBanner.vue    # PWA 更新バナー
│   │   └── ToastContainer.vue     # トースト通知
│   └── composables/
│       ├── useFudagumi.js           # 札組み生成ロジック
│       ├── useClipboard.js
│       └── useToast.js
├── index.html
├── vite.config.js
└── package.json
```

| ファイル | 役割 |
|----------|------|
| `src/composables/useFudagumi.js` | 3 セット定義、パターン選択、札組み文字列の生成 |
| `src/components/FudagumiGenerator.vue` | 試合数ボタン、結果表示、コピー操作 |
| `src/components/PwaUpdateBanner.vue` | 起動時・復帰時の SW 更新チェックと更新 UI |
| `vite.config.js` | Vite / PWA（`vite-plugin-pwa`）の設定 |

## ローカルでの動作確認

Node.js 18 以上が必要です。

```bash
npm install
npm run dev
```

ブラウザで http://localhost:5173/fudagumi_kimeru/ を開いてください。

本番ビルドの確認:

```bash
npm run build
npm run preview
```

## デプロイ

`main` ブランチへの push で GitHub Actions がビルドし、ビルド成果物を `gh-pages` ブランチへ自動デプロイします。

GitHub Pages の設定（初回のみ）:

1. リポジトリの **Settings → Pages** を開く
2. **Build and deployment → Source** を **Deploy from a branch** にする
3. **Branch** を `gh-pages` / `/ (root)` に設定する

> `main` ブランチのソースをそのまま公開すると、未ビルドの `index.html` が配信され画面が真っ白になります。必ず `gh-pages` ブランチを指定してください。

## 技術スタック

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)（Service Worker / Web App Manifest）
- [Clipboard API](https://developer.mozilla.org/ja/docs/Web/API/Clipboard_API)（非対応環境では `document.execCommand('copy')` にフォールバック）
- GitHub Pages + GitHub Actions

## 補足

- ロボット向けメタタグ `noindex, nofollow` を設定しており、検索エンジンにはインデックスされません（内輪利用向け）
- PWA としてインストールした場合も、次回起動時に新バージョンがあれば画面上部に「今すぐ更新」バナーが表示されます

## ライセンス

リポジトリにライセンスファイルは未設定です。利用・改変の条件が必要な場合は追記してください。
