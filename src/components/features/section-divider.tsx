export function SectionDivider({ className }: { className?: string }) {
  return (
    <div className={`relative h-24 overflow-hidden -mt-12 -mb-12 pointer-events-none ${className || ""}`} aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
    </div>
  );
}

export function SectionWave({ flip }: { flip?: boolean }) {
  return (
    <div className="relative h-16 overflow-hidden -mt-8 -mb-8 pointer-events-none" aria-hidden="true">
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className={`absolute bottom-0 w-full h-full ${flip ? "rotate-180" : ""}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0V30Z"
          className="fill-secondary/50"
        />
      </svg>
    </div>
  );
}
