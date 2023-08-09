import { useEffect, useState, useContext } from 'react'
import { Button, Input, Header } from 'semantic-ui-react'

interface Phase {
  id: string
  title: string
  detail: string
  connectLink?: string
  list?: PhaseItemList
  status: string
}

type PhaseList = Phase[]

interface PhaseItem {
  id: string
  title: string
  detail: string
  connectId: string
  putSignature: boolean
}

type PhaseItemList = PhaseItem[]

function ContainerPhasesAndMeans() {
  const [phaseList, phaseListSet] = useState<PhaseList>([])
  const [phaseItemList, phaseItemListSet] = useState<PhaseItemList>([])

  const [title, titleSet] = useState('')
  const [detail, detailSet] = useState('')

  const addPhaseAction = (type: string, itemId?: string) => {
    const additem = {
      id: `phase${phaseList.length + 1}`,
      title: title,
      detail: detail,
      list: [],
      status: 'run',
    }
    phaseListSet([...phaseList, additem])
  }
  const addPhaseItemAction = () => {
    const additem = {
      id: `phaseItem${phaseList.length + 1}`,
      title: title,
      detail: detail,
      connectId: '',
      putSignature: true,
    }
    const list = phaseList.map((phase) => {
      if (phase.list) {
        const phaseItem = [...phase.list, additem]
        phase.list = JSON.parse(JSON.stringify(phaseItem))
      }
      return phase
    })
    phaseListSet(list)
    phaseItemListSet([...phaseItemList, additem])
  }

  const checkPhaseItemAction = (
    phaseId: string,
    phaseItemId: string,
    check: boolean,
  ) => {
    const list = phaseList.map((phase) => {
      if (phase.list && phase.id === phaseId) {
        const itemList = (phase.list ?? []).map((phaseItem) => {
          if (phaseItem.id === phaseItemId) {
            phaseItem.putSignature = check
          }
          return phaseItem
        })
        phase.list = itemList
      }
      return phase
    })
    phaseListSet(list)
  }

  const copyAction = () => {
    let text = ''
    phaseList.forEach((phase) => {
      text += '----------------- \n'
      text += `${phase.title}  +| `
      ;(phase?.list ?? []).forEach((phaseItem, index) => {
        if (phaseItem.putSignature) {
          text += phaseItem.title + ' | '
          if (phaseItemList.length === index + 1) text += '\n'
        }
      })
      text += '-----------------\n'
    })
    navigator.clipboard.writeText(text)
  }

  const phaseItemCheckAction = (
    phaseId: string,
    phaseItemId: string,
    check: boolean,
  ) => {
    phaseList.forEach((phase) => {
      if (phase.id === phaseId) {
        const list = phaseItemList.map((phaseItem, index) => {
          if (phaseItem.id === phaseItemId) {
            phaseItem.putSignature = check
          }
          return phaseItem
        })
        console.log('phaseItemListSet///////////')
        console.log(phaseItemList)
        console.log(list)
        phaseItemListSet(list)
      }
    })
  }

  return (
    <div className="container-phases-means">
      <div className="actions">
        <div className="actions-input p-1">
          <Input
            placeholder="タイトル"
            value={title}
            onChange={(e, data) => {
              titleSet(data.value)
            }}
          />
          <Input
            placeholder="詳細"
            value={detail}
            onChange={(e, data) => {
              detailSet(data.value)
            }}
          />
        </div>
        <div className="p-1">
          <Button onClick={() => addPhaseAction('phase')}>phase 追加</Button>
          {phaseList.length > 0 && (
            <Button onClick={() => addPhaseItemAction()}>phaseItem 追加</Button>
          )}
        </div>
      </div>
      <div className="views">
        {phaseList.map((phase, k) => (
          <div className="phase flex" key={`phase${k}`}>
            <div className="phase-item phase-caption">{phase.title}</div>
            {phaseList.length &&
              phaseItemList.map((phaseItem, h) => (
                <div
                  className="phase-item phase-math"
                  key={`phaseItem${k}${h}`}
                >
                  <div className="hover-view p-1">{phaseItem.detail}</div>
                  <span className="caption">
                    <span className="pb-1">
                      {`${k + 1}-${h}`}
                      <input
                        type="checkbox"
                        defaultChecked={phaseItem.putSignature}
                        onChange={(e) => {
                          checkPhaseItemAction(
                            phase.id,
                            phaseItem.id,
                            e.target.checked,
                          )
                        }}
                      />
                    </span>
                    <br />
                    {phaseItem.title}
                  </span>
                </div>
              ))}
          </div>
        ))}
        <Button onClick={copyAction}>テキストの羅列をコピー</Button>
      </div>
    </div>
  )
}

export default ContainerPhasesAndMeans
