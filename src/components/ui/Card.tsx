import { cn } from "@/lib/cn";
import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[28px] bg-black/55 backdrop-blur-xl",
        "ring-1 ring-white/10",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.06),_0_28px_90px_rgba(0,0,0,0.85)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

