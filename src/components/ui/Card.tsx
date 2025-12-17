import { cn } from "@/lib/cn";
import type { HTMLAttributes, PropsWithChildren } from "react";

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[28px] bg-black/55 backdrop-blur-xl",
        "card-glow",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
