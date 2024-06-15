import React, { PropsWithChildren } from 'react'
import Link, { LinkProps } from 'next/link'

interface Props extends LinkProps {
    active: boolean
}

const NavLink = ({ active = false, children, ...props }: PropsWithChildren<Props>) => (
    
    <Link
        {...props}
        className={` p-2 {active ? ' ' : '' }`}>
        {children}
    </Link>
)

export default NavLink
