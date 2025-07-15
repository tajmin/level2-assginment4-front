import { useGetBorrowSummaryQuery } from "@/redux/api/api";
import { Loader } from "@/components/custom/Loader";
import { Card } from "@/components/ui/card";

const BorrowSummary = () => {
  const { data, isLoading } = useGetBorrowSummaryQuery();
  const borrowSummary = data?.data || [];

  if (isLoading) return <Loader />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Borrow Summary</h2>

      <Card className="overflow-x-auto p-0 rounded-sm">
        {
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 font-medium">Book Title</th>
                <th className="px-4 py-2 font-medium">ISBN</th>
                <th className="px-4 py-2 font-medium">Total Borrowed</th>
              </tr>
            </thead>
            <tbody>
              {borrowSummary.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{item.book.title}</td>
                  <td className="px-4 py-2">{item.book.isbn}</td>
                  <td className="px-4 py-2">{item.totalQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </Card>
    </div>
  );
};

export default BorrowSummary;
