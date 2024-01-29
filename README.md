# CanvasInImageToWebAssembly
Canvasの画像をWebAssemblyで処理して返すプログラムから書き始めます

### このリポジトリのディレクトリについて
- train-wasmer
WASMのwasmerを練習する

- hello-wasm
WASMのwasm-packの練習
```bash
# 新しいプロジェクトの作成
 cargo new --lib hello-wasm
```
```rust: lib.rs
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}
```
```bash
# パッケージのビルド
wasm-pack build --target web
```

#### これじゃないな
```bash: wasm-packインストール
# wasm-packのインストール
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# プロジェクトテンプレートの生成
wasm-pack new hello-wasm
```

```bash
# wasm-pack のビルド

wasm-pack build
```