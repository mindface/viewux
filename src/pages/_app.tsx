import '../app/globals.css'
import '../styles/app.css'
import type { AppProps } from 'next/app'
import Layout from '../layout'
import 'semantic-ui-css/semantic.min.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
