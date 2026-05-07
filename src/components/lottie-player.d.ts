import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "lottie-player": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        autoplay?: boolean;
        loop?: boolean;
        mode?: string;
        src?: string;
      };
    }
  }
}

export {};
