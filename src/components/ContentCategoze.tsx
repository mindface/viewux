import { useRef, useMemo, useEffect, useState, ChangeEvent } from "react";
import { Button } from 'semantic-ui-react'

import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs';
import { type } from "os";

interface FileItem {
  name: string;
  file?: File;
  category: string;
  detail: string;
}

interface FileCategoze {
  className: string;
  probability: number;
}

type FileList = FileItem[]
type FileCategozeList = FileCategoze[]

function fileToImage(file:File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = event => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = error => reject(error);
      if(event.target?.result) {
        img.src = event.target?.result as string;
      }
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

function ContentCategoze () {
  const imageElement = useRef<HTMLImageElement>(null)
  const [fileData,fileDataSet] = useState<File>()
  const [fileList,fileListSet] = useState<FileList>([])

  const addFileListAction = () => {
    if(fileData) {
      const item = {
        name: `imgFile${fileList.length+1}`,
        file: fileData,
        category: "",
        detail: ""
      }
      fileListSet([...fileList,item])
    }
  }

  const setFileListCategozeAction = (item: FileItem, infoList: FileCategozeList) => {
    const list = fileList.map((file) => {
      if(file.name === item.name) {
        let text = ""
        infoList.forEach((info, index) => {
          text += infoList.length === index ? info.className + "| " : info.className
        })
        return {...file, detail: text}
      }
      return file
    })
    fileListSet(list)
  }

  const FileCategozeAction = async (fileItem?: FileItem) => {
    if(!fileItem) return
    const file = fileItem.file
    if(!file) return
    try {
        const reader = new FileReader();
        reader.onload = event => {
          const img = new Image();
          img.onload = () => {
            if(event.target?.result) {
              (async() => {
                const model = await mobilenet.load();
                const predictions = await model.classify(img);
                setFileListCategozeAction(fileItem,predictions)
              })()
            }
          }
          img.src = event.target?.result as string;
        };
        reader.onerror = error => console.error(error);
        reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error during model loading or prediction:", error);
    }
  };

  const putImageTag = (item:FileItem) => {
    if(!item.file) return <>no file</>
    const src = URL.createObjectURL(item.file)
    return <img src={src} alt={fileData?.name} />
  }

  return (
    <div className="content-categoze">
      <div className="p-1">
        <div className="file-input">
          <input
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const files = e.target?.files
              if(files && files?.length > 0) {
                fileDataSet(files[0])
              }
            }}
          />
          <Button onClick={addFileListAction}>add</Button>
        </div>
        <div className="file-output flex">
          {fileList.map((file,k) => <div className="file-info" key={`file${k}`}>
            {file.name} | <Button onClick={() => {FileCategozeAction(file)}}
            >categoraize</Button>
            <p>{file.detail}</p>
          <div className="img-box">{putImageTag(file)}</div>
          </div>)}
        </div>
      </div>
    </div>
  )
}
  
export default ContentCategoze
