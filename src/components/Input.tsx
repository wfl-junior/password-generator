import { cva, VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { FormControl } from "./FormControl";

const inputStyles = cva(
  "rounded-md flex items-center gap-3 text-zinc-100 border-2 focus:border-indigo-600 focus:outline-none py-4 px-5",
  {
    variants: {
      variant: {
        primary: "placeholder:text-zinc-400 bg-zinc-800 border-zinc-800",
        secondary: "placeholder:text-zinc-300 bg-zinc-700 border-zinc-700",
      },
      size: {
        full: "w-full",
        small: "max-w-[8.75rem]",
      },
      hasError: {
        true: "border-red-600",
      },
    },
  },
);

type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "size"> &
  Omit<VariantProps<typeof inputStyles>, "hasError"> & {
    name: string;
    label: string;
    errorMessage?: string;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "primary",
      size = "full",
      className,
      label,
      errorMessage,
      ...props
    },
    ref,
  ) => (
    <FormControl label={label} name={props.name} errorMessage={errorMessage}>
      <input
        ref={ref}
        type="text"
        id={props.name}
        {...props}
        className={inputStyles({
          variant,
          hasError: Boolean(errorMessage),
          size,
          class: className,
        })}
      />
    </FormControl>
  ),
);
