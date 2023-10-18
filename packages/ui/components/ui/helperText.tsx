import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

const helpertextVariants = cva("transition-colors", {
  variants: {
    variant: {
      success: "text-[#29CC44]",
      default: "text-[#808080]",
      error: "text-[#F53D6B]",
    },
    fontSize: {
      xl: "text-xl",
      lg: "text-lg",
      md: "text-md",
      sm: "text-sm",
      xs: "text-xs",
    },
  },
  defaultVariants: {
    fontSize: "md",
  },
});

type TextProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof helpertextVariants> & {
    asChild?: boolean;
    as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  };

const HelperText = forwardRef<HTMLElement | null, TextProps>(
  ({ className, asChild = false, as: Tag = "p", ...props }, ref) => {
    const Comp = asChild ? Slot : Tag;
    return (
      // @ts-ignore
      <Comp className={cn(helpertextVariants({ className }))} {...props} />
    ); // ref is missing here
  }
);

HelperText.displayName = "HelperText";

export { HelperText, helpertextVariants };
