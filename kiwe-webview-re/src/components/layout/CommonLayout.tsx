import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function CommonLayout({ children }: Props) {
  return (
    <>
      <div className="layout"> {children} </div>

      <style jsx>{``}</style>
    </>
  )
}
