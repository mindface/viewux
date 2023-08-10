import {
  Form,
  Button,
  Input,
  List,
  Label,
  Header,
  Comment
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
    組織平均比率 [向上比率、個人比率,]
      <div className="make-info flex">
        <div className="half">
          <Form>
            <Form.Group>
              <Form.Field>
                <Input
                  fluid={true}
                  placeholder="First name"
                  value={averageItem}
                  onChange={(e, data) => averageItemSet(data.value)}
                />
                <Button onClick={addAverageItem}>add</Button>
                平均比率項目
                <List>
                  {averageList.map((average, k) => (
                    <List.Item key={`average${k}`} className="p-1">
                      {average.id} | {average.name} <br />
                      <div className="max-x300">
                      <Input
                        label="詳細"
                        placeholder="動作での20%で40分半位"
                      />
                      <Input labelPosition='right' type='text' placeholder='20'>
                        <Label basic>比率</Label>
                        <input />
                        <Label>%</Label>
                      </Input>
                      </div>
                    </List.Item>
                  ))}
                </List>
              </Form.Field>
            </Form.Group>
            <div className="output pb-2">
            </div>
            <Form.Group>
              <Form.Field>
                <Input
                  label="同じ単語に例と違い"
                  placeholder="First name"
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </div>
        <div className="half p-2">
          <Comment.Group minimal>
            <Header as='h3' dividing>
              Comments
            </Header>

            <Comment>
              <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
              <Comment.Content>
                <Comment.Author as='a'>Matt</Comment.Author>
                <Comment.Metadata>
                  <span>Today at 5:42PM</span>
                </Comment.Metadata>
                <Comment.Text>この組み合わせの件でMTGします!</Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>

            <Comment>
              <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
              <Comment.Content>
                <Comment.Author as='a'>Elliot Fu</Comment.Author>
                <Comment.Metadata>
                  <span>Yesterday at 12:30AM</span>
                </Comment.Metadata>
                <Comment.Text>
                  <p>前に誰かが議事録とってMTGしたので、これは前の情報を付加させて検討の余地があれば実地で</p>
                </Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>

              <Comment.Group>
                <Comment>
                  <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                  <Comment.Content>
                    <Comment.Author as='a'>Jenny Hess</Comment.Author>
                    <Comment.Metadata>
                      <span>Just now</span>
                    </Comment.Metadata>
                    <Comment.Text>議事録は似たシステムのアーキテクト用で使う場合は難しいです</Comment.Text>
                    <Comment.Actions>
                      <a>Reply</a>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            </Comment>

            <Comment>
              <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
              <Comment.Content>
                <Comment.Author as='a'>Joe Henderson</Comment.Author>
                <Comment.Metadata>
                  <span>5 days ago</span>
                </Comment.Metadata>
                <Comment.Text>誰かが考えて、情報化してからMTGでお願いします</Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>

            <Form reply>
              <Form.TextArea />
              <Button content='Add Reply' labelPosition='left' icon='edit' primary />
            </Form>
          </Comment.Group>
        </div>
      </div>
    </div>
  )
}

export default ContentShareLog
