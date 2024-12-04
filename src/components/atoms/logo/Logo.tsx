import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({ width = 40, height = 40, className = '' }: LogoProps) {
  return (
    <Image
      src="/hardy-admin-logo.svg"
      alt="Hardy Admin Logo"
      width={width}
      height={height}
      priority
      className={className}
    />
  );
}
