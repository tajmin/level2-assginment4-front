import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type DeleteBookModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bookTitle?: string;
};

const DeleteBookModal = ({
  isOpen,
  onClose,
  onConfirm,
  bookTitle,
}: DeleteBookModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Book</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-medium text-red-600">
            {bookTitle ?? "this book"}
          </span>
          ? This action cannot be undone.
        </div>

        <DialogFooter className="pt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBookModal;
