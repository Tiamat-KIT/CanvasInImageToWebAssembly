extern crate photon_rs;
use photon_rs::native::{open_image,save_image};
use photon_rs::channels::alter_channel;

pub fn main(){
    let mut img = open_image("./main.jpg").expect("File should open");
    alter_channel(&mut img, 25_i16);
    save_image(img, "output.jpg")//.expect("File should save");
}