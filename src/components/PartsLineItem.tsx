import { type } from 'os'
import { Planed } from '../context/customerData'

type Props = {
  plan: Planed
}
function PartsLineItem(props: Props) {
  const { title } = props.plan
  return (
    <div className="parts-line-item">
      <div className="l">title</div>
    </div>
  )
}

export default PartsLineItem
