import { InferGetStaticPropsType } from 'next'
import { Container } from 'semantic-ui-react'

type Props = {
  msg: string
}

export default function Index({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { msg } = data
  return (
    <Container>
      index
      {msg}
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
