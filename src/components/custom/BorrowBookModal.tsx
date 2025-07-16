import { useNavigate } from "react-router";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { BorrowFormDataType } from "@/validations/borrow";
import BorrowForm from "@/Forms/BorrowForm";
import { useCreateBorrowBookMutation } from "@/redux/api/api";

type BorrowBookModalProps = {
  isOpen: boolean;
  onClose: () => void;
  bookId: string;
  availableCopies: number;
};

const BorrowBookModal = ({
  isOpen,
  onClose,
  bookId,
  availableCopies,
}: BorrowBookModalProps) => {
  const navigate = useNavigate();
  const [createBorrowBook, { isLoading }] = useCreateBorrowBookMutation();

  const handleSubmit = async (data: BorrowFormDataType) => {
    try {
      const payload = {
        book: bookId,
        quantity: data.quantity,
        dueDate: data.dueDate.toISOString(),
      };
      const res = await createBorrowBook(payload).unwrap();
      console.log("Borrowed Book:", { bookId, ...data, res });

      //   toast.success("Book borrowed successfully");
      onClose();
      navigate("/borrow-summary");
    } catch (error) {
      //   toast.error("Failed to borrow book");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
        </DialogHeader>
        <BorrowForm
          onSubmit={handleSubmit}
          availableCopies={availableCopies}
          isLoading={isLoading}
        />
        {/* <DialogFooter>Optional: extra buttons or cancel</DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookModal;
