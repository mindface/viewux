import { useEffect, useRef, useState } from 'react'
import { FetchAPIs } from '../lib/fetch'
import { HelperColor } from '../lib/helper-color'
import { CustomerDataList } from '../context/customerData'
import ModalCustomer from './ModalCustomer'

const fetchAPIs = new FetchAPIs()
const helperColor = new HelperColor()

function ContainerCustomerView() {
  const [customerList, setCustomerList] = useState<CustomerDataList>([])
  const listElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ;(async () => {
      const res = await fetchAPIs.getCustomerData()
      setCustomerList(res)
    })()
  }, [])

  const setWidthWindow = () => {
    const elementWidth = listElement.current?.clientWidth
    if (elementWidth && customerList.length) {
      const itemNumber = elementWidth / customerList.length
      return `${itemNumber}px`
    }
    return '30px'
  }

  return (
    <div className="container-customer-view overflow-xsc pb-4">
      <div ref={listElement} className="customer-box flex flex-aie text-c">
        {customerList.map((customer, k) => (
          <div
            className="hover-view position-shaft"
            style={{
              width: setWidthWindow(),
              height: `${customer.value}px`,
              backgroundColor: helperColor.getRGB(),
            }}
            key={`customer${k}`}
          >
            {customer.value}
            <div
              className="view position-item-c max-h80"
              style={{ width: '180px' }}
            >
              <div>{customer.title}</div>
              <div>{customer.day}</div>
              <ModalCustomer customer={customer} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContainerCustomerView
