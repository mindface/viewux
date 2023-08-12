import { useState } from 'react'
import { Container, Tab } from 'semantic-ui-react'
import { MakeFileProvider } from '../context/makeFiles'
import MakerExternal from '../components/MakerExternal'
import MakerFlowImage from '../components/MakerFlowImage'
import MakerSolidTorus from '../components/MakerSolidTorus'

function MakeFlowImage() {
  const [activve, activeSet] = useState(0)

  const panes = [
    { key: 1, menuItem: '画像作成' },
    { key: 2, menuItem: '画像調整' },
    { key: 3, menuItem: '画像加工' },
  ]

  return (
    <Container className="make-flow-image">
      <MakeFileProvider>
        <Tab
          panes={panes}
          renderActiveOnly={false}
          onTabChange={(e, data) => {
            activeSet(data.activeIndex as number)
          }}
        />
        {/* レンダリングされてからfabricが使われるので変化させる */}
        <div className={activve === 0 ? 'tab-content view' : 'tab-content'}>
          <MakerFlowImage />
        </div>
        <div className={activve === 1 ? 'tab-content view' : 'tab-content'}>
          <MakerSolidTorus />
        </div>
        <div className={activve === 2 ? 'tab-content view' : 'tab-content'}>
          <MakerExternal />
        </div>
      </MakeFileProvider>
    </Container>
  )
}

export default MakeFlowImage
