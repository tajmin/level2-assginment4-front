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
import type { BookFormDataType } from "@/validations/books";
import DeleteBookModal from "@/components/custom/DeleteBookModal";
import BorrowBookModal from "@/components/custom/BorrowBookModal";
import { Loader } from "@/components/custom/Loader";

const Books = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookFormDataType | null>(
    null
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState<string | null>(null);
  const [deleteBookTitle, setDeleteBookTitle] = useState<string>("");
  const [borrowModalOpen, setBorrowModalOpen] = useState(false);

  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedAvailableCopies, setSelectedAvailableCopies] =
    useState<number>(0);

  const { data, isLoading } = useGetBooksQuery();
  const books = data?.data || [];

  const handleBorrow = (bookId: string, availableCopies: number) => {
    setSelectedBookId(bookId);
    setSelectedAvailableCopies(availableCopies);
    setBorrowModalOpen(true);
  };

  const handleEdit = (book: BookFormDataType) => {
    setSelectedBook(book);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (bookId: string, title: string) => {
    setDeleteBookId(bookId);
    setDeleteBookTitle(title);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteBookId) return;

    console.log("Deleting book with ID:", deleteBookId);
    // toast.success("Book deleted successfully");
    setDeleteModalOpen(false);
    setDeleteBookId(null);
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
                          onClick={() => handleEdit(book)}
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
                            handleDeleteClick(book._id as string, book.title)
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
                            handleBorrow(book._id as string, book.copies)
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
            // Refetch or update UI here if needed
            setEditModalOpen(false);
            setSelectedBook(null);
          }}
        />
      )}
      <DeleteBookModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        bookTitle={deleteBookTitle}
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
