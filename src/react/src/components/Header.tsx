import { ReactNode } from "react"
import { Navbar } from "react-bootstrap"

export interface IHeaderProps {
  title: string
  children?: ReactNode
}

function Header({ title, children }: IHeaderProps) {
  return (
    <Navbar className="p-3 bg-white justify-content-between">
      <h3 className="m-0">{title}</h3>
      {children}
    </Navbar>
  )
}

export default Header
