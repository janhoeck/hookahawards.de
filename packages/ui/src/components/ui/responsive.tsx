import { PropsWithChildren } from 'react'

export const DesktopOnly = (props: PropsWithChildren) => {
  return <div className='hidden lg:contents'>{props.children}</div>
}

export const MobileOnly = (props: PropsWithChildren) => {
  return <div className='contents lg:hidden'>{props.children}</div>
}
