import React, { type ReactNode, type AnchorHTMLAttributes } from "react";

import Link from "next/link";

type Props = {
  children: ReactNode,
  href: string,
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const NavLink: React.FC<Props> = ({ children, href, ...props }) => (
  <Link
    href={href}
    {...props}
    className={`rounded-md px-4 py-2.5 text-center duration-150 ${props?.className || ""
      }`}
  >
    {children}
  </Link>
);

export default NavLink;
