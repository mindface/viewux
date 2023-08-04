import { Form, Button, Input, Header, Select } from 'semantic-ui-react'
import { useState, useRef, ChangeEvent, useMemo, useCallback } from "react";
import { HelperFile } from "../lib/helper-file";
import { read } from 'fs';

const helperFile = new HelperFile()

interface Box {
  id: string;
  type: string;
  info: string;
  value: string;
  list?: BoxList;
  status: string;
  tag?: string;
}

type BoxList = Box[]

interface Selector {
  key:string;text:string;value:string;
}

type SelectorList = Selector[]

const tagOptions: SelectorList = [
  {
    key: "",
    text: "",
    value: "",
  }
]

const tagPlotOptions = [
  {
    key: "d01",
    text: "言語定義化",
    value: "AE01",
  },
  {
    key: "d02",
    text: "AI評価利用化",
    value: "PE01",
  },
  {
    key: "d03",
    text: "AI画像処理(セグメント)",
    value: "PE02",
  },
  {
    key: "d04",
    text: "AI画像処理(類似)",
    value: "PE03",
  },
  {
    key: "d05",
    text: "プランニング(職業別)",
    value: "PE04",
  }
]

function ContentBoxtooler() {
  const [verticalList, verticalListSet] = useState<BoxList>([])
  const [sideList, sideListSet] = useState<BoxList>([])
  const [info, infoSet] = useState("")
  const [field, fieldSet] = useState("")
  const [setId, setIdSet] = useState("")
  const [verticalTagId, verticalTagIdSet] = useState("AE01")
  const [_vertical, _verticalSet] = useState("3")
  const [_side, _sideSet] = useState("3")
  const jsonset = useRef<HTMLInputElement>(null)

  const addVerticalAction = () => {
    const item = {
      id: "verticalNumber"+verticalList.length+1,
      type: "vertical",
      info: info,
      value: "0",
      status: "run",
      tag: verticalTagId
    }
    verticalListSet([...verticalList,item])
  }

  const deleteVerticalAction = (id:string) => {
    const list = verticalList.map((vertical) => {
      if(vertical.id === id) {
        vertical.status = "delete"
      }
      return vertical
    })
    verticalListSet([...list])
  }

  const options = useMemo(() => {
    const list: SelectorList = [];
    sideList.forEach((s,k) => {
      list.push({
        key: `key${k}`,
        text: s.info,
        value: s.id 
      })
    })
    return list
  },[sideList])

  const verticalViewList = useMemo(() => {
    return verticalList.filter((side) => side.status === "run")
  }, [verticalList])

  const setSideVertical = () => {
    if(!setId) return alert(setId)
    const list = sideList.map((s,k) => {
      if(s.id === setId) {
        s.list = JSON.parse(JSON.stringify(verticalViewList))
      }
      return s
    })
    sideListSet([...list])
  }

  const addSideAction = () => {
    const item = {
      id: "sideNumber"+sideList.length+1,
      type: "side",
      info: field,
      value: "0",
      status: "run"
    }
    sideListSet([...sideList,item])
  }

  const deleteSideAction = (id:string) => {
    const list:BoxList = []
    sideList.forEach((side) => {
      if(side.id === id) {
        side.status = "delete"
      }
      list.push(side)
    })
    sideListSet([...list])
  }

  const viewTag = (tagValue:string) => {
    let viewText = "";
    tagPlotOptions.forEach((plot) => {
      if(tagValue === plot.value) {
        viewText = plot.text
      }
    })
    return viewText;    
  }

  const reSideList = (list: BoxList) => {
    return list.filter((item) => item.status === "run")
  }

  const downloadAction = () => {
    const jsonItem = {
      verticalList: verticalList,
      sideList: sideList,
    }
    helperFile.downLoadJSON<{ verticalList: BoxList, sideList: BoxList}>(jsonItem, "verticalandside.json")
  }

  const textCopy = () => {
    
  }

  const handleFileUpload = (ev:ChangeEvent<HTMLInputElement>) => {
    if(!ev?.target.files) {
      alert("jsonファイルを利用してください")
      return 
    }
    const file = ev?.target.files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      if(event.target?.result) {
        try {
          const json = JSON.parse(event.target?.result as string)
          verticalListSet(json.verticalList)
          sideListSet(json.sideList)
        } catch (error) {
          console.error(error) 
        }
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="content-boxs">
      <div className="input-file">
        <label htmlFor="jsonFile" id="file-input" className='file-input'>
          jsonファイルを選択してください
          <input
            type="file"
            id='jsonFile'
            accept="application/json"
            ref={jsonset}
            className="jsonset"
            onChange={handleFileUpload}
          />
        </label>
      </div>
      <div className="control-actions">
        <Form>
          <Form.Field>
            <div className="flex">
              <div className="d-inline-b">
                <Input
                  label="横"
                  placeholder="項目"
                  value={info}
                  onChange={ (e: ChangeEvent<HTMLInputElement>) => {
                    infoSet(e.target.value)}}
                />
              </div>
              <div className="d-inline-b">
                <Select
                  label="side"
                  options={tagPlotOptions}
                  value={verticalTagId}
                  onChange={(e , data) => {
                    if(data?.value) {
                      verticalTagIdSet(data?.value as string)
                    }
                  }}
                />
              </div>
              <Button onClick={addVerticalAction}>add</Button>
            </div>
          </Form.Field>
        </Form>
      </div>
      <div className="math-actions">
      </div>
      <div className="v-boxs">
        <div className="box-lists">
          <div className="box-list">
            <div className="flex">
            <div className='box-item'>横</div>
              {verticalViewList.map((vertical,k) => <div key={"vertical"+k} className='box-item'>
                {vertical?.info} | <span className="tag">{viewTag(vertical.tag ?? "")}</span>
                <div className="actions">
                  <Button onClick={() => deleteVerticalAction(vertical.id)}>削除</Button>
                </div>
              </div>)}
            </div>
            <Form>
              <Form.Field>
                <div className="flex">
                  <div className="d-inline-b">
                    <Select
                      label="side"
                      options={options}
                      value={setId}
                      onChange={(e , data) => {
                        if(data?.value) {
                          setIdSet(data?.value as string)
                        }
                      }}
                    />
                  </div>
                  {/* <Input 
                    label={"横"}
                    placeholder="13"
                    value={_side}
                    onChange={ (e: ChangeEvent<HTMLInputElement>) => {
                      _sideSet(e.target.value)}}
                  /> */}
                  <Button onClick={setSideVertical}>set</Button>再設定も可能です
                </div>
              </Form.Field>
              <Form.Field>
                <div className="flex">
                  <div className="d-inline-b">
                    <Input
                      label="縦"
                      placeholder="フィールド"
                      value={field}
                      onChange={ (e: ChangeEvent<HTMLInputElement>) => {
                        fieldSet(e.target.value)}}
                    />
                  </div>
                  <Button onClick={addSideAction}>add</Button>
                </div>
              </Form.Field>
            </Form>
          </div>
          <div className='box-list flex'>
            <div className='box-item'>縦</div>
            {sideList.map((side,k) =>  <div key={"side"+side.id+k} className='box-item'>
                <Header as="h5">{side.info}</Header>
                <div className="actions">
                  <Button onClick={() => deleteSideAction(side.id)}>削除</Button>
                </div>
            </div>)}
          </div>
        </div>
      </div>
      <div className="blocks-box">
        <div className='box-list'>
          <div className='box-item'>構造の出力結果</div>
            <div className="side-list">
              {sideList.map((side,k) =>  <div key={`sideView${k}`} className='side-item flex'>
                <div className="side-info">
                  <div>{side.info}</div>
                </div>
                <div className="vertical-list flex">
                  {reSideList(side?.list ?? []).map((vertical:Box,bk) => <div key={`sideListVerticalView${bk}`} className='vertical-item'>{vertical.info}</div>)}
                </div>
            </div>)}
          </div>
        </div>
      </div>
      <div className="blocks-box p-1">
        <Button onClick={() => downloadAction()}>jsonダウンロード</Button>
        <Button onClick={() => textCopy()}>テキストコピー</Button>
      </div>
    </div>
  )
}
  
export default ContentBoxtooler
