use std::{fs::File, io::BufReader, u8};

use umie::{exec};
use wasm_bindgen::{prelude::*, Clamped};
use web_sys::{window, Blob, Event};

// When the `wee_alloc` feature is enabled, this uses `wee_alloc` as the global
// allocator.
//
// If you don't want to use `wee_alloc`, you can safely delete this.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn mosaic(buf: Clamped<Vec<u8>>, w: u32, h: u32) -> Vec<u8> {
    console_error_panic_hook::set_once();
    let converted = exec(buf.0, w, h);
    converted
}