import React, { useEffect, useMemo, useContext, useRef, useState } from 'react'
import {
  Input,
  Button,
  Header,
  Modal,
  Select
} from 'semantic-ui-react'
import { fabric } from 'fabric'
import { makeFileContext } from "../context/makeFiles";

const countryOptions = [
  { key: 'select01', value: 'circle', text: '円' },
  { key: 'select02', value: 'order', text: '順番' },
]

function MakerSolidTorus() {
  const { state } = useContext(makeFileContext)
  const [fileList, fileListSet] = useState(state.makeFileList ?? [])
  const [addText, setAddText] = useState('')
  const [imagePath, setImagePath] = useState('')
  const [renderRates, setRenderRates] = useState<
    { id: number; rate: string }[]
  >([])
  const [fabricCanvas, setFabricCanvas] = useState(new fabric.Canvas(''))
  const [open, setOpen] = useState(false)
  const writeCanvas = useRef<HTMLCanvasElement>(null)
  const writeCanvasContent = useRef<HTMLDivElement>(null)

  useMemo(() => {
    fileListSet(state.makeFileList)
  },[state.makeFileList])

  const addTextAction = () => {
    const text = new fabric.IText(addText, {
      left: 55,
      top: 30,
      fontFamily: 'helvetica',
      fill: '#f55',
      angle: 0,
    })
    fabricCanvas.add(text)
  }

  const addRectAction = () => {
    const rect = new fabric.Rect({
      width: 100,
      height: 100,
      top: 10,
      left: 10,
      fill: 'rgba(255,0,0,0.5)',
    })
    fabricCanvas.add(rect)
  }

  const addCircleAction = () => {
    const circle = new fabric.Circle({
      radius: 30,
      fill: '#f55',
      top: 100,
      left: 100,
    })
    fabricCanvas.add(circle)
  }

  const addImageAction = (imgSrc?:string) => {
    const imgPath = imgSrc ? imgSrc : imagePath;
    fabric.Image.fromURL(
      imgPath,
      function (img: any) {
        img.crossOrigin = 'Anonymous'
        fabricCanvas.add(img)
      },
      { crossOrigin: 'anonymous' },
    )
  }

  const imgDownload = () => {
    const a = document.createElement('a')
    const hrefData = writeCanvas.current?.toDataURL('image/png')
    // const l = document.getElementById("canvas") as HTMLCanvasElement;
    // const hrefData = l?.toDataURL('image/png');
    if (!hrefData) return
    a.href = hrefData
    a.download = 'canvas.png'
    a.click()
  }

  const totalRenderRates = () => {
    let counter = 0
    renderRates.forEach((item) => {
      counter = counter + Number(item.rate)
    })
    return <p className="">トータル | {counter}</p>
  }

  const addMovieImage = () => {
    console.log(state.makeFileList)
    state.makeFileList.forEach((file) => {
      addImageAction(file.imgSrc)
    })
    setOpen(false)
  }

  useEffect(() => {
    const containerDom = document.querySelector(".ui.container.make-flow-image") as HTMLDivElement
    const w = containerDom.clientWidth !== 0 ? containerDom.clientWidth : 700;
    const h = window?.innerHeight/0.6;
    const fabricCanvas = new fabric.Canvas("canvas", {
      renderOnAddRemove: true,
      width: w,
      height: h,
    });
    setFabricCanvas(fabricCanvas);
    fabricCanvas.selection = true;
    const list = [];
    // for (let index = 0; index < makeComparisons.length; index++) {
    //   list.push({ id: index, rate: "0" });
    // }
    // setRenderRates(list);
  }, []);

  return (
    <div className="content">
      <div className="select-">
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button>画像確認</Button>}
        >
          <Modal.Header>作成した画像から選んでください</Modal.Header>
          <Modal.Content image scrolling>
            <Modal.Description>
              <Header as="h4">これらの画像でイメージ情報をサンプリングします</Header>
               {fileList.map((file,k) => <div key={`file${k}`}><span>{file.name}</span><img src={file.imgSrc} /></div>)}
            </Modal.Description>
            <Modal.Actions>
              
            </Modal.Actions>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={addMovieImage}>画像を追加</Button>
          </Modal.Actions>
        </Modal>
        <Select placeholder='描画タイプを選んでください' options={countryOptions} />
      </div>
      <div className="fields p-2">
        <div className="field pb-1">{totalRenderRates()}</div>
        <div className="field">
          <div className="btn-action">
            <span className="action-box">
              <Input
                value={imagePath}
                onChange={(e) => setImagePath(e.target.value)}
              />
              <Button onClick={() => addImageAction()}>add Image</Button>
            </span>
            <span className="action-box">
              <Input
                type="text"
                value={addText}
                onChange={(e) => setAddText(e.target.value)}
              />
              <Button onClick={addTextAction}>add text</Button>
            </span>
            <Button onClick={() => addRectAction()} >add rect</Button>
            <Button onClick={() => addCircleAction()} >add circle</Button>
          </div>
        </div>
        <div className="field">
        <div className="write-img flex" ref={writeCanvasContent}>
          <canvas
            id="canvas"
            className="write-canvas"
            ref={writeCanvas}
          ></canvas>
          </div>
        </div>
        <Button onClick={() => imgDownload()}>imgDownload</Button>
      </div>
    </div>
  )
}

export default MakerSolidTorus
