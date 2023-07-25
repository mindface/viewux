import { Dispatch, createContext, useReducer, ReactNode } from 'react'

export interface Planed {
  id: number;
  keyId: string;
  title: string;
  detailList: {id:string,title:string}[];
  value: number;
  category: string;
  day: string;
  create_at: string;
}

export type PlanedList = Planed[]

export interface Method {
  id: string;
  title: string;
  detail: string;
  relationRunType: string;
  category: string;
  create_at: string;
}

export type MethodList = Method[]

export interface CustomerData {
  id: number
  keyId: string
  title: string
  detail: string
  value: number
  category: string
  day: string
  create_at: string
}

export type CustomerDataList = CustomerData[]

interface State {
  customerDataList: CustomerDataList;
  customerData: CustomerData
}

interface Action {
  type: string
  customerDataList: CustomerDataList;
  customerData: CustomerData
}

interface Props {
  children: ReactNode
}

export const customerDataContext = createContext(
  {} as {
    state: State
    dispach: Dispatch<Action>
  },
)

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'user/get':
      return state
    case 'user/add':
      return { ...state, user: action.customerData }
    default:
      return state
  }
}

const intalState: State = {
  customerDataList: [],
  customerData: {
    "id": 12000,
    "keyId": "none",
    "title":"none",
    "detail":"none",
    "value": 346,
    "category":"TOM",
    "day": "200000",
    "create_at": "200000"
  }
}

export const CustomerDataProvider = (props: Props) => {
  const [state, dispach] = useReducer(reducer, intalState)
  return (
    <customerDataContext.Provider value={{ state, dispach }}>
      {props.children}
    </customerDataContext.Provider>
  )
}
