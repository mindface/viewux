import ContainerForm from '../components/ContainerForm'
import { UserProvider } from '../context/user'

function Index() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UserProvider>
        <ContainerForm />
      </UserProvider>
    </main>
  )
}

export default Index
