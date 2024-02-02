mod utils;
use image;
use image::GenericImageView;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, process-image-web-assembly!");
}

#[wasm_bindgen]
pub fn process_image(path: &str) -> String {
    let img = image::open(path).unwrap();
    let (width, height) = img.dimensions();
    let mut img = img.to_rgba();
    for x in 0..width {
        for y in 0..height {
            let pixel = img.get_pixel_mut(x, y);
            let r = pixel[0];
            let g = pixel[1];
            let b = pixel[2];
            let a = pixel[3];
            pixel[0] = 255 - r;
            pixel[1] = 255 - g;
            pixel[2] = 255 - b;
            pixel[3] = a;
        }
    }
    let new_img = image::DynamicImage::ImageRgba8(img);
    let mut buf = Vec::new();
    new_img.write_to(&mut buf, image::ImageOutputFormat::Png).unwrap();
    let base64 = base64::encode(&buf);
    base64
}