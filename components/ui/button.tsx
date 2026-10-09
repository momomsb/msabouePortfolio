import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-ink hover:bg-accent-strong hover:shadow-glow",
  secondary: "border border-line-strong bg-raised/60 text-fg backdrop-blur hover:border-accent/50 hover:bg-overlay",
  ghost: "text-muted hover:bg-raised hover:text-fg",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[0.9375rem]",
};

export function buttonStyles({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

interface StyleProps {
  variant?: Variant;
  size?: Size;
}

type ButtonLinkProps = StyleProps &
  Omit<ComponentProps<typeof Link>, "href"> & {
    href: string;
    /** External links open in a new tab with safe rel attributes. */
    external?: boolean;
    children: ReactNode;
  };

export function ButtonLink({ variant, size, className, external, href, children, ...props }: ButtonLinkProps) {
  const classes = buttonStyles({ variant, size, className });
  if (external || href.startsWith("mailto:") || /\.(pdf)$/i.test(href)) {
    return (
      <a
        href={href}
        className={classes}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        {...(props as ComponentProps<"a">)}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

type ButtonProps = StyleProps & ComponentProps<"button">;

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}
