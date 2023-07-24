import React, { useState } from 'react'
import { Input, Confirm, Form } from 'semantic-ui-react'

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

function ContentInputBox(props: Props) {
  const { className } = props
  const [submitConfirm, submitConfirmSet] = useState(false)

  // const handleChange = (e: Event, value: string) => {
  //   console.log(value)
  // }

  const handleConfirm = () => {
    submitConfirmSet(false)
    return { result: 'confirmed', open: false }
  }
  const handleCancel = () => {
    submitConfirmSet(false)
    return { result: 'cancelled', open: false }
  }

  return (
    <div className={`content-input-box ${className}`}>
      <div className="field-box">
        <Form>
          <Form.Group>
            <Form.Field>
              <Input label="参考サイト | https://" placeholder="mysite.com" />
            </Form.Field>
            <Form.Field>
              <label>参考ポイント</label>
              <input placeholder="ユーザーの導線部分" />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Input
              label={{ basic: true, content: 'kg' }}
              labelPosition="right"
              placeholder="Enter weight..."
            />
          </Form.Group>
          <Form.Input label="選ぶ理由の共通点" placeholder="First name" />
          <Form.TextArea
            label="結果からどうフィードバックするか"
            placeholder=""
          />
          <Form.Select
            label="状況から選ばなればならない優先順"
            options={options}
            placeholder="Gender"
          />
          <Form.Group>
            <Form.Checkbox label="I agree to the Terms and Conditions" />
          </Form.Group>
          <Form.Group>
            <Form.Button onClick={() => submitConfirmSet(true)}>
              Submit
            </Form.Button>
            <Confirm
              open={submitConfirm}
              content={<>このメッセージを送信しますか</>}
              onCancel={handleCancel}
              onConfirm={handleConfirm}
            />
          </Form.Group>
        </Form>
      </div>
    </div>
  )
}

export default ContentInputBox
