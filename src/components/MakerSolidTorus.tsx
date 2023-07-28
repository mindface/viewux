import React, { useEffect, useMemo, useContext, useRef, useState } from 'react'
import {
  Input,
  Button,
  Header,
  Modal,
  Select,
  Card,
  Icon,
  Image
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
  const [imageViewType, setImageViewType] = useState('')
  const [addText, setAddText] = useState('')
  const [imagePath, setImagePath] = useState('')
  const [putColor, setPutColor] = useState('#333')
  const [viewCnanvasWidth,viewCnanvasWidthSet] = useState(0)
  const [viewCnanvasHeight,viewCnanvasWidthHeight] = useState(0)
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
      fill: putColor,
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
      fill: putColor,
    })
    fabricCanvas.add(rect)
  }

  const addCircleAction = () => {
    const circle = new fabric.Circle({
      radius: 30,
      fill: putColor,
      top: 100,
      left: 100,
    })
    fabricCanvas.add(circle)
  }

  const addImageAction = (imgSrc?:string,x?:number,y?:number) => {
    const imgPath = imgSrc ? imgSrc : imagePath;
    console.log("x",x)
    console.log("y",y)
    fabric.Image.fromURL(
      imgPath,
      function (img: any) {
        img.crossOrigin = 'Anonymous'
        img.top = x ? x : 10
        img.left = y ? y : 10
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
    const makeFileList = state.makeFileList
    const cx = viewCnanvasWidth/3
    const cy = viewCnanvasHeight/3
    makeFileList.forEach((file,index) => {
      const angle = (Math.PI*2/makeFileList?.length) * index

      if( imageViewType === "circle" ){
        const x = Math.floor(cx + 200 * Math.cos(angle))
        const y = Math.floor(cy + 200 * Math.sin(angle))
        addImageAction(file.imgSrc,x,y)
      }else if( imageViewType === "order" ){
        addImageAction(file.imgSrc,10,index*300)
      }else{
        addImageAction(file.imgSrc)
      }
    })
    setOpen(false)
  }

  const deleteItemAction = () => {
    if(writeCanvas.current) {
      const objects = fabricCanvas?.getActiveObjects()
      if(objects) {
        objects.forEach((obj) => {
          fabricCanvas.remove(obj)
        })
      }else {
        alert("選択されていません")
      }
    }
  }

  useEffect(() => {
    const containerDom = document.querySelector(".ui.container.make-flow-image") as HTMLDivElement
    const w = containerDom?.clientWidth !== 0 ? containerDom?.clientWidth : 700;
    const h = window?.innerHeight/0.6;
    viewCnanvasWidthSet(w)
    viewCnanvasWidthHeight(h)
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
              <div className="flex">
               {fileList.map((file,k) => <div key={`file${k}`}>
                  <Card>
                    <Image src={file.imgSrc} wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>{file.name}</Card.Header>
                      <Card.Description>
                        {file.detail}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Button onClick={() => addImageAction(file.imgSrc,20,20)}>追加します</Button>
                    </Card.Content>
                  </Card>
              </div>)}
              </div>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setOpen(false)}>閉じる</Button>
            <Button onClick={addMovieImage}>画像を追加</Button>
          </Modal.Actions>
        </Modal>
        <Select
          placeholder='描画タイプを選んでください'
          options={countryOptions}
          onChange={(e,data) => setImageViewType(data.value as string)}
        />
      </div>
      <div className="fields p-2">
        <div className="field pb-1">{totalRenderRates()}</div>
        <div className="field">
          <div className="btn-action">
            <span className="action-box">
              <Input
                placeholder="画像のurlを入力して右のボタンを押します"
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
            <Input
              type='color'
              value={putColor}
              onChange={(e,data) => {
                setPutColor(data.value)
              }}
            />
            <Button onClick={() => deleteItemAction()} >select delete</Button>
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
