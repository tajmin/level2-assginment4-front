import { useState } from "react";
import { useNavigate } from "react-router";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { BorrowFormDataType } from "@/validations/borrow";
import BorrowForm from "@/Forms/BorrowForm";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: BorrowFormDataType) => {
    if (data.quantity > availableCopies) {
      //   toast.error("Quantity exceeds available copies");
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Replace this with RTK mutation or API call
      console.log("Borrowed Book:", { bookId, ...data });

      //   toast.success("Book borrowed successfully");
      onClose();
      navigate("/borrow-summary");
    } catch (error) {
      //   toast.error("Failed to borrow book");
    } finally {
      setIsSubmitting(false);
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
          isLoading={isSubmitting}
        />
        {/* <DialogFooter>Optional: extra buttons or cancel</DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookModal;
