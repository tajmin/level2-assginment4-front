import { useNavigate } from "react-router";
import { toast } from "sonner";

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
      toast.success(res.message);
      onClose();
      navigate("/borrow-summary");
    } catch (err: any) {
      toast.error(err?.data?.message);
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
