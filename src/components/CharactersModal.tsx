import { yupResolver } from "@hookform/resolvers/yup";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useForm } from "react-hook-form";
import type { InferType } from "yup";
import { charactersValidationSchema } from "~/validation/characters";
import { Button } from "./Button";
import { Input } from "./Input";

type CharactersFormValues = InferType<typeof charactersValidationSchema>;

export interface CharactersSettingsRef {
  getCharactersSettings: () => CharactersFormValues;
}

export const CharactersModal = forwardRef<CharactersSettingsRef>(
  (_props, ref): JSX.Element => {
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const {
      register,
      getValues,
      formState: { errors, isSubmitting },
      handleSubmit,
    } = useForm<CharactersFormValues>({
      resolver: yupResolver(charactersValidationSchema),
      defaultValues: {
        numberCharacters: "0123456789",
        lowercaseCharacters: "abcdefghijklmnopqrstuvwxyz",
        uppercaseCharacters: "ABCDEFGHIJKLMOPQRSTUVWXYZ",
        symbolCharacters: "!@#$%&*^~[]{}-_=+;.,\\|/\"?'<>",
        numberAmount: 2,
        lowercaseAmount: 2,
        uppercaseAmount: 2,
        symbolAmount: 2,
      },
    });

    useImperativeHandle(
      ref,
      () => ({
        getCharactersSettings: getValues,
      }),
      [getValues],
    );

    const handleSave = handleSubmit(() => {
      closeButtonRef.current?.click();
    });

    return (
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/25" />

        <Dialog.Content className="fixed top-1/2 left-1/2 flex max-h-screen w-[calc(100%-0.5rem*2)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col justify-center gap-6 overflow-y-auto rounded-md bg-zinc-800 p-8 pt-6">
          <header className="flex items-start justify-between">
            <Dialog.Title asChild>
              <h2 className="text-3xl text-zinc-100">Characters Settings</h2>
            </Dialog.Title>

            <Dialog.Close
              ref={closeButtonRef}
              className="text-zinc-400 transition-colors duration-300 hover:text-zinc-500"
              title="Close"
            >
              <X size={24} />
            </Dialog.Close>
          </header>

          <form className="flex flex-col gap-4" onSubmit={handleSave}>
            <div className="flex items-start gap-1">
              <div className="flex-1">
                <Input
                  variant="secondary"
                  label="Numbers"
                  placeholder="012"
                  errorMessage={errors.numberCharacters?.message}
                  {...register("numberCharacters")}
                />
              </div>

              <Input
                size="small"
                variant="secondary"
                label="Qtd"
                placeholder="2"
                errorMessage={errors.numberAmount?.message}
                {...register("numberAmount", { valueAsNumber: true })}
              />
            </div>

            <div className="flex items-start gap-1">
              <div className="flex-1">
                <Input
                  variant="secondary"
                  label="Lowercase letters"
                  placeholder="abc"
                  errorMessage={errors.lowercaseCharacters?.message}
                  {...register("lowercaseCharacters")}
                />
              </div>

              <Input
                size="small"
                variant="secondary"
                label="Qtd"
                placeholder="2"
                errorMessage={errors.lowercaseAmount?.message}
                {...register("lowercaseAmount", { valueAsNumber: true })}
              />
            </div>

            <div className="flex items-start gap-1">
              <div className="flex-1">
                <Input
                  variant="secondary"
                  label="Uppercase letters"
                  placeholder="ABC"
                  errorMessage={errors.uppercaseCharacters?.message}
                  {...register("uppercaseCharacters")}
                />
              </div>

              <Input
                size="small"
                variant="secondary"
                label="Qtd"
                placeholder="2"
                errorMessage={errors.uppercaseAmount?.message}
                {...register("uppercaseAmount", { valueAsNumber: true })}
              />
            </div>

            <div className="flex items-center gap-1">
              <div className="flex-1">
                <Input
                  variant="secondary"
                  label="Symbols"
                  placeholder="!@#"
                  errorMessage={errors.symbolCharacters?.message}
                  {...register("symbolCharacters")}
                />
              </div>

              <Input
                size="small"
                variant="secondary"
                label="Qtd"
                placeholder="2"
                errorMessage={errors.symbolAmount?.message}
                {...register("symbolAmount", { valueAsNumber: true })}
              />
            </div>

            <Button type="submit" className="mt-2" disabled={isSubmitting}>
              Save
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    );
  },
);
