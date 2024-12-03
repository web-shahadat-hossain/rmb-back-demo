"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState, ChangeEvent, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // Import axios

// Defining type for the response message
interface ApiResponse {
  message: string;
}

const FormLayout = () => {
  const [load, setLoad] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("674df9ef742349973b23a630");
  const [amount, setAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Handler for form submission
  const handlePayCommission = async (e: FormEvent) => {
    e.preventDefault();
    setLoad(true);

    try {
      // Making the API call using axios
      const response = await axios.post<ApiResponse>("/api/pay-commission", {
        userId,
        amount,
      });

      setMessage(response.data.message); // Set success message
      toast.success("Balance added successfully!");
      setLoad(false);
    } catch (error: any) {
      console.error("There was a problem with the API request:", error);
      setMessage(error.response?.data?.message || "An error occurred");
      setLoad(false);
    }
  };

  // Handler for updating user ID

  // Handler for updating amount
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Balance" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Balance
              </h3>
            </div>
            <form onSubmit={handlePayCommission}>
              <div className="p-6.5">
                {/* <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Full Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your Name"
                    name="fullName"
                    value={userId}
                    onChange={handleUserIdChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                </div> */}

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Balance <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter your Amount"
                    name="mainBalance"
                    value={amount}
                    onChange={handleAmountChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                </div>
                {/* <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Message <span className="text-meta-1">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div> */}

                {load ? (
                  <button
                    type="button"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    disabled
                  >
                    Please wait...
                  </button>
                ) : (
                  <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Submit Now
                  </button>
                )}
              </div>
            </form>
            {message && <p className="mt-4 text-green-500">{message}</p>}
          </div>
        </div>
      </div>

      <ToastContainer />
    </DefaultLayout>
  );
};

export default FormLayout;
