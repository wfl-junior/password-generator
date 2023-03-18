import { cva, VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const buttonStyles = cva(
  "flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-300 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2",
  {
    variants: {
      variant: {
        primary:
          "text-sm px-5 py-6 bg-indigo-600 hover:enabled:bg-indigo-700 disabled:bg-zinc-700 text-zinc-50 focus-visible:ring-amber-600",
        secondary:
          "text-base hover:text-zinc-300 focus-visible:ring-indigo-600",
      },
    },
  },
);

type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonStyles>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => (
    <button
      ref={ref}
      className={buttonStyles({ variant, class: className })}
      {...props}
    />
  ),
);
