import Link from 'next/link'
import { Input, Menu } from 'semantic-ui-react'

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
    <header className="header">
      <div className="logo">logo</div>
      <Menu secondary>
        {pagelist.map((item, k) => (
          <Menu.Item key={`pagelist${k}`}>
            <Link href={item.path}>{item.name}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </header>
  )
}

export default Header
