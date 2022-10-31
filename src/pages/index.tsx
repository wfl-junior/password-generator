import { yupResolver } from "@hookform/resolvers/yup";
import * as Dialog from "@radix-ui/react-dialog";
import type { NextPage } from "next";
import { ClipboardText } from "phosphor-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { InferType } from "yup";
import { Button } from "~/components/Button";
import {
  CharactersModal,
  CharactersSettingsRef,
} from "~/components/CharactersModal";
import { Checkbox } from "~/components/Checkbox";
import { Input } from "~/components/Input";
import { generatePassword } from "~/utils/generatePassword";
import { settingsValidationSchema } from "~/validation/settings";

type PasswordSettingsFormValues = InferType<typeof settingsValidationSchema>;

const Home: NextPage = () => {
  const [password, setPassword] = useState("");
  const charactersSettingsRef = useRef<CharactersSettingsRef>(null);
  const {
    handleSubmit,
    control,
    register,
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

  const handleGeneratePassword = handleSubmit(values => {
    const newPassword = generatePassword({
      ...values,
      ...charactersSettingsRef.current!.getCharactersSettings(),
    });

    setPassword(newPassword);
  });

  async function handleCopyPasswordToClipboard() {
    try {
      await navigator.clipboard.writeText(password);
      toast("Password copied to clipboard! 😎", {
        autoClose: 3000,
        type: "success",
      });
    } catch {
      toast("Failed to copy password to clipboard 😰", {
        autoClose: 3000,
        type: "error",
      });
    }
  }

  return (
    <form
      className="flex max-w-lg flex-col gap-10"
      onSubmit={handleGeneratePassword}
    >
      <h1 className="text-center text-4xl font-semibold">
        Strong Password Generator
      </h1>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-2 rounded-md bg-zinc-800 px-5 py-6">
          <strong
            className={`text-lg font-normal ${
              password ? "text-zinc-100" : "text-zinc-400"
            }`}
          >
            {password || "****************"}
          </strong>

          <button
            type="button"
            title="Copy to clipboard"
            className="text-zinc-400 transition-colors duration-300 hover:text-zinc-500"
            onClick={handleCopyPasswordToClipboard}
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

          <Input
            label="Length"
            placeholder="16"
            inputMode="numeric"
            errorMessage={errors.length?.message}
            {...register("length", { valueAsNumber: true })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button type="submit" disabled={isSubmitting}>
          Generate Strong Password
        </Button>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button variant="secondary" type="button">
              Open character settings
            </Button>
          </Dialog.Trigger>

          <CharactersModal ref={charactersSettingsRef} />
        </Dialog.Root>
      </div>
    </form>
  );
};

export default Home;
