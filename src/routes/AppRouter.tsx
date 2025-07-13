import { createBrowserRouter, RouterProvider } from "react-router";

import Books from "@/pages/Books";
import Layout from "@/pages/Layout";
import BorrowSummary from "@/pages/BorrowSummary";

const routes = [
  {
    path: "/",
    element: <Layout />,

    children: [
      { index: true, element: <Books /> },
      {
        path: "/borrow-summary",
        element: <BorrowSummary />,
      },
    ],
  },
];

const AppRouter = () => {
  return <RouterProvider router={createBrowserRouter(routes)} />;
};

export default AppRouter;
