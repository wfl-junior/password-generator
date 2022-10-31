import * as yup from "yup";

export const settingsValidationSchema = yup.object({
  includeNumbers: yup.boolean().required(),
  includeLowercase: yup.boolean().required(),
  includeUppercase: yup.boolean().required(),
  includeSymbols: yup.boolean().required(),
  length: yup
    .number()
    .integer("Length must be an integer")
    .required("Length is required")
    .typeError("Length must be a number"),
});
