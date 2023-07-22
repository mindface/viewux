import Link from 'next/link'
import { Header as BaseHeader, List } from 'semantic-ui-react'

const pagelist = [
  {
    id: 1,
    name: 'home',
    path: '/',
  },
  {
    id: 2,
    name: 'about',
    path: '/about',
  },
  {
    id: 3,
    name: 'formView',
    path: '/formView',
  },
]

function Header() {
  return (
    <BaseHeader>
      <div className="p-1">
        <List horizontal>
          <List.Item icon='ordered list' />
          {pagelist.map((item, k) => (
            <List.Item
              key={`List.Item${k}`}
              content={<Link href={item.path}>{item.name}</Link>}
            />
          ))}
        </List>
      </div>
    </BaseHeader>
  )
}

export default Header
