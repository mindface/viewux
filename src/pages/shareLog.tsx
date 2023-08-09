import { InferGetStaticPropsType } from 'next'
import { Container } from 'semantic-ui-react'
import ContentShareLog from '../components/ContentShareLog'

type Props = {
  msg: string
}

export default function ShareLog({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { msg } = data
  return (
    <Container>
      {msg}
      <ContentShareLog />
    </Container>
  )
}

export const getStaticProps = async () => {
  const data = {
    msg: 'ユーザー情報に対してオペレーションの構造への変化に対する因子を厳密に確認',
  } // fetch data from an API
  return {
    props: {
      data,
    },
  }
}
