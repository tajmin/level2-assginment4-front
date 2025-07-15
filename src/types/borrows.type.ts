export interface IBorrow {
  book: string;
  quantity: number;
  dueDate: string;
}

export interface IBorrowRes {
  success: boolean;
  message: string;
  data: {
    _id?: string;
    book?: string;
    quantity?: number;
    dueDate?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface IBorrowedBooks {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}

export interface IGetBorrowSummary {
  success: boolean;
  message: string;
  data: IBorrowedBooks[];
}
