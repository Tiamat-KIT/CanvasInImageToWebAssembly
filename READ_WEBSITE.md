# Read WebSite

### [Decoding and encoding images in Rust using the image crate](https://blog.logrocket.com/decoding-encoding-images-rust-using-image-crate/)


```rust
use image; 
use image::{GenericImageViewm,ImageBuffer,Pixel};
 
let img = image::open("ferris.png").expect("File not found!");
let (width,height) = img.dimensions();
let mut output = ImageBuffer::new(width,height);

for(x,y,pixel) in img.pixels() {
    output.put_pixel(x,y,
    // pixel.map will iterate over the r, g, b, a values of the pixel
    pixel.map(|p| p.saturating_sub(65)));
}

/* for pixel in img.pixel(){
    // ピクセル（RGBA）単位で処理する
} */
```

### [Building an image processing application; using JAMStack](https://medium.com/wasm/building-an-image-processing-application-using-jamstack-11185b54e7d40)

```rust
use wasm_bindgen::prelude::*;
use image::{ImageOutputFormat,GenericImageView,ImageFormat};

#[wasm_bindgen]
pub fn grayscale(img_buf: &[u8]) -> Vec<u8>{
    let img = image::load_from_memory(img_buf).unwrap();
    let (width,height) = img.dimensions();
    let filtered = img.grayscale();
    let mut buf = vec![];
    let image_format_detected: ImageFormat = image::guess_format(img_buf).unwrap();
    match image_format_detected {
        ImageFormat::Gif => {
            filtered.write_to(&mut buf,ImageOutputFormat::Gif).unwrap();
        },
        _ => {
            filtered.white_to(&mut buf,ImageOutputFormat::Png).unwrap();
        },
    }
    return buf;
}
```