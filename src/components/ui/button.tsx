import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c1533] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#4a0012] text-white shadow-[0_14px_36px_rgba(74,0,18,.32)] hover:-translate-y-0.5 hover:bg-[#5b0017]",
        outline:
          "border border-white/35 bg-white/5 text-white backdrop-blur-md hover:border-white/65 hover:bg-white/12",
        light:
          "bg-[#f7f6f3] text-[#1c1c1c] hover:-translate-y-0.5 hover:bg-white",
        ghost: "text-current hover:bg-current/5",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-5 text-xs",
        lg: "h-14 px-8 text-sm",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
