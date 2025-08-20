import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'wc-carousel': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        images?: Array<string | { src: string; alt?: string }>;
        autoplay?: boolean;
        interval?: number;
        showArrows?: boolean;
        showDots?: boolean;
      };
      'wc-articles': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        articles?: Array<{ title: string; summary?: string; image?: string; url?: string }>;
      };
    }
  }
}
