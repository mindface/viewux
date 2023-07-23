import { useState } from 'react'
import { Tab } from 'semantic-ui-react'
import ElementUserInfoBox from './ElementUserInfoBox'
import ContentInputBox01 from './ContentInputBox01'
import ContentInputBox02 from './ContentInputBox02'
import ContentInputBox03 from './ContentInputBox03'

function ContentInputsTab() {
  const [activeTab, activeTabSet] = useState(0)

  const panes = [
    {
      menuItem: 'Tab 1',
      render: () => (
        <Tab.Pane>
          <ContentInputBox01 statTabAction={(id) => activeTabSet(id)} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Tab 2',
      render: () => (
        <Tab.Pane>
          <ContentInputBox02 statTabAction={(id) => activeTabSet(id)} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Tab 3',
      render: () => (
        <Tab.Pane>
          <ContentInputBox03 />
        </Tab.Pane>
      ),
    },
  ]

  return (
    <div className="content-inputs">
      <ElementUserInfoBox />
      <Tab
        activeIndex={activeTab}
        panes={panes}
        onTabChange={(e, { activeIndex }) => {
          activeTabSet(activeIndex as number)
          console.log(activeIndex)
        }}
      />
    </div>
  )
}

export default ContentInputsTab
