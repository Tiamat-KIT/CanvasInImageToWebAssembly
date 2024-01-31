import { useEffect, useState } from 'react'
import './App.css'
import { useCallback } from 'react';

function App() {
 
  useEffect(() => {
    const init_wasm_img = new URL("/1327.png", import.meta.url).href;
    const init_js_img = new URL("/1327.png", import.meta.url).href;
    (document.getElementById("js-img")! as HTMLImageElement).src = init_js_img;
    (document.getElementById("wasm-img")! as HTMLImageElement).src = init_wasm_img;
  } , [])

  return (
    <main className='container mx-auto p-4'>
      <h1 className='text-2xl'>WASM or JS</h1>
      <h3 className='text-xl'>Resize</h3>
      <div className='grid grid-cols-2 gap-4'>
        <div className='rounded-xl border-2	drop-shadow-xl p-4'>
            <h3>WASM</h3>
            <label htmlFor="file">Input Image file</label>
            <input type="file" id="wasm-input-img"  title='input img data'
              onChange={(event) => {
                const file = (event.target as HTMLInputElement).files?.item(0)
                if (file == null) {
                  return
                }
                const blob = URL.createObjectURL(file)
                const img = document.getElementById('wasm-img') as HTMLImageElement
                img.src = blob
              }}/>
        </div>
        <div className='rounded-xl border-2	drop-shadow-xl p-4'>
          <h3>JS</h3>
          <label htmlFor="file">Input Image file</label>
          <input type="file" id="js-input-image" title='input img data'
            onChange={(event) => {
              const start = performance.now()
              const canvas = document.createElement("canvas") as HTMLCanvasElement
              const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
              const img = document.getElementById('js-img') as HTMLImageElement
              const file = (event.target as HTMLInputElement).files?.item(0)
              if (file == null) {
                return
              }
              const blob = URL.createObjectURL(file)
              console.log("Read file: " + (performance.now() - start) + "ms");

              const NewImg = new Image();
              NewImg.src = blob;
              NewImg.onload = function() {
                console.log("JS:Onload " + (performance.now() - start) + "ms");
                canvas.width = NewImg.width;
                canvas.height = NewImg.height;
                ctx.drawImage(NewImg, 0, 0);
                let src = ctx.getImageData(0, 0, canvas.width, canvas.height);
                let dst = ctx.createImageData(canvas.width, canvas.height);

                for (let i = 0; i < src.data.length; i=i+4) {
                  dst.data[i]   = 255 - src.data[i];    //R
                  dst.data[i+1] = 255 - src.data[i+1];  //G
                  dst.data[i+2] = 255 - src.data[i+2];  //B
                  dst.data[i+3] = src.data[i+3];        //A
              }
                console.log("JS:Invert " + (performance.now() - start) + "ms");
                ctx.putImageData(dst, 0, 0);
                img.src = canvas.toDataURL();
                console.log("JS:PutImageData",img.src);
                // console.log("All-Process-JS: " + (performance.now() - start) + "ms");
                document.getElementById("js-container")?.append((document.createElement("p") as HTMLParagraphElement).textContent = `All-Process-JS:${performance.now() - start}ms`);
              }
            }} />
        </div>
        <div className='rounded-xl border-2	drop-shadow-xl p-4' id='wasm-container'>
          <h3 className='text-xl'>WASM -Result-</h3>
          <img id='wasm-img' alt='result wasm'/>
        </div>
        <div className='rounded-xl border-2	drop-shadow-xl p-4' id='js-container'>
          <h3 className='text-xl'>JS -Result-</h3>
          <img id='js-img' alt='result js'/>
        </div>
      </div>
    </main>
  )
}

export default App
