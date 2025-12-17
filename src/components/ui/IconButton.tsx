import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type IconButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "ghost" | "soft";
  }
>;

export function IconButton({
  className,
  variant = "soft",
  children,
  ...props
}: IconButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full transition-colors";
  const styles =
    variant === "ghost"
      ? "text-white/80 hover:text-white"
      : "bg-white/5 text-white/80 ring-1 ring-white/10 hover:bg-white/10 hover:text-white";

  return (
    <button className={cn(base, styles, className)} {...props}>
      {children}
    </button>
  );
}

