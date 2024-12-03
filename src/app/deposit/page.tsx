"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Deposit = () => {
  const [load, setLoad] = useState(false);
  const [userId, setUserId] = useState("662e7beaa0acb02c4df4cb3a");
  const [secondaryUserId, setSecondaryUserId] = useState(
    "674df9ef742349973b23a630",
  );
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  console.log(purpose);
  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoad(true);

    try {
      const response = await axios.post("/api/deposit", {
        userId,
        secondaryUserId,
        amount,
        purpose: purpose,
      });
      setLoad(false);
      toast.success(response.data.message);
    } catch (error: any) {
      setLoad(false);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Deposit" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Deposit Balance
              </h3>
            </div>
            <form onSubmit={onSubmitHandler}>
              <div className="p-6.5">
                {/* <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    User ID <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Secondary User ID <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Secondary User ID"
                    value={secondaryUserId}
                    onChange={(e) => setSecondaryUserId(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div> */}
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Purpose <span className="text-meta-1">*</span>
                  </label>
                  <select
                    name="purpose"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  >
                    <option value="" disabled>
                      Select a Purpose
                    </option>
                    <option value="Marble">Marble</option>
                    <option value="Branch">Branch</option>
                  </select>
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Deposit Amount <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Enter Deposit Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {load ? (
                  <button
                    type="button"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    disabled
                  >
                    <svg className="mr-3 h-5 w-5 " viewBox="0 0 24 24"></svg>
                    Please wait...
                  </button>
                ) : (
                  <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Submit Now
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </DefaultLayout>
  );
};

export default Deposit;
