use yew::prelude::*;
use components::header::Header;
mod components;

#[function_component(App)]
pub fn app() -> Html {
    html! {
        <div>
            <Header />
            <h1 class="text-2xl font-extrabold">{"Hello, Yew!"}</h1>
            <p>{"This is a simple Yew app."}</p>
        </div>
    }
}

fn main() {
    yew::start_app::<App>();
}