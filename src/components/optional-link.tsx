import Link from "next/link";
import type { ReactNode } from "react";

type OptionalLinkProps = {
  href?: string;
  className?: string;
  children: ReactNode;
};

export function OptionalLink({ href, className, children }: OptionalLinkProps) {
  if (!href) {
    return (
      <span
        className={className}
        aria-disabled="true"
        data-placeholder="true"
        title="Disponible proximamente"
      >
        {children}
      </span>
    );
  }

  const isAnchor = href.startsWith("#");
  const isExternal = /^https?:\/\//.test(href);

  if (isAnchor) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  if (isExternal) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}
