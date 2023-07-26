import ContainerBackendCalc from '../components/ContainerBackendCalc'
import { BackendDataProvider } from '../context/backendData'
import { Container } from 'semantic-ui-react'
function Backend() {
  return (
    <Container>
      <BackendDataProvider>
        <ContainerBackendCalc />
      </BackendDataProvider>
    </Container>
  )
}

export default Backend
