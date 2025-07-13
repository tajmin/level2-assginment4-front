import * as yup from "yup";

export const BOOKS_GENRE = [
  "FICTION",
  "HISTORY",
  "FANTASY",
  "NON_FICTION",
  "SCIENCE",
  "BIOGRAPHY",
];

export const bookValidation = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .min(1, "Title cannot be empty"),

  author: yup
    .string()
    .trim()
    .required("Author is required")
    .min(1, "Author cannot be empty"),

  genre: yup
    .mixed<(typeof BOOKS_GENRE)[number]>()
    .oneOf([...BOOKS_GENRE], "Invalid genre")
    .required("Genre is required"),

  isbn: yup
    .string()
    .required("ISBN is required")
    .matches(/^[\d-]+$/, "ISBN must contain only numbers and hyphens"),

  description: yup.string().optional(),

  copies: yup
    .number()
    .required("Number of copies is required")
    .min(0, "Copies should be a positive number")
    .integer("Copies should be a whole number"),

  available: yup.boolean().default(true),
});

export type BookFormDataType = yup.InferType<typeof bookValidation>;
