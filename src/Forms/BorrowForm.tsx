import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  borrowValidation,
  type BorrowFormDataType,
} from "@/validations/borrow";

type BorrowFormProps = {
  onSubmit: (data: BorrowFormDataType) => void;
  availableCopies: number;
  isLoading: boolean;
};

const BorrowForm = ({
  onSubmit,
  availableCopies,
  isLoading,
}: BorrowFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BorrowFormDataType>({
    resolver: yupResolver(borrowValidation(availableCopies)),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="quantity" className="mb-2">
          Quantity
        </Label>
        <Input
          type="number"
          id="quantity"
          min={1}
          {...register("quantity", {
            valueAsNumber: true,
          })}
        />
        {errors.quantity && (
          <p className="text-sm text-red-500">{errors.quantity.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="dueDate" className="mb-2">
          Due Date
        </Label>
        <Input type="date" id="dueDate" {...register("dueDate")} />
        {errors.dueDate && (
          <p className="text-sm text-red-500">{errors.dueDate.message}</p>
        )}
      </div>

      <div className="text-right pt-2">
        <Button
          className="hover:cursor-pointer"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default BorrowForm;
