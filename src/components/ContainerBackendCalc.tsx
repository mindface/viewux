import { useEffect, useState, useContext, useMemo } from 'react'
import { Button, Input } from 'semantic-ui-react'
import { userContext } from '../context/user'
import type { User } from '../context/user'

interface makeInfo {
  id: number
  title: string
  detail: string
}

type makeInfoList = makeInfo[]

function ContainerBackendCalc() {
  const { state } = useContext(userContext)
  const [viewNumber, viewNumberSet] = useState(0)
  const [stateNumber, stateNumberSet] = useState({
    mainFieldMin: 0,
    mainFieldMax: 10,
  })
  const [makeMainNumber, makeMainNumberSet] = useState('1')

  const makeRandom = (min: number, max: number) => {
    const _min = Math.ceil(min)
    const _max = Math.ceil(max)
    return Math.floor(Math.random() * (_max - _min) + _min)
  }

  const settingsViewNumberSet = () => {
    viewNumberSet(Number(makeMainNumber))
  }

  const makeJson = useMemo(() => {
    if (viewNumber === 0) return
    const list: makeInfoList = []
    for (let index = 0; index < viewNumber; index++) {
      list.push({
        id: index + 1,
        title: `title ${index + 1}`,
        detail: `detail ${makeRandom(
          stateNumber.mainFieldMin,
          stateNumber.mainFieldMax + index,
        )}`,
      })
    }
    return list
  }, [viewNumber])

  return (
    <div className="container-form">
      <div className="user-info-box position-shaft hover-view">
        <div className="field">
          <Input
            label="ランダム最小"
            placeholder="0"
            value={stateNumber.mainFieldMin}
            onChange={(e) => {
              stateNumberSet({
                ...stateNumber,
                mainFieldMin: Number(e.target.value),
              })
            }}
          />
          <Input
            label="ランダム最大"
            placeholder="0"
            value={stateNumber.mainFieldMax}
            onChange={(e) => {
              stateNumberSet({
                ...stateNumber,
                mainFieldMax: Number(e.target.value),
              })
            }}
          />
        </div>
        <div className="field">
          <Input
            label="情報作成数"
            min={1}
            max={10000}
            type="nunmber"
            placeholder="フィールド"
            value={makeMainNumber}
            onChange={(e) => {
              makeMainNumberSet(e.target.value)
            }}
          />
          <Button onClick={settingsViewNumberSet} content="作成" primary />
        </div>
      </div>
      <div className="outpput">
        {makeJson?.map((json, k) => <div key={`json${k}`}>{json.title}</div>)}
      </div>
      <div className="actions pt-1"></div>
    </div>
  )
}

export default ContainerBackendCalc
