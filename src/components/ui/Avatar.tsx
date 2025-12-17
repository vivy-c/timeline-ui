import { cn } from "@/lib/cn";

type AvatarProps = {
  src?: string;
  alt: string;
  size?: number;
  className?: string;
};

export function Avatar({ src, alt, size = 36, className }: AvatarProps) {
  const initials = alt
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div
      className={cn(
        "grid place-items-center overflow-hidden rounded-full ring-1 ring-white/10",
        "bg-gradient-to-br from-white/10 to-white/5 text-xs font-semibold text-white/80",
        className,
      )}
      style={{ width: size, height: size }}
      aria-label={alt}
      title={alt}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}

