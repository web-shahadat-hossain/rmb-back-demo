import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from "react";

interface Transaction {
  _id: string;
  user_id: string;
  amount: number;
  type: string;
  date: string;
  purpose?: string;
  profit?: number;
  commission?: number;
}

export default async function AllTransactionsList({ transactionsData }: any) {
  const transactions = transactionsData ? transactionsData?.slice(0, 10) : [];
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">All Transactions History</h1>
      <div className="rounded border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                User ID
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Type
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Amount
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Profit
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Commission
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Date
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Purpose
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map(
              (transaction: {
                _id: Key | null | undefined;
                user_id:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | PromiseLikeOfReactNode
                  | null
                  | undefined;
                type:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | PromiseLikeOfReactNode
                  | null
                  | undefined;
                amount: number;
                profit: number;
                commission: number;
                date: string | number | Date;
                purpose: any;
              }) => (
                <tr key={transaction._id}>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {transaction.user_id}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {transaction.type}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    ৳{transaction.amount.toFixed(2)}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    ৳
                    {transaction?.profit
                      ? transaction?.profit?.toFixed(2)
                      : "N/A"}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    ৳
                    {transaction.commission
                      ? transaction.commission.toFixed(2)
                      : "N/A"}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {transaction.purpose || "N/A"}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
        {transactions.length === 0 && (
          <p className="text-gray-500 py-4 text-center">
            No transactions found.
          </p>
        )}
      </div>
    </div>
  );
}
