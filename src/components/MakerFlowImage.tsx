import { useState, useRef, ChangeEvent, ReactNode } from 'react'
import { Input, Button, List } from 'semantic-ui-react'
import { makeFileList, makeFile } from '../context/makeFiles'
import { HelperFile } from '../lib/helper-file'
import html2canvas from 'html2canvas'

const helperFile = new HelperFile()
const videoWidth = 560
function MakerFlowImage() {
  const [vertical, verticalSet] = useState(true)
  const [fileName, fileNameSet] = useState('')
  const [imageFiles, imageFilesSet] = useState<makeFileList>([])
  const [addTitle, addTitleSet] = useState(helperFile.generateString())
  const [addDetail, addDetailSet] = useState('')
  const [videoWdith, videoWdithSet] = useState(0)
  const imageOutPut = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  const makeImageAction = () => {
    ;(async () => {
      const base64data = canvas.current?.toDataURL('image/png') ?? ''
      const formData = new FormData()
      if (!base64data) return
      const fileData = helperFile.createBaseFileBase64(
        base64data,
        fileName,
        'png',
      )

      formData.append('file', fileData as Blob)
      formData.append('fileName', 'name')

      // const config = {
      //   method: "POST",
      //   headers: {
      //     // "Content-Type": "application/json"
      //     // "Content-Type": "multipart/form-data"
      //   },
      //   body: formData
      // }
      // try {
      //   const res = await fetch(`${url}/upload`,config)
      //   res.json().then((res) => {
      //     console.log(res);
      //     makeImagesSet([...makeImages,{id:makeImages.length+1,path:res.uploadedFileName}])
      //     alert("アップロードに成功しました。")
      //   })
      // } catch (error) {
      //   console.error(error)
      // }
    })()
  }

  const setFileOnMovie = (files: File[]) => {
    if (!files) return
    const file = files[0]
    const urlPath = URL.createObjectURL(file)
    // file.name ?? fileNameSet((file.name as string).split(".")[0])
    if (!video.current) return
    video.current!.src = urlPath
    video.current?.addEventListener('timeupdate', (e: Event) => {
      const ctx = canvas.current?.getContext('2d')
      const w = video.current?.clientWidth
      const h = video.current?.clientHeight
      videoWdithSet(w)
      if (w && h) {
        const rtio = h / w
        canvas.current!.width = w
        canvas.current!.height = h
        ctx?.drawImage(video.current!, 0, 0, w, w * rtio)
      }
    })
  }

  const addCanvasForImageAction = () => {
    const image = document.createElement('img')
    const url = canvas.current?.toDataURL('image/png')
    if (url) {
      image.src = url
      // imageOutPut.current?.appendChild(image)
      imageFilesSet([
        ...imageFiles,
        {
          id: imageFiles.length + 1,
          name: addTitle,
          imgSrc: url,
          title: addTitle,
          detail: addDetail,
        },
      ])
    }
  }

  const totalImageDownLoadAction = () => {
    if (imageOutPut.current) {
      html2canvas(imageOutPut.current).then((canvas) => {
        // canvasを画像としてダウンロード
        let link = document.createElement('a')
        link.href = canvas.toDataURL('image/png')
        link.download = 'image.png'
        link.click()
      })
    }
  }

  const downloadAction = (image: makeFile) => {
    const img = new Image()
    const _canvas = document.createElement('canvas')
    const ctx = _canvas.getContext('2d')
    const a = document.createElement('a')
    a.setAttribute('download', `${image.name}.png`)
    // const url = URL.createObjectURL(blob)
    a.setAttribute('href', image.imgSrc)
    a.click()
    a.remove()
  }

  const copyAction = (path: string) => {
    let copyText = `/uploads/${path}`
    // copyText += `${item.title}\n \n ${item.date}\n \n`
    navigator.clipboard.writeText(copyText)
  }

  return (
    <div className="maker-flow-image">
      <div className="struct-pack">
        <div className="field">
          <input
            type="text"
            value={fileName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              fileNameSet(e.target.value ?? '')
            }}
          />
          <p>
            <input
              type="file"
              accept="video/*"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const data = e.target as HTMLInputElement
                const files = (data.files ?? []) as File[]
                if (files) {
                  setFileOnMovie(files)
                }
              }}
            />
            （動画のみ）
          </p>
        </div>
        <div className="field">
          <video controls className="video" ref={video} width={videoWidth} />
          <canvas ref={canvas} className="canvas" />
        </div>
        <div className="field">
          <List divided relaxed>
            <List.Item>
              <Button onClick={() => video?.current?.play()}>start</Button>
              <Button onClick={() => video?.current?.pause()}>stop</Button>
            </List.Item>
            <List.Item>
              <div className="">
                <span className="block-ib p-1">
                  <Input
                    label="ファイル名"
                    placeholder="xsewew"
                    value={addTitle}
                    onChange={(e) => addTitleSet(e.target.value)}
                  />
                </span>
                <span className="block-ib p-1">
                  <Input
                    style={{ width: '320px' }}
                    label="説明"
                    placeholder=""
                    value={addDetail}
                    onChange={(e) => addDetailSet(e.target.value)}
                  />
                </span>
              </div>
              <Button onClick={() => verticalSet(!vertical)}>
                {vertical ? '横' : '縦'}
              </Button>
              <Button onClick={addCanvasForImageAction}>イメージ化</Button>
              <Button onClick={totalImageDownLoadAction}>
                トータルイメージを作成
              </Button>
            </List.Item>
          </List>
        </div>
        <div className="field">
          <button className="btn" onClick={makeImageAction}>
            現在の画像をアップロード{imageFiles.length * Math.floor(videoWdith)}
          </button>
        </div>
        <div className="field overflow-xsc">
          <div
            ref={imageOutPut}
            className={vertical ? 'image-out-put' : 'image-out-put flex'}
            style={{
              width: vertical
                ? ''
                : `${imageFiles.length * Math.floor(videoWdith)}px`,
            }}
          >
            {imageFiles.map((image, k) => (
              <div
                className="image relative position-shaft hover-view"
                key={`image${k}`}
              >
                <div className="image-info position-item-c view">
                  <div>{image.name}</div>
                  <div>
                    <Button
                      label="down load"
                      onClick={() => downloadAction(image)}
                    />
                  </div>
                </div>
                <img src={image.imgSrc} />
              </div>
            ))}
          </div>
          auto
        </div>
      </div>
    </div>
  )
}

export default MakerFlowImage
