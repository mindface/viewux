import { Dispatch, createContext, useReducer, ReactNode, ReactDOM } from 'react'

export interface makeFile {
  id: number
  name: string
  imgSrc: string
  title: string
  detail: string
}

export type makeFileList = makeFile[]

interface State {
  makeFileList: makeFileList
  selectFile: makeFile
}

interface Action {
  type: string
  makeFileList: makeFileList
  selectFile: makeFile
}

interface Props {
  children: ReactNode
}

export const makeFileContext = createContext(
  {} as {
    state: State
    dispach: Dispatch<Action>
  },
)

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'makeFile/get':
      return state
    case 'makeFile/add':
      return { ...state, user: action.selectFile }
    default:
      return state
  }
}

const intalState: State = {
  makeFileList: [],
  selectFile: {
    id: 0,
    name: 'none',
    imgSrc: 'no image',
    title: '',
    detail: '',
  },
}

export const MakeFileProvider = (props: Props) => {
  const [state, dispach] = useReducer(reducer, intalState)
  return (
    <makeFileContext.Provider value={{ state, dispach }}>
      {props.children}
    </makeFileContext.Provider>
  )
}
