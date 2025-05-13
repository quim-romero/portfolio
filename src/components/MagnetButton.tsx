import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { useMagnet } from '../hooks/useMagnet';

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  as?: 'a';
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  as: 'button';
};

type MagnetButtonProps = (AnchorProps | ButtonProps) & {
  className?: string;
  children: ReactNode;
};

export default function MagnetButton(props: MagnetButtonProps) {
  const { className, children, as = 'a', ...rest } = props;

  if (as === 'button') {
    const magnet = useMagnet<HTMLButtonElement>(0.2);

    return (
      <button
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
        ref={magnet.ref}
        onMouseMove={magnet.onMouseMove}
        onMouseLeave={magnet.onMouseLeave}
        className={clsx('inline-flex items-center transition-transform duration-200', className)}
      >
        {children}
      </button>
    );
  }

  const magnet = useMagnet<HTMLAnchorElement>(0.3);

  return (
    <a
      {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      ref={magnet.ref}
      onMouseMove={magnet.onMouseMove}
      onMouseLeave={magnet.onMouseLeave}
      className={clsx('inline-flex items-center transition-transform duration-200', className)}
    >
      {children}
    </a>
  );
}
