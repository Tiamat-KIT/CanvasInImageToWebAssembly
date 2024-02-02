use image::{DynamicImage, Rgba};
use wasm_bindgen::prelude::*;
use image::{GenericImage,ImageBuffer};
#[wasm_bindgen]
pub fn invert_colors(
    img_data: Vec<u8>,
    width: u32,
    height: u32,
) -> Vec<u8> {
    let mut result = DynamicImage::ImageRgba8(ImageBuffer::from_vec(img_data, width, height).unwrap());

    for y in 0..height {
        for x in 0..width {
            let pixel = result.get_pixel_mut(x, y);
            pixel[0] = 255 - pixel[0];
            pixel[1] = 255 - pixel[1];
            pixel[2] = 255 - pixel[2];
            // Alpha channel remains unchanged
        }
    }

    // Convert the result DynamicImage to a Vec<u8>
    let mut data = Vec::new();
    data.extend_from_slice(result.to_rgba8().as_raw());
    data
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn run_example() {
    log("WebAssembly example is running!");
}
