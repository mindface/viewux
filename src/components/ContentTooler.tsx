import { useState } from 'react'
import { Checkbox, Input, Form, Header, Modal, Button } from 'semantic-ui-react'

function ContentTooler() {
  const [userRunNumber, userRunNumberSet] = useState('0')
  const [experience, experienceSet] = useState('0')
  const [infoVolume, infoVolumeSet] = useState('none')
  const [achievement, achievementSet] = useState('0')
  const [open, setOpen] = useState(false)

  return (
    <div className="content-tooler p-1">
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>経験の調整</Button>}
      >
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <Form>
              <Form.Field>
                <div className="tooler-field p-1">
                  <Input
                    label={`自己評価`}
                    min={0}
                    max={2000}
                    name="self skill"
                    step={100}
                    type="range"
                    value={userRunNumber}
                    onChange={(e, data) => {
                      userRunNumberSet(data.value)
                    }}
                  />
                  {userRunNumber}
                </div>
              </Form.Field>
              <Form.Field>
                <div className="tooler-field p-1">
                  <Checkbox
                    radio
                    label="高校までの知識量"
                    name="checkboxRadioGroup"
                    value="highSchoolGraduate"
                    checked={infoVolume === 'highSchoolGraduate'}
                    onChange={(e, data) => infoVolumeSet(data.value as string)}
                  />
                  <Checkbox
                    radio
                    label="高校卒までの知識量"
                    name="checkboxRadioGroup"
                    value="universityGraduate"
                    checked={infoVolume === 'universityGraduate'}
                    onChange={(e, data) => infoVolumeSet(data.value as string)}
                  />
                  <Checkbox
                    radio
                    label="大学院までの知識量"
                    name="checkboxRadioGroup"
                    value="graduate"
                    checked={infoVolume === 'graduate'}
                    onChange={(e, data) => infoVolumeSet(data.value as string)}
                  />
                </div>
              </Form.Field>
              <Form.Field>
                <div className="tooler-field p-1">
                  <Checkbox
                    radio
                    label="研究者までの知識量"
                    name="checkboxRadioGroup"
                    value="researcher"
                    checked={infoVolume === 'researcher'}
                    onChange={(e, data) => infoVolumeSet(data.value as string)}
                  />
                  <Checkbox
                    radio
                    label="企業開発者までの知識量"
                    name="checkboxRadioGroup"
                    value="corporateDeveloper"
                    checked={infoVolume === 'corporateDeveloper'}
                    onChange={(e, data) => infoVolumeSet(data.value as string)}
                  />
                </div>
              </Form.Field>
              <Form.Field>
                <div className="tooler-field flex p-1">
                  <div className="d-inline-b flex">
                    <Input
                      label={{ basic: true, content: '経験の期間' }}
                      min={0}
                      max={10000}
                      step={1}
                      type="number"
                      value={experience}
                      onChange={(e, data) => {
                        experienceSet(data.value)
                      }}
                    />
                    時間
                  </div>
                  <div className="d-inline-b flex">
                    <Input
                      label={`達成の精度`}
                      min={0}
                      max={100}
                      step={1}
                      type="number"
                      value={achievement}
                      onChange={(e, data) => {
                        achievementSet(data.value)
                      }}
                    />
                  </div>
                </div>
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            close
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default ContentTooler
