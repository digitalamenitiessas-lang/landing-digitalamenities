"use client";

import type { ReactNode } from "react";

type Variant = "amenity" | "charla";

type ContactTriggerProps = {
  className?: string;
  variant?: Variant;
  children: ReactNode;
};

export function ContactTrigger({
  className,
  variant = "amenity",
  children,
}: ContactTriggerProps) {
  function open() {
    window.dispatchEvent(
      new CustomEvent("open-contact-modal", { detail: { variant } })
    );
  }

  return (
    <button type="button" className={className} onClick={open}>
      {children}
    </button>
  );
}
