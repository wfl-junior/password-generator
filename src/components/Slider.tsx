import * as RadixSlider from "@radix-ui/react-slider";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { FormControl } from "./FormControl";

interface SliderProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  errorMessage?: string;
}

export const Slider = <T extends FieldValues>({
  name,
  control,
  label,
  errorMessage,
}: SliderProps<T>): JSX.Element => {
  const {
    field: { value, onChange },
  } = useController({ name, control });

  function handleValueChange(newValue: number[]) {
    onChange(newValue[0]);
  }

  return (
    <FormControl label={label} name={name} errorMessage={errorMessage}>
      <RadixSlider.Root
        min={6}
        max={64}
        step={1}
        id={name}
        name={name}
        value={[value]}
        onValueChange={handleValueChange}
        className="relative flex h-5 w-full cursor-pointer touch-none select-none items-center"
      >
        <RadixSlider.Track className="relative h-[3px] grow cursor-pointer rounded-full bg-zinc-700">
          <RadixSlider.Range className="absolute h-full rounded-full bg-indigo-600" />
        </RadixSlider.Track>

        <RadixSlider.Thumb className="relative block aspect-square w-5 cursor-grab rounded-full bg-indigo-300 shadow-[0_2px_10px] shadow-indigo-300 after:absolute after:top-full after:left-1/2 after:mt-1 after:-translate-x-1/2 after:text-sm after:content-[attr(aria-valuenow)] hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-400" />
      </RadixSlider.Root>
    </FormControl>
  );
};
