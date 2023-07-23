import { Accordion } from 'semantic-ui-react'
import UserInfoBox from './ElementUserInfoBox'
import ContentInputBox01 from './ContentInputBox01'
import ContentInputBox02 from './ContentInputBox02'
import ContentInputBox03 from './ContentInputBox03'

const rootPanels = [
  {
    key: 'panel-1',
    title: 'Level 1',
    content: { content: <ContentInputBox01 /> },
  },
  {
    key: 'panel-2',
    title: 'Level 2',
    content: { content: <ContentInputBox02 /> },
  },
  {
    key: 'panel-3',
    title: 'Level 3',
    content: { content: <ContentInputBox03 /> },
  },
]

function ContentInputsAccordion() {
  // const handleChange = (e: Event, value: any) => {
  //   console.log(value)
  // }

  return (
    <div className="content-inputs">
      <UserInfoBox />
      <Accordion defaultActiveIndex={0} panels={rootPanels} styled />
    </div>
  )
}

export default ContentInputsAccordion
