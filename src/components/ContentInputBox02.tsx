import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'

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

function ContentInputBox02(props: Props) {
  const { type, statTabAction, className } = props
  const _statTabAction = statTabAction ?? (() => {})

  const handleChange = (e: Event, value: any) => {
    console.log(e)
    console.log(value)
  }

  return (
    <div className={`content-input-box ${className}`}>
      <div className="field-box">
        <Form>
          <Form.Group>
            <Form.Field>
              <Form.Input fluid={true} label="" placeholder="First name" />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid={true}
              label="専攻での得意科目"
              placeholder="First name"
            />
            <Form.Input
              fluid={true}
              label="科目で扱う情報の最小単位"
              placeholder="情報工学(プログラム言語R,go)"
            />
          </Form.Group>
          <Form.Group inline>
            <Form.Select
              label="基準値"
              options={options}
              placeholder="Gender"
            />
          </Form.Group>
          <Form.TextArea
            label="学習の工夫について"
            placeholder="学習した数値化する情報量を比較して、参考情報を探しました"
          />
          {type === 'tab' && (
            <Form.Button onClick={() => _statTabAction(2)}>next3</Form.Button>
          )}
        </Form>
      </div>
    </div>
  )
}

export default ContentInputBox02
