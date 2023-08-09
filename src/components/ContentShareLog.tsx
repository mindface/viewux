import {
  Form,
  Button,
  Input,
  Header,
  Select,
  Popup,
  List,
} from 'semantic-ui-react'
import { useState, useRef, ChangeEvent, useMemo, useCallback } from 'react'

interface Item {
  id: string
  name: string
  supplement: string
}

type List = Item[]

function ContentShareLog() {
  const [info, infoSet] = useState('')
  const [averageItem, averageItemSet] = useState('')
  const [averageList, averageListSet] = useState<List>([])
  const [field, fieldSet] = useState('')
  const [setId, setIdSet] = useState('')
  const [verticalTagId, verticalTagIdSet] = useState('AE01')
  const [_vertical, _verticalSet] = useState('3')
  const [_side, _sideSet] = useState('3')
  const jsonset = useRef<HTMLInputElement>(null)

  const addAverageItem = () => {
    const addItem = {
      id: `averageItem${averageList.length + 1}`,
      name: averageItem,
      supplement: 'none',
    }
    averageListSet([...averageList, addItem])
  }

  return (
    <div className="content-share-log">
      <div className="make-info">
        前提情報と言われて決定する環境や状況の比率を規定する、妥当性があると問題処理が止まる
        <Form>
          <Form.Group>
            <Form.Field>
              組織平均比率 [向上比率、個人比率,]
              <Input
                fluid={true}
                placeholder="First name"
                value={averageItem}
                onChange={(e, data) => averageItemSet(data.value)}
              />
              <Button onClick={addAverageItem}>add</Button>
              平均比率項目
              <List>
                <List.Item></List.Item>
              </List>
            </Form.Field>
          </Form.Group>
          <div className="output pb-2">
            {averageList.map((average, k) => (
              <div key={`average${k}`} className="p-1">
                {average.id} | {average.name}
              </div>
            ))}
          </div>
          <Form.Group>
            <Form.Field>
              <Input
                label="同じ単語に例をつけるケース"
                placeholder="First name"
              />
            </Form.Field>
          </Form.Group>
        </Form>
      </div>
    </div>
  )
}

export default ContentShareLog
