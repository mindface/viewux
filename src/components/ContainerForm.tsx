import { useEffect, useState, useContext } from 'react'
import { Button } from 'semantic-ui-react'
import { userContext } from '../context/user'
import type { User } from '../context/user'

import ContentInputsAccordion from './ContentInputsAccordion'
import ContentInputsTab from './ContentInputsTab'
import ContentInputsScroll from './ContentInputsScroll'

function ContainerForm() {
  const { state } = useContext(userContext)
  const { inputNumver, loginNumber, totalRunNumber, achievement } =
    state.user as User
  const [view, setView] = useState('1')
  const [userInfo, setUserInfo] = useState(state.user)

  useEffect(() => {
    console.log(state)
    setUserInfo(state.user)
  }, [inputNumver, loginNumber, totalRunNumber, achievement])

  return (
    <div className="container-form">
      <div className="user-info-box position-shaft hover-view">
        <Button content="ユーザー情報について" primary />
        <div className="user-info position-item-bl view">
          <p className="">ユーザー名 | {userInfo.name}</p>
          <p className="pt-1">総合実行数 | {userInfo.totalRunNumber}</p>
          <p className="pt-1">ログイン数 | {userInfo.loginNumber}</p>
          <p className="pt-1">目的達成数 | {userInfo.achievement}</p>
          <p className="pt-1">
            達成率 | {userInfo.achievement / userInfo.totalRunNumber}
          </p>
        </div>
      </div>
      <div className="actions pt-1">
        <Button content="Accordion" onClick={() => setView('1')} primary />
        <Button content="Tab" onClick={() => setView('2')} primary />
        <Button content="scroll" onClick={() => setView('3')} primary />
      </div>
      {view === '1' && <ContentInputsAccordion />}
      {view === '2' && <ContentInputsTab />}
      {view === '3' && <ContentInputsScroll />}
    </div>
  )
}

export default ContainerForm
