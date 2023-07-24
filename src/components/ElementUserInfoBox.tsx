import { useState, useContext } from 'react'
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
  const [userInfo, _] = useState<User>(state?.user)
  const [userState, setUserState] = useState({
    inputNumver: userInfo.inputNumver ?? 0,
    loginNumber: userInfo.loginNumber ?? 0,
    targetRunNumber: userInfo.targetRunNumber ?? 0,
    totalRunNumber: userInfo.totalRunNumber ?? 0,
    achievement: userInfo.achievement ?? 0,
  })

  const chnageState = (setNumber: number, type: string) => {
    console.log(setNumber)
    console.log(type)
    setUserState({ ...userState, [type]: setNumber })
  }

  const setUserAction = () => {
    setOpen(false)
    const setItem = {
      ...userInfo,
      inputNumver: userState.inputNumver,
      loginNumber: userState.loginNumber,
      targetRunNumber: userState.targetRunNumber,
      totalRunNumber: userState.totalRunNumber,
      achievement: userState.achievement,
    }
    dispach({type:"user/add",user:setItem})
  }

  const tateValue = () => {
    const rate = (state?.user?.achievement / state?.user?.totalRunNumber)
    return `${Math.round(rate*100)}%` ?? "none"
  }

  return (
    <div className="content-input-box">
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>ユーザー情報調整</Button>}
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
                  defaltvalue={userState?.inputNumver}
                  width={4}
                  onChange={(e, data) => {
                    chnageState(Number(data.value), 'inputNumver')
                  }}
                />
                <Form.Input
                  label="ログイン回数"
                  placeholder="4"
                  defaltvalue={userState?.loginNumber}
                  width={4}
                  onChange={(e, data) => {
                    chnageState(Number(data.value), 'loginNumber')
                  }}
                />
                <Form.Input
                  label="実行中"
                  placeholder="4"
                  defaltvalue={userState?.targetRunNumber}
                  width={4}
                  onChange={(e, data) => {
                    chnageState(Number(data.value), 'targetRunNumber')
                  }}
                />
              </Form.Group>
              <Form.Group>

                <Form.Input
                  label="総合実行タスク情報"
                  placeholder="4"
                  defaltvalue={userState?.totalRunNumber}
                  width={4}
                  onChange={(e, data) => {
                    chnageState(Number(data.value), 'totalRunNumber')
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
                <Form.Input
                  label={'目的達成数'}
                  placeholder="8回"
                  defaltvalue={userState?.achievement}
                  width={2}
                  onChange={(e, data) => {
                    chnageState(Number(data.value), 'achievement')
                  }}
                />
                <Form.Input
                  label={'自分のスキルレベル'}
                  placeholder="8(10段階)"
                  focus={false}
                  width={2}
                  onChange={(e, data) => {
                    // chnageState(Number(data.value), 'achievement')
                  }}
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
        <p>目標達成率 : {tateValue()}</p>
      </div>
    </div>
  )
}

export default ElementUserInfoBox
