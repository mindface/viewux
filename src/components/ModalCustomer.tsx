import { useState, useCallback, useMemo } from 'react'
import { Button, Card, Modal } from 'semantic-ui-react'
import { CustomerData, MethodList, PlanedList } from "../context/customerData";
import { FetchAPIs } from "../lib/fetch";

const fetchAPIs = new FetchAPIs()

const items = [
  {
    header: 'Project Report - April',
    description:
      'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    meta: 'ROI: 30%',
  },
  {
    header: 'Project Report - May',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination.',
    meta: 'ROI: 34%',
  },
  {
    header: 'Project Report - June',
    description:
      'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
    meta: 'ROI: 27%',
  },
  {
    header: 'Project Report - June',
    description:
      'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
    meta: 'ROI: 27%',
  },
  {
    header: 'Project Report - June',
    description:
      'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
    meta: 'ROI: 27%',
  },
]


type Props = {
  customer: CustomerData
}

function ModalCustomer(props: Props) {
  const { customer } = props
  const [open, setOpen] = useState(false)
  const [methods, setMethods] = useState<MethodList>([])
  const [plans, setPlans] = useState<PlanedList>([])

  useMemo( async () => {
    if(customer.id) {
      try {
        const resList = await fetchAPIs.getMethods(customer.keyId) as MethodList
        const list = resList.filter((item) => item.category === customer.category)
        setMethods(list)
      } catch (error) {
        console.error(`fetchAPIs.getMethods(customer.keyId) でのエラー`)
        console.error(error)
      }
    }
  },[customer.id])

  useMemo( async () => {
    if(customer.id) {
      try {
        const resList = await fetchAPIs.getPlanHistory(customer.keyId) as PlanedList
        const list = resList.filter((item) => item.category === customer.category)
        setPlans(list)
      } catch (error) {
        console.error(`fetchAPIs.getPlanHistory(customer.keyId) でのエラー`)
        console.error(error)
      }
    }
  },[customer.id])
  


  return (
    <div className="modal-customer modal-h-limit">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={<Button>関連データを見る</Button>}
      >
        <Modal.Header>Profile Picture</Modal.Header>
        <Modal.Content image>
            <div className="flex">
              <div className="half p-1 h-half overflow-ysc">
                <ul className="list">同じプランで異なる結果結果
                  <li className="item">手段 | リソース | (参加)10人 | 計画利用数</li>
                </ul>
              </div>
              <div className="half p-1 h-half overflow-ysc">
                <div className="p-1">
                  {/* <Card.Group items={items} /> */}
                </div>
              </div>
              <div className="half p-1 h-half overflow-ysc">
                <div className="p-1">
                  {methods.map((method,k) => <div key={`method${k}`}>{method.title}</div>)}
                </div>
              </div>
              <div className="half p-1 h-half overflow-ysc">
                <div className="p-1">
                  {plans.map((plan,k) => <div key={`plan${k}`}>
                    <div className="title">{plan.title}</div>
                    <ul className="list">
                      {(plan.detailList ?? []).map((item,_k) => <li key={`plan detailList${_k}`} className="item">{item.id}{item.title}</li>)}
                    </ul>
                  </div>)}
                </div>
              </div>
            </div>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)} primary>
            閉じる
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default ModalCustomer
