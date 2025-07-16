import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeftRight, Pencil, Trash } from "lucide-react";

import { useGetBooksQuery } from "@/redux/api/api";
import EditBookModal from "@/components/custom/EditBookModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DeleteBookModal from "@/components/custom/DeleteBookModal";
import BorrowBookModal from "@/components/custom/BorrowBookModal";
import { Loader } from "@/components/custom/Loader";
import type { IBook } from "@/types/books.type";

const Books = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState<string | null>(null);
  const [deleteBookTitle, setDeleteBookTitle] = useState<string | null>(null);

  const [borrowModalOpen, setBorrowModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedAvailableCopies, setSelectedAvailableCopies] =
    useState<number>(0);

  const { data, isLoading } = useGetBooksQuery();
  const books = data?.data || [];

  const handleShowBorrowModal = (bookId: string, availableCopies: number) => {
    setSelectedBookId(bookId);
    setSelectedAvailableCopies(availableCopies);
    setBorrowModalOpen(true);
  };

  const handleShowEditModal = (book: IBook) => {
    setSelectedBook(book);
    setEditModalOpen(true);
  };

  const handleShowDeleteModal = (bookId: string, title: string) => {
    setDeleteBookId(bookId);
    setDeleteBookTitle(title);
    setDeleteModalOpen(true);
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Books</h1>
        <Link to="/add-book">
          <Button className="bg-cyan-600 hover:cursor-pointer">
            Add New Book
          </Button>
        </Link>
      </div>

      <div className="overflow-auto rounded-md border bg-white px-4 py-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell>
                  {book.available && (
                    <Badge className="bg-lime-600">Available</Badge>
                  )}
                  {!book.available && (
                    <Badge className="bg-red-600">Stock Out</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <div className="flex justify-end gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          className="hover:cursor-pointer"
                          onClick={() => handleShowEditModal(book)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit Book</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          className="hover:cursor-pointer bg-red-600"
                          onClick={() =>
                            handleShowDeleteModal(
                              book._id as string,
                              book.title
                            )
                          }
                        >
                          <Trash className="h-4 w-4 text-white" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete Book</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="default"
                          className="hover:cursor-pointer"
                          onClick={() =>
                            handleShowBorrowModal(
                              book._id as string,
                              book.copies
                            )
                          }
                        >
                          <ArrowLeftRight className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Borrow Book</TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedBook && (
        <EditBookModal
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedBook(null);
          }}
          book={selectedBook}
          onSuccess={() => {
            setEditModalOpen(false);
            setSelectedBook(null);
          }}
        />
      )}
      <DeleteBookModal
        isOpen={deleteModalOpen}
        bookId={deleteBookId as string}
        onClose={() => {
          setDeleteModalOpen(false);
          setDeleteBookId(null);
          setDeleteBookTitle(null);
        }}
        onSuccess={() => {
          setDeleteModalOpen(false);
          setDeleteBookId(null);
          setDeleteBookTitle(null);
        }}
        bookTitle={deleteBookTitle as string}
      />
      {selectedBookId && (
        <BorrowBookModal
          isOpen={borrowModalOpen}
          onClose={() => {
            setBorrowModalOpen(false);
            setSelectedBookId(null);
          }}
          bookId={selectedBookId}
          availableCopies={selectedAvailableCopies}
        />
      )}
    </div>
  );
};

export default Books;
