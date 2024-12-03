"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormLayout = () => {
  const [userId, setUserId] = useState("662e7beaa0acb02c4df4cb3a");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/api/expense", {
        userId,
        amount,
        purpose,
      });
      setMessage(response.data.message);
      toast.success("Expense added successfully!");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "An error occurred");
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Balance" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* Expense Form */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Expense
              </h3>
            </div>
            <form onSubmit={handleExpense}>
              <div className="p-6.5">
                {/* User ID Input */}
                {/* <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    User ID <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="userId"
                    placeholder="Enter user ID"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                  />
                </div> */}

                {/* Amount Input */}
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Amount <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Enter the amount"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>

                {/* Purpose Input */}
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Purpose <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="purpose"
                    placeholder="Enter the purpose"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    required
                  />
                </div>

                {/* Message Output */}
                {message && (
                  <div className="mb-4 text-sm font-medium text-black dark:text-white">
                    {message}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90 ${
                    isLoading && "cursor-not-allowed"
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Submit Now"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
