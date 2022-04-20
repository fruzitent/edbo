import NextLink from 'next/link'

import type { LinkProps as _LinkProps } from 'next/link'

export interface LinkProps extends _LinkProps {
  className?: string
  children: React.ReactNode
}

export const Link = (props: LinkProps): React.ReactElement => {
  const { className, href, children, ...args } = props
  return (
    <NextLink href={href}>
      <a className={className} {...args}>
        {children}
      </a>
    </NextLink>
  )
}
