import * as yup from "yup";

export const borrowValidation = (availableCopies: number) =>
  yup.object({
    quantity: yup
      .number()
      .typeError("Quantity must be a number")
      .required("Quantity is required")
      .min(1, "At least 1 copy must be borrowed")
      .integer("Must be a whole number")
      .max(
        availableCopies,
        `Cannot borrow more than ${availableCopies} available copies`
      ),
    dueDate: yup
      .date()
      .typeError("Due date must be a valid date")
      .required("Due date is required")
      .min(new Date(), "Date must be in the future"),
  });

export type BorrowFormDataType = yup.InferType<
  ReturnType<typeof borrowValidation>
>;
