import ContainerCustomerView from '../components/ContainerCustomerView'
import { CustomerDataProvider } from '../context/customerData'
import { Container } from 'semantic-ui-react'
function CustomerDataView() {
  return (
    <Container>
      <CustomerDataProvider>
        <ContainerCustomerView />
      </CustomerDataProvider>
    </Container>
  )
}

export default CustomerDataView
