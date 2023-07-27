// import ContentInputs from '../components/ContentInputsTab'
import { Container } from 'semantic-ui-react'
import { MakeFileProvider } from '../context/makeFiles'
import MakerFlowImage from '../components/MakerFlowImage'

function MakeFlowImage() {
  return (
    <Container>
      <MakeFileProvider>
        <MakerFlowImage />
      </MakeFileProvider>
    </Container>
  )
}

export default MakeFlowImage
