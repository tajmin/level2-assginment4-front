import type { BOOKS_GENRE } from "@/validations/books";

type BookGenreType = (typeof BOOKS_GENRE)[number];

export type IBook = {
  _id?: string;
  title: string;
  author: string;
  genre: BookGenreType;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export interface IGetBooks {
  success: boolean;
  message: string;
  data: IBook[];
}

export interface IGetBook {
  success: boolean;
  message: string;
  data: IBook;
}

export interface IDeleteBookRes {
  success: boolean;
  message: string;
  data: null;
}
