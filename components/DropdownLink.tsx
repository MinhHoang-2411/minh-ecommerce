import Link from "next/link";
import {ReactNode} from "react";

interface IDropdownLinkProps {
  href: string;
  children: ReactNode;
  className: string;
}

export default function DropdownLink(props: IDropdownLinkProps) {
  let {href, children, ...rest} = props;
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
