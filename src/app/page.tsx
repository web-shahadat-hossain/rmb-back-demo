import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import getUser from "@/lib/getUser";
import getTransactions from "@/lib/getTransactions";

export const metadata: Metadata = {
  title: "RMB Dashboard",
  description: "RMB Dashboard",
};

export default async function Home() {
  const data = await getUser();
  const userData = data || [];
  const transactions = await getTransactions();
  return (
    <>
      <DefaultLayout>
        <ECommerce userData={userData} transactionsData={transactions} />
      </DefaultLayout>
    </>
  );
}
