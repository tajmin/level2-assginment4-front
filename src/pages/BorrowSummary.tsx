import { useGetBorrowSummaryQuery } from "@/redux/api/api";
import { Loader } from "@/components/custom/Loader";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const BorrowSummary = () => {
  const { data, isLoading } = useGetBorrowSummaryQuery();
  const borrowSummary = data?.data || [];

  if (isLoading) return <Loader />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Borrow Summary</h2>

      <Card className="overflow-x-auto p-4 rounded-sm">
        {
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book Title</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Total Borrowed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {borrowSummary.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.book.title}</TableCell>
                  <TableCell>{item.book.isbn}</TableCell>
                  <TableCell>{item.totalQuantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
      </Card>
    </div>
  );
};

export default BorrowSummary;
