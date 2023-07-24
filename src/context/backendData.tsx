import { Dispatch, createContext, useReducer, ReactNode } from 'react'

export interface backendData {
  id: number
  name: string
  detail: string
  inputNumver: number
  loginNumber: number
  targetRunNumber: number
  totalRunNumber: number
  achievement: number
}

type BackendDataList = backendData[]

interface State {
  backendDataList: BackendDataList;
  backendData: backendData
}

interface Action {
  type: string
  backendDataList: BackendDataList;
  backendData: backendData
}

interface Props {
  children: ReactNode
}

export const backendDataContext = createContext(
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
      return { ...state, user: action.backendData }
    default:
      return state
  }
}

const intalState: State = {
  backendDataList: [],
  backendData: {
    id: 12000,
    name: "",
    detail:  "",
    inputNumver: 0,
    loginNumber: 0,
    targetRunNumber: 0,
    totalRunNumber: 0,
    achievement: 0
  }
}

export const BackendDataProvider = (props: Props) => {
  const [state, dispach] = useReducer(reducer, intalState)
  return (
    <backendDataContext.Provider value={{ state, dispach }}>
      {props.children}
    </backendDataContext.Provider>
  )
}
