import { Card } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'

function ContainerInfoThis() {
  return (
    <div className="container-form">
      <Header
        as="h3"
        content="コンポーネントパタン"
        subheader="ユーザーの操作上で少なくなるコンポーネントパタンの情報"
      />
      <Card.Group>
        <Card
          image="/images/formView.png"
          header="入力フォームのパタン"
          meta="form"
          description="現状は3つ(20230722)"
        />
        <Card
          image="/images/formView.png"
          header="入力フォームのパタン"
          meta="form"
          description="現状は3つ(20230722)"
        />
      </Card.Group>
    </div>
  )
}

export default ContainerInfoThis
