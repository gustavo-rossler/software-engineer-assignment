import { ReactNode } from "react"

export interface IBodyProps {
  children?: ReactNode
}

function Body({ children }: IBodyProps) {
  return (
    <div className="p-3 m-3 bg-white">
      {children}
    </div>
  )
}

export default Body
