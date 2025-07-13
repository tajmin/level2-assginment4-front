import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  BOOKS_GENRE,
  bookValidation,
  type BookFormDataType,
} from "@/validations/books";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type BookFormProps = {
  initialValues?: Partial<BookFormDataType>;
  onSubmit: (data: BookFormDataType) => void;
};

const BookForm = ({
  initialValues = { available: true },
  onSubmit,
}: BookFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookFormDataType>({
    resolver: yupResolver(bookValidation) as Resolver<BookFormDataType>,
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: 0,
      available: true,
      ...initialValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title")} />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="author">Author</Label>
          <Input id="author" {...register("author")} />
          {errors.author && (
            <p className="text-sm text-red-500">{errors.author.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="genre">Genre</Label>
          <Select
            defaultValue={initialValues.genre}
            onValueChange={(val) =>
              setValue("genre", val as BookFormDataType["genre"])
            }
          >
            <SelectTrigger id="genre" className="w-full">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              {BOOKS_GENRE.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre.replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.genre && (
            <p className="text-sm text-red-500">{errors.genre.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="isbn">ISBN</Label>
          <Input id="isbn" {...register("isbn")} />
          {errors.isbn && (
            <p className="text-sm text-red-500">{errors.isbn.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="copies">Copies</Label>
          <Input
            id="copies"
            type="number"
            {...register("copies", { valueAsNumber: true })}
          />
          {errors.copies && (
            <p className="text-sm text-red-500">{errors.copies.message}</p>
          )}
        </div>

        <div className="flex items-center gap-2 mt-6">
          <Switch
            id="available"
            defaultChecked={initialValues.available}
            onCheckedChange={(val) => setValue("available", val)}
          />
          <Label htmlFor="available">Available</Label>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="pt-4 flex justify-end gap-2">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
};

export default BookForm;
