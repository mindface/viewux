import { useState, ChangeEvent, useRef } from 'react';

export default function Opencv() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [inputFile, inputFileSet] = useState<File | null>(null);
  // const [cv,cvSet] = useState<File | null>(null);

  function loadImage(src:string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  const imageForFile = () => {
    
  }

  const runGun = (cv:any) => {
     (async () => {
      // const { default: cv } = await import('../lib/opencv.js');
      let img = await loadImage('/images/formView.png');
      let ctx = canvasRef.current?.getContext('2d');

      console.log(inputFile)
      console.log("///////////////")
      
      if (ctx && inputFile) {
        let img = new Image();
        img.src = URL.createObjectURL(img);
        img.onload = function () {
          if (canvasRef.current) {
            canvasRef.current.setAttribute('width', String(img.width));
            canvasRef.current.setAttribute('height', String(img.height));
            ctx?.drawImage(img, 0, 0, img.width, img.height);
            
            let src = cv.imread(canvasRef.current);
            let dst = new cv.Mat();
            cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
            cv.imshow(canvasRef.current, dst);
            src.delete(); 
            dst.delete();
          }
        };
      }
    })()
  };

  return (
    <div className="cv-action">
      <input type="file" onChange={(e:ChangeEvent) => {
        const element = e?.target as HTMLInputElement
        if(element?.files && element?.files?.length > 0) {
          const f = element?.files[0];
          inputFileSet(f)
        }
      }} />
      <canvas className="canvas" ref={canvasRef}></canvas>
      <script async src="/js/opencv.js" onLoad={() => {
            // console.log(cv)
            runGun(cv)
          }
        }></script>---------------------
        {/* <button onClick={runGun}>run</button> */}
    </div>
  );
}