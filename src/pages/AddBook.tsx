import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Resolver } from "react-hook-form";
import { useCreateBookMutation } from "@/redux/api/api";
import { toast } from "sonner";

import BookForm from "@/Forms/BookForm";
import { bookValidation, type BookFormDataType } from "@/validations/books";
import { Loader } from "@/components/custom/Loader";

const AddBook = () => {
  const navigate = useNavigate();
  const [createBook, { isLoading }] = useCreateBookMutation();

  const { reset } = useForm<BookFormDataType>({
    resolver: yupResolver(bookValidation) as Resolver<BookFormDataType>,
    defaultValues: {
      available: true,
    },
  });

  const handleCreateBook = async (data: BookFormDataType) => {
    try {
      const res = await createBook(data).unwrap();
      toast.success(res.message);
      reset();
      navigate("/");
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Add New Book</h1>
      <BookForm onSubmit={handleCreateBook} />
    </div>
  );
};

export default AddBook;
