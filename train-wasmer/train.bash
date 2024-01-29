# ビルドターゲットを追加
rustup target add wasm32-wasi

# wasmにビルド
cargo build --target wasm32-wasi

# wasmerで*.wasmファイル実行してみる
wasmer ./target/wasm32-wasi/debug/train.wasm
