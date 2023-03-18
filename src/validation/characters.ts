import * as yup from "yup";

const amountValidation = yup
  .number()
  .required("Qtd is required")
  .integer("Qtd must be an integer")
  .typeError("Qtd must be a number");

export const charactersValidationSchema = yup.object({
  numberCharacters: yup
    .string()
    .required("The number characters is required")
    .matches(/^[\d]+$/g, "Only numbers are allowed for this field")
    .matches(/^(?!.*(.).*\1).+$/g, "Duplicates are not allowed"),
  lowercaseCharacters: yup
    .string()
    .required("The lowercase characters is required")
    .matches(
      /^[a-záàâãéèêíïóôõöúçñ]+$/g,
      "Only lowercase letters are allowed for this field",
    )
    .matches(/^(?!.*(.).*\1).+$/g, "Duplicates are not allowed"),
  uppercaseCharacters: yup
    .string()
    .required("The uppercase characters is required")
    .matches(
      /^[A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]+$/g,
      "Only uppercase letters are allowed for this field",
    )
    .matches(/^(?!.*(.).*\1).+$/g, "Duplicates are not allowed"),
  symbolCharacters: yup
    .string()
    .required("The symbol characters is required")
    .matches(
      /^[^a-zA-Z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]+$/g,
      "Only symbols are allowed for this field",
    )
    .matches(/^(?!.*(.).*\1).+$/g, "Duplicates are not allowed"),
  numberAmount: amountValidation,
  lowercaseAmount: amountValidation,
  uppercaseAmount: amountValidation,
  symbolAmount: amountValidation,
});

export type CharactersFormValues = yup.InferType<
  typeof charactersValidationSchema
>;
