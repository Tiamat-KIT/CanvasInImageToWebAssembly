use image::{GenericImageView,Rgba};

#[no_mangle]
fn open_img(path: &str) -> (usize,usize,Vec<u8>){
    let img = image::open(path) // ここで画像開いてる？
        .expect("Dimage");
    
    let width = img.width() as usize;
    let height = img.height() as usize;
    let color = img.into_rgba8();
    (width,height,color.to_vec())
}

#[no_mangle]
fn save_img(path: &str,width: u32,height:u32,data: Vec<u8>){
    let img = image::ImageBuffer::<Rgba<u8>,Vec<u8>>::from_vec(
            width,height,data
        ).unwrap();
        img.save(path).expect("Error save")
}
fn main() {
    let (width,height,color) = open_img("https://pbs.twimg.com/media/FHKt31kacAEMMjT?format=jpg&name=large");
    save_img(path,width,height,color);
}
