import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import type { NextPage } from "next";
import { ClipboardText } from "phosphor-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "~/components/Button";
import {
  CharactersSettings,
  CharactersSettingsRef,
} from "~/components/CharactersSettings";
import { Checkbox } from "~/components/Checkbox";
import { Slider } from "~/components/Slider";
import { generatePassword } from "~/utils/generatePassword";
import {
  PasswordSettingsFormValues,
  settingsValidationSchema,
} from "~/validation/settings";

const maxLength = 64;

const Home: NextPage = () => {
  const [password, setPassword] = useState("");
  const charactersSettingsRef = useRef<CharactersSettingsRef>(null);
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordSettingsFormValues>({
    resolver: yupResolver(settingsValidationSchema),
    defaultValues: {
      includeNumbers: true,
      includeLowercase: true,
      includeUppercase: true,
      includeSymbols: true,
      length: 16,
    },
  });

  const length = watch("length");
  const slicedPassword = password.slice(0, length);

  const handleGeneratePassword = handleSubmit(values => {
    const newPassword = generatePassword({
      ...values,
      ...charactersSettingsRef.current!.getCharactersSettings(),
      length: maxLength,
    });

    setPassword(newPassword);
  });

  async function handleCopyPasswordToClipboard() {
    try {
      await navigator.clipboard.writeText(slicedPassword);

      toast("Password copied to clipboard! 😎", {
        type: "success",
      });
    } catch {
      toast("Failed to copy password to clipboard 😰", {
        type: "error",
      });
    }
  }

  return (
    <form
      className="flex w-full max-w-[450px] flex-col gap-10"
      onSubmit={handleGeneratePassword}
    >
      <h1 className="text-center text-4xl font-semibold">
        Strong Password Generator
      </h1>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-2 rounded-md bg-zinc-800 px-5 py-6">
          <strong
            className={classNames(
              "truncate text-lg font-normal",
              password ? "text-zinc-100" : "text-zinc-400",
            )}
          >
            {slicedPassword || "*".repeat(length)}
          </strong>

          <button
            type="button"
            disabled={!slicedPassword}
            title="Copy to clipboard"
            onClick={handleCopyPasswordToClipboard}
            className="rounded p-0.5 text-zinc-400 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 hover:enabled:text-zinc-500 disabled:cursor-not-allowed disabled:text-zinc-600"
          >
            <ClipboardText size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <Checkbox
            control={control}
            name="includeNumbers"
            label="Include numbers"
          />

          <Checkbox
            control={control}
            name="includeLowercase"
            label="Include lowercase letters"
          />

          <Checkbox
            control={control}
            name="includeUppercase"
            label="Include uppercase letters"
          />

          <Checkbox
            control={control}
            name="includeSymbols"
            label="Include symbols"
          />

          <Slider
            min={6}
            name="length"
            label="Length"
            max={maxLength}
            control={control}
            errorMessage={errors.length?.message}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button type="submit" disabled={isSubmitting}>
          Generate Strong Password
        </Button>

        <CharactersSettings ref={charactersSettingsRef} />
      </div>
    </form>
  );
};

export default Home;
