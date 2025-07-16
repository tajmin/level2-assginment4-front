import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BookForm from "@/Forms/BookForm";
import { useUpdateBookMutation } from "@/redux/api/api";
import type { IBook } from "@/types/books.type";
import type { BookFormDataType } from "@/validations/books";
import { Loader } from "./Loader";

type EditBookModalProps = {
  isOpen: boolean;
  onClose: () => void;
  book: IBook;
  onSuccess?: () => void;
};

const EditBookModal = ({
  isOpen,
  onClose,
  book,
  onSuccess,
}: EditBookModalProps) => {
  const [updateBook, { isLoading }] = useUpdateBookMutation();

  const handleEdit = async (data: BookFormDataType) => {
    try {
      const res = await updateBook({ _id: book._id, ...data }).unwrap();
      // toast.success("Book updated successfully");
      onSuccess?.();
      onClose();
    } catch (err: any) {
      // toast.error(err?.data?.message || "Failed to update book");
    }

    onSuccess?.();
    onClose();
  };

  if (isLoading) return <Loader />;

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
