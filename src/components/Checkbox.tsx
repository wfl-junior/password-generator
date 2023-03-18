import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { AnimatePresence } from "framer-motion";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { AnimatedCheck } from "./icons/AnimatedCheck";

interface CheckboxProps<T extends FieldValues>
  extends RadixCheckbox.CheckboxProps {
  name: Path<T>;
  label: string;
  control: Control<T>;
}

export const Checkbox = <T extends FieldValues = FieldValues>({
  name,
  label,
  control,
  ...props
}: CheckboxProps<T>): JSX.Element => {
  const {
    field: { value, onChange },
  } = useController({ name, control });

  return (
    <div className="flex items-center gap-3">
      <RadixCheckbox.Root
        checked={value}
        onCheckedChange={onChange}
        className="flex aspect-square w-7 items-center justify-center rounded-md bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
        name={name}
        id={name}
        {...props}
      >
        <AnimatePresence initial={false}>
          {value && (
            <RadixCheckbox.Indicator forceMount>
              <AnimatedCheck size={24} className="text-green-600" />
            </RadixCheckbox.Indicator>
          )}
        </AnimatePresence>
      </RadixCheckbox.Root>

      <label htmlFor={name} className="cursor-pointer text-base font-normal">
        {label}
      </label>
    </div>
  );
};
