import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  IBook,
  IDeleteBookRes,
  IGetBook,
  IGetBooks,
} from "@/types/books.type";
import type {
  IBorrow,
  IBorrowRes,
  IGetBorrowSummary,
} from "@/types/borrows.type";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://level2-library.vercel.app/api",
  }),

  tagTypes: ["Books", "Borrow"],

  endpoints: (builder) => ({
    createBook: builder.mutation<IGetBook, IBook>({
      query: (body) => ({
        url: `/books`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Books"],
    }),

    getBooks: builder.query<IGetBooks, void>({
      query: () => "/books",
      providesTags: ["Books"],
    }),

    getBook: builder.query<IGetBook, string>({
      query: (id) => `/books/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Books", id }],
    }),

    updateBook: builder.mutation<IGetBook, IBook>({
      query: ({ _id, ...data }) => ({
        url: `/books/${_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { _id }) =>
        _id ? ["Books", { type: "Books", id: _id }] : ["Books"],
    }),

    deleteBook: builder.mutation<IDeleteBookRes, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      //   invalidatesTags: (_result, _error, id) => [
      //     "Books",
      //     { type: "Books", id },
      //   ],
      invalidatesTags: ["Books"],
    }),

    createBorrowBook: builder.mutation<IBorrowRes, IBorrow>({
      query: ({ book, ...body }) => ({
        url: `/borrow/${book}`,
        method: "POST",
        body,
      }),

      invalidatesTags: ["Books", "Borrow"],
    }),

    getBorrowSummary: builder.query<IGetBorrowSummary, void>({
      query: () => "/borrow",
      providesTags: ["Borrow"],
    }),
  }),
});

export const {
  useCreateBookMutation,
  useGetBooksQuery,
  useGetBookQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useCreateBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = api;
