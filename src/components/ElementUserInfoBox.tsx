import React, { useState, useContext } from 'react'
import { Button, Header, Form, Modal, Select } from 'semantic-ui-react'
import { userContext } from '../context/user'
import type { User } from '../context/user'

const genderOptions = [
  { key: 'm', text: 'Bモデル', value: 'b' },
  { key: 'f', text: 'FFモデル', value: 'female' },
  { key: 'o', text: 'REモデル', value: 'other' },
]

function ElementUserInfoBox() {
  const [open, setOpen] = useState(false)
  const { state, dispach } = useContext(userContext)
  const [userInfo, setUserInfo] = useState<User | null>(state?.user)
  const [userState, setUserState] = useState({
    inputNumver: 0,
    loginNumber: 0,
    targetRunNumber: 0,
    totalRunNumber: 0,
    achievement: 0,
  })

  const chnageState = (setNumber: number, type: string) => {
    setUserState({ ...userState, [type]: setNumber })
  }

  const handleChange = (e: Event, value: any) => {
    console.log(e)
    console.log(value)
  }

  const setUserAction = () => {
    setOpen(false)
  }

  return (
    <div className="content-input-box">
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>ユーザー情報について</Button>}
      >
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>ユーザーの情報因子</Header>
            <Form>
              <Form.Group>
                <Form.Input
                  label="入力回数"
                  placeholder="20"
                  width={4}
                  onChange={(e, data) => {
                    chnageState(Number(data.value), 'inputNumver')
                  }}
                />
                <Form.Input
                  label="ログイン回数"
                  placeholder="4"
                  width={4}
                  onChange={(e, data) => {
                    chnageState(Number(data.value), 'loginNumber')
                  }}
                />
                <Form.Field
                  control={Select}
                  options={genderOptions}
                  label={'操作モデル'}
                  placeholder="FJモデル"
                  search
                  searchInput={{ id: 'form-select-control-gender' }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input label={'目的達成数'} placeholder="10%" width={2} />
                <Form.Input
                  label={'入力は1つの画面にしたい'}
                  placeholder="10%"
                  focus={false}
                  width={2}
                />
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            閉じる
          </Button>
          <Button color="green" onClick={setUserAction}>
            フォームに適用
          </Button>
        </Modal.Actions>
      </Modal>
      <div className="user-info">
        <p>name : {userInfo?.name ?? 0}</p>
        <p>inputNumver : {userInfo?.inputNumver ?? 0}</p>
      </div>
    </div>
  )
}

export default ElementUserInfoBox
