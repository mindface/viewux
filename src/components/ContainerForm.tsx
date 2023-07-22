import { useState } from 'react'
import { Button } from 'semantic-ui-react'

import ContentInputsAccordion from './ContentInputsAccordion'
import ContentInputsTab from './ContentInputsTab'
import ContentInputsScroll from './ContentInputsScroll'

function ContainerForm() {
  const [view, setView] = useState('1')
  return (
    <div className="container-form">
      <div className="actions">
        <Button content="1" onClick={() => setView('1')} primary />
        <Button content="2" onClick={() => setView('2')} primary />
        <Button content="3" onClick={() => setView('3')} primary />
      </div>
      {view === '1' && <ContentInputsAccordion />}
      {view === '2' && <ContentInputsTab />}
      {view === '3' && <ContentInputsScroll />}
    </div>
  )
}

export default ContainerForm
