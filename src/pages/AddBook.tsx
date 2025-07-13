import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Resolver } from "react-hook-form";

import BookForm from "@/Forms/BookForm";
import { bookValidation, type BookFormDataType } from "@/validations/books";

const AddBook = () => {
  const navigate = useNavigate();

  const { reset } = useForm<BookFormDataType>({
    resolver: yupResolver(bookValidation) as Resolver<BookFormDataType>,
    defaultValues: {
      available: true,
    },
  });

  const createBook = (data: BookFormDataType) => {
    console.log("Form Submitted:", data);
    // TODO: send to backend
    reset();
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Add New Book</h1>
      <BookForm onSubmit={createBook} />
    </div>
  );
};

export default AddBook;
