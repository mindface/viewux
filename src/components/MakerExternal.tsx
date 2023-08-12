import { useState, useRef, ChangeEvent, useContext } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import { HelperFile } from '../lib/helper-file'
import MakerExternalImage from "./MakerExternalImage";
import MakerExternalVideo from "./MakerExternalVideo";

const helperFile = new HelperFile()
const videoWidth = 560
function MakerExternal() {
  const [activeItem, activeItemSet] = useState('image')

  return (
    <div className="maker-flow-image pt-2">
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name='image'
              active={activeItem === 'image'}
              onClick={(e,data) => activeItemSet(data.name ?? "")}
            />
            <Menu.Item
              name='video'
              active={activeItem === 'video'}
              onClick={(e,data) => activeItemSet(data.name ?? "")}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            { activeItem === 'image' && <MakerExternalImage /> }
            { activeItem === 'video' && <MakerExternalVideo /> }
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default MakerExternal
