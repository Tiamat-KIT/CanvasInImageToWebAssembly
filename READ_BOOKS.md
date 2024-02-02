# Readed Books 

### Rustの書き方・作り方
#### なんでこれを読んだか
- 画像処理のサンプルコードを見たかった。

わかったこと
- imageクレートを使う

- 市松模様
```rust
use image;

fn main(){
    let white = image::Rgb::<u8>([255,255,255]);
    let red = image::Rgb::<u8>([255,90,90]);

    let cell_width = 64;
    let draw = |x,y| {
        let (xi,yi) = (x / cell_width,y / cell_width);
        match (xi % 2,yi % 2){
            (0,0) => white,
            (1,0) => red,
            (0,1) => red,
            (1,1) => white,
            (_,_) => panic!("error!"),
        }
    };
    let img = image::ImageBuffer::from_fn(512,512,draw);
    img.save("ichimatsu.png").unwrap();
}
```

- 