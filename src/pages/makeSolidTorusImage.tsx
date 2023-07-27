import { Container } from 'semantic-ui-react'
import { MakeFileProvider } from '../context/makeFiles'
import MakerSolidTorus from '../components/MakerSolidTorus'

function makeSolidTorusImage() {
  return (
    <Container>
      <MakeFileProvider>
        <MakerSolidTorus />
      </MakeFileProvider>
    </Container>
  )
}

export default makeSolidTorusImage
