import Image from "next/image";

export function LogoMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <Image
      src="/growth_logo.png"
      alt="GrowthPilot Agency"
      width={32}
      height={32}
      sizes="32px"
      className={className}
      priority
    />
  );
}

export function LogoHorizontal({ className }: { className?: string }) {
  return (
    <Image
      src="/growth_logo.png"
      alt="GrowthPilot Agency"
      width={180}
      height={32}
      sizes="180px"
      className={className}
      priority
    />
  );
}

export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <Image
      src="/growth_logo.png"
      alt="GrowthPilot Agency"
      width={32}
      height={32}
      sizes="32px"
      className={className}
      priority
    />
  );
}

export function LogoFull({ className }: { className?: string }) {
  return (
    <Image
      src="/growth_logo.png"
      alt="GrowthPilot Agency"
      width={140}
      height={40}
      sizes="140px"
      className={`h-10 w-auto ${className || ""}`}
      priority
    />
  );
}
