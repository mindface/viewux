import { useEffect, useState, useContext } from 'react'
import { Button } from 'semantic-ui-react'
import { userContext } from "../context/user";
import type { User } from "../context/user";

import ContentInputsAccordion from './ContentInputsAccordion'
import ContentInputsTab from './ContentInputsTab'
import ContentInputsScroll from './ContentInputsScroll'

function ContainerBackendCalc() {
  const { state } = useContext(userContext)
  const [view, setView] = useState('1')

  return (
    <div className="container-form">
      <div className="user-info-box position-shaft hover-view">
        <Button content="ユーザー情報について" primary />
      </div>
      <div className="actions pt-1">
      </div>
    </div>
  )
}

export default ContainerBackendCalc
