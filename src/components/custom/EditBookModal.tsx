import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BookForm from "@/Forms/BookForm";
import type { BookFormDataType } from "@/validations/books";

type EditBookModalProps = {
  isOpen: boolean;
  onClose: () => void;
  book: BookFormDataType;
  onSuccess?: () => void;
};

const EditBookModal = ({
  isOpen,
  onClose,
  book,
  onSuccess,
}: EditBookModalProps) => {
  const handleEdit = (data: BookFormDataType) => {
    console.log("Updated book:", data);
    onSuccess?.();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gray-100">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>
        <BookForm initialValues={book} onSubmit={handleEdit} />
      </DialogContent>
    </Dialog>
  );
};

export default EditBookModal;
