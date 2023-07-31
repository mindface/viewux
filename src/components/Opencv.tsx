import { useEffect } from "react";
import { useOpenCv } from '../lib/openCv'

export function openCv() {
  const isReady = useOpenCv();

  useEffect(() => {
      if (isReady) {
          // OpenCV.jsが準備できたら画像処理を行う
        //   let src = cv.imread('imageCanvas');
        //   let dst = new cv.Mat();
        //   cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
        //   cv.imshow('outputCanvas', dst);
        //   src.delete();
        //   dst.delete();
      }
  }, [isReady]);

  return (
      <div>
          <canvas id="imageCanvas" style={{ display: 'none' }}></canvas>
          <canvas id="outputCanvas"></canvas>
      </div>
  );
}
