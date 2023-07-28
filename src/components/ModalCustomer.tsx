import { useState, useMemo } from 'react'
import {
  Header,
  Button,
  List,
  Card,
  Modal,
  Icon,
} from 'semantic-ui-react'
import {
  CustomerData,
  MethodList,
  PlanedList,
  PlanInfoList,
} from '../context/customerData'
import { FetchAPIs } from '../lib/fetch'

const fetchAPIs = new FetchAPIs()

const items = [
  {
    header: '参加パートナー01',
    description: (
      <p>
        <Icon link name="hand point right outline" /> エンジニア バックエンド
      </p>
    ),
    meta: 'ROI: 28%',
    key: 1,
  },
  {
    header: '参加パートナー02',
    description: (
      <p>
        <Icon link name="hand point right outline" />
        エンジニア フロントエンド
      </p>
    ),
    meta: 'ROI: 22%',
    key: 2,
  },
  {
    header: '参加パートナー03',
    description: (
      <p>
        <Icon link name="hand point right outline" />
        デザイナ (UXUI含む)
      </p>
    ),
    meta: 'ROI: 14%',
    key: 3,
  },
  {
    header: '参加パートナー04',
    description: (
      <p>
        <Icon link name="hand point right outline" />
        PM補佐
      </p>
    ),
    meta: 'ROI: 10%',
    key: 4,
  },
  {
    header: '参加パートナー05',
    description: (
      <p>
        <Icon link name="hand point right outline" />
        デザイナ ビジュアル
      </p>
    ),
    meta: 'ROI: 16%',
    key: 5,
  },
  {
    header: '自身',
    description: (
      <p>
        <Icon link name="hand point right outline" />
        PM
      </p>
    ),
    meta: 'ROI: 10%',
    key: 6,
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
  const [planInfoList, setPlanInfoList] = useState<PlanInfoList>([])

  useMemo(async () => {
    if (customer.id) {
      try {
        const resList = (await fetchAPIs.getPlanInfo(
          'PlanInfoList',
        )) as PlanInfoList
        setPlanInfoList(resList)
      } catch (error) {
        console.error(`fetchAPIs.getPlanInfo(similarId) でのエラー`)
        console.error(error)
      }
    }
  }, [customer.id])

  useMemo(async () => {
    if (customer.id) {
      try {
        const resList = (await fetchAPIs.getMethods(
          customer.keyId,
        )) as MethodList
        const list = resList.filter(
          (item) => item.category === customer.category,
        )
        setMethods(list)
      } catch (error) {
        console.error(`fetchAPIs.getMethods(customer.keyId) でのエラー`)
        console.error(error)
      }
    }
  }, [customer.id])

  useMemo(async () => {
    if (customer.id) {
      try {
        const resList = (await fetchAPIs.getPlanHistory(
          customer.keyId,
        )) as PlanedList
        const list = resList.filter((item) => item.keyId === customer.keyId)
        setPlans(list)
      } catch (error) {
        console.error(`fetchAPIs.getPlanHistory(customer.keyId) でのエラー`)
        console.error(error)
      }
    }
  }, [customer.id])

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
              <Header as="h5">同じプランで異なる結果結果のケース</Header>
              <List>
                {planInfoList.map((planInfo, k) => (
                  <List.Item className="item" key={`planInfo${k}`}>
                    <List.Header>{planInfo.title}</List.Header>
                    <List.Description>
                      <span className="p-1 block-ib">
                        | {planInfo.resource} | (参加){planInfo.joinNumber}人 |{' '}
                        {planInfo.usedPlanNumber}回
                      </span>
                    </List.Description>
                  </List.Item>
                ))}
              </List>
            </div>
            <div className="half p-1 h-half overflow-ysc">
              <div className="p-1">
                <Card.Group items={items} />
              </div>
            </div>
            <div className="half p-1 h-half overflow-ysc">
              <div className="p-1">
                <Card.Group>
                  {methods.map((method, k) => (
                    <Card className="p-1" key={`method${k}`}>
                      <Card.Content>
                        <Card.Header as="h5">{method.title}</Card.Header>
                        <Card.Description>
                          {method.category} | {method.create_at}
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  ))}
                </Card.Group>
              </div>
            </div>
            <div className="half p-1 h-half overflow-ysc">
              <div className="p-1">
                <List divided relaxed>
                  {plans.map((plan, k) => (
                    <List.Item
                      className="position-shaft hover-view"
                      key={`plan${k}`}
                    >
                      <Header as="h5">{plan.title}</Header>
                      <List.Description>
                        {plan.keyId} | {plan.title}
                      </List.Description>
                      <div className="view position-item-bl">
                        <div>
                          <Header as="h5">
                            プランの構造
                            {plan.detailList.length === 0 && (
                              <>は存在しません</>
                            )}
                          </Header>
                          <ul className="list">
                            {plan.detailList.map((item, _k) => (
                              <li key={`plan detailList${_k}`} className="item">
                                {plan.id} | {item.title}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </List.Item>
                  ))}
                </List>
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
