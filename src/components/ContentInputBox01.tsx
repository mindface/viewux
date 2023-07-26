import { FormEvent, useState } from 'react'
import { Form } from 'semantic-ui-react'
import type { CheckboxProps } from 'semantic-ui-react'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

type Props = {
  type?: string
  statTabAction?: (id: number) => void
  className?: string
}

function ContentInputBox01(props: Props) {
  const { type, statTabAction, className } = props
  const [value, valueSet] = useState('')
  const _statTabAction = statTabAction ?? (() => {})

  // const handleChange = (e: Event, value: any) => {
  //   console.log(e)
  //   console.log(value)
  // }

  return (
    <div className={`content-input-box ${className}`}>
      <div className="field-box">
        <Form>
          <Form.Group widths="equal">
            <Form.Input label="姓" placeholder="First name" />
            <Form.Input label="名" placeholder="Last name" />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input label="職種" placeholder="F" />
            <Form.Input label="学習単位" placeholder="Last name" />
            <Form.Select
              label="Gender"
              options={options}
              placeholder="Gender"
            />
          </Form.Group>
          <Form.Group inline>
            <label>最終学歴</label>
            <Form.Radio
              label="高卒"
              value="sm"
              checked={value === 'sm'}
              onChange={(
                event: FormEvent<HTMLInputElement>,
                data: CheckboxProps,
              ) => {
                valueSet((data?.value as string) ?? '')
              }}
            />
            <Form.Radio
              label="短大"
              value="md"
              checked={value === 'md'}
              onChange={(
                event: FormEvent<HTMLInputElement>,
                data: CheckboxProps,
              ) => {
                valueSet((data?.value as string) ?? '')
              }}
            />
            <Form.Radio
              label="大卒"
              value="lg"
              checked={value === 'lg'}
              onChange={(
                event: FormEvent<HTMLInputElement>,
                data: CheckboxProps,
              ) => {
                valueSet((data?.value as string) ?? '')
              }}
            />
          </Form.Group>
          <Form.TextArea label="備考" placeholder="学習専攻は〇〇で...." />
          {type === 'tab' && (
            <Form.Button onClick={() => _statTabAction(1)}>next2</Form.Button>
          )}
        </Form>
      </div>
    </div>
  )
}

export default ContentInputBox01
