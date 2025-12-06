"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : ("button" as any)

    const base =
      "inline-flex items-center justify-center rounded-xl font-semibold transition will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60 active:scale-[0.98]"

    const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-4 text-sm",
      lg: "h-12 px-5 text-base",
    }

    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
      primary:
        "text-[#0B1220] bg-brand-gradient btn-shine shadow-glow hover:opacity-95",
      secondary:
        "text-foreground bg-brand-gradient-soft border border-white/10 hover:border-brand-blue/40",
      outline:
        "text-foreground bg-surface-800/60 border border-white/20 hover:border-brand-blue/40",
      ghost:
        "text-foreground/80 hover:text-foreground hover:bg-white/5",
    }

    return (
      <Comp
        ref={ref}
        className={cn(base, sizes[size], variants[variant], className)}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"
