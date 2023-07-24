import ContainerForm from '../components/ContainerForm'
import { UserProvider } from '../context/user'
import { Container } from 'semantic-ui-react'
function FormView() {
  return (
    <Container>
      <UserProvider>
        <ContainerForm />
      </UserProvider>
    </Container>
  )
}

export default FormView
