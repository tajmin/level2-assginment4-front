import * as yup from "yup";

export const borrowValidation = yup.object({
  quantity: yup
    .number()
    .required("Quantity is required")
    .min(1, "At least 1 copy must be borrowed")
    .integer("Must be a whole number"),

  dueDate: yup
    .date()
    .required("Due date is required")
    .min(new Date(), "Date must be in the future"),
});

export type BorrowFormDataType = yup.InferType<typeof borrowValidation>;
