import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Resolver } from "react-hook-form";
import { useCreateBookMutation } from "@/redux/api/api";

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
      console.log(res);
      // toast.success(res.message || "Book added successfully!");
      reset();
      navigate("/"); // redirect to home or books list
    } catch (err: any) {
      // toast.error(err?.data?.message || "Failed to create book.");
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
