// src/components/BorrowForm.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  borrowValidation,
  type BorrowFormDataType,
} from "@/validations/borrow";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type BorrowFormProps = {
  onSubmit: (data: BorrowFormDataType) => void;
  availableCopies: number;
  isLoading?: boolean;
};

const BorrowForm = ({
  onSubmit,
  availableCopies,
  isLoading = false,
}: BorrowFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BorrowFormDataType>({
    resolver: yupResolver(borrowValidation),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          type="number"
          id="quantity"
          min={1}
          max={availableCopies}
          {...register("quantity", {
            valueAsNumber: true,
            max: {
              value: availableCopies,
              message: `Cannot borrow more than ${availableCopies} copies`,
            },
          })}
        />
        {errors.quantity && (
          <p className="text-sm text-red-500">{errors.quantity.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="dueDate">Due Date</Label>
        <Input type="date" id="dueDate" {...register("dueDate")} />
        {errors.dueDate && (
          <p className="text-sm text-red-500">{errors.dueDate.message}</p>
        )}
      </div>

      <div className="text-right pt-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default BorrowForm;
