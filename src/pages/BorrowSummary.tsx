import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

// 🔁 Replace this with your real API call or RTK query
type BorrowSummaryData = {
  title: string;
  isbn: string;
  totalBorrowed: number;
};

const fakeBorrowSummaryData: BorrowSummaryData[] = [
  { title: "Atomic Habits", isbn: "978-0735211292", totalBorrowed: 7 },
  { title: "1984", isbn: "978-0451524935", totalBorrowed: 3 },
  { title: "Sapiens", isbn: "978-0062316097", totalBorrowed: 9 },
];

const BorrowSummary = () => {
  const [data, setData] = useState<BorrowSummaryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setData(fakeBorrowSummaryData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Borrow Summary</h2>

      <Card className="overflow-x-auto p-0 rounded-sm">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
          </div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 font-medium">Book Title</th>
                <th className="px-4 py-2 font-medium">ISBN</th>
                <th className="px-4 py-2 font-medium">Total Borrowed</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.isbn}</td>
                  <td className="px-4 py-2">{item.totalBorrowed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
};

export default BorrowSummary;
