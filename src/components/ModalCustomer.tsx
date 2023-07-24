import { useState } from 'react'
import { Button, Icon, Image, Modal } from 'semantic-ui-react'
import { CustomerData } from "../context/customerData";


type Props = {
  customer: CustomerData
}

function ModalCustomer(props: Props) {
  const { customer } = props
  const [open, setOpen] = useState(false)

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button>関連データを見る</Button>}
    >
      <Modal.Header>Profile Picture</Modal.Header>
      <Modal.Content image scrolling>
        <Image size='medium' src='https://react.semantic-ui.com/images/wireframe/image.png' wrapped />
        <Modal.Description>
          <p>{customer.title}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} primary>
          Proceed <Icon name='chevron right' />
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalCustomer
