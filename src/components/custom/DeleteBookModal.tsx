import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteBookMutation } from "@/redux/api/api";
import { Loader } from "./Loader";

type DeleteBookModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  bookTitle?: string;
  bookId: string;
};

const DeleteBookModal = ({
  isOpen,
  onClose,
  onSuccess,
  bookTitle,
  bookId,
}: DeleteBookModalProps) => {
  const [deleteBook, { isLoading }] = useDeleteBookMutation();

  const handleDelete = async () => {
    if (!bookId) return;

    try {
      const res = await deleteBook(bookId).unwrap();
      toast.success(res.message);
      onSuccess?.();
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  if (isLoading) return <Loader />;

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
          <Button variant="destructive" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBookModal;
