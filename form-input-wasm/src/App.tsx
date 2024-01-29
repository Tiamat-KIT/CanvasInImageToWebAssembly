import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import init, { mosaic } from "./pkg/umie_web";
import "./App.css";

function App() {
  const [dimension, setDimension] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [natImage, setNatImage] = useState<HTMLImageElement>();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const forNewRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    init();
  }, []);

  const [converted, setConverted] = useState<ImageData | null>(null);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const elem = document.getElementById("file") as HTMLInputElement;
      if (elem === null) {
        alert("画像が選択されていません");
        return;
      }
      const image = new Image();
      const file:File = elem.files![0] as File;
      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
        image.src = event.target?.result as string;
      });
      image.onload = function () {
        const result = {
          width: image.width,
          height: image.height,
        };

        setNatImage(image);
        setDimension(result);
      };
      reader.readAsDataURL(file);
    },
    [dimension]
  );

  useEffect(() => {}, [dimension]);

  useEffect(() => {
    if (natImage === undefined) return;
    if (dimension === null) return;
    canvasRef.current
      ?.getContext("2d")
      ?.drawImage(natImage, 0, 0, dimension.width, dimension.height);
    const imageData = canvasRef.current
      ?.getContext("2d")
      ?.getImageData(0, 0, dimension.width, dimension.height);

    if (imageData === undefined) {
      return;
    }
    const converted = mosaic(imageData.data, dimension.width, dimension.height);

    const convertedImageData = new ImageData(
      new Uint8ClampedArray(converted.buffer),
      dimension.width
    );
    forNewRef.current?.getContext("2d")?.putImageData(convertedImageData, 0, 0);
  }, [converted, dimension, natImage]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p></p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="file">image</label>
          <input type="file" id="file" />
          <button>submit</button>
        </form>
        <p>{JSON.stringify(dimension)}</p>
        <canvas
          ref={canvasRef}
          width={dimension?.width}
          height={dimension?.height}
        ></canvas>
        <canvas
          ref={forNewRef}
          width={dimension?.width}
          height={dimension?.height}
        ></canvas>
      </header>
    </div>
  );
}