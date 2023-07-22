import { Dispatch, createContext, useReducer, ReactNode } from 'react'

export interface User {
  id: number
  name: string
  detail: string
  inputNumver: number
  loginNumber: number
  targetRunNumber: number
  totalRunNumber: number
  achievement: number
}

interface State {
  user: User
}

interface Action {
  type: string
  user: User
}

interface Props {
  children: ReactNode
}

export const userContext = createContext(
  {} as {
    state: State
    dispach: Dispatch<Action>
  },
)

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'user/get':
      return state
    case 'user/get':
      return { ...state, user: action.user }
    default:
      return state
  }
}

const intalState: State = {
  user: {
    id: 12,
    name: 'test info',
    detail: '詳細',
    inputNumver: 2,
    loginNumber: 0,
    targetRunNumber: 0,
    totalRunNumber: 0,
    achievement: 0,
  },
}

export const UserProvider = (props: Props) => {
  const [state, dispach] = useReducer(reducer, intalState)
  return (
    <userContext.Provider value={{ state, dispach }}>
      {props.children}
    </userContext.Provider>
  )
}
