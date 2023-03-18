interface FormControlProps {
  name: string;
  label: string;
  errorMessage?: string;
  children: React.ReactNode;
}

export const FormControl: React.FC<FormControlProps> = ({
  name,
  label,
  errorMessage,
  children,
}) => (
  <div className="flex flex-col gap-2">
    <label
      htmlFor={name}
      className="cursor-pointer text-sm font-normal text-zinc-100"
    >
      {label}
    </label>

    {children}

    {errorMessage ? (
      <span className="text-sm font-normal text-red-500">{errorMessage}</span>
    ) : null}
  </div>
);
