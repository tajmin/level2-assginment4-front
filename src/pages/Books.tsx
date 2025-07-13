// src/pages/Books.tsx
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash, ArrowLeftRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const mockBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-help",
    isbn: "9780735211292",
    copies: 5,
    available: true,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    isbn: "9780451524935",
    copies: 2,
    available: false,
  },
];

const Books = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Books</h1>
        <Button className="bg-cyan-600">Add New Book</Button>
      </div>

      <div className="overflow-auto rounded-md border">
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
            {mockBooks.map((book) => (
              <TableRow key={book.id}>
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
    </div>
  );
};

export default Books;
