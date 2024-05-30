"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const FormLayout = () => {
  const [load, setLoad] = useState(false);
  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    setLoad(true);
    const data = new FormData(e.target);
    const result = Object.fromEntries(data.entries());

    try {
      const response = await fetch(
        "https://business-management-back-end.onrender.com/api/v1/balance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers if required
          },
          body: JSON.stringify(result),
        },
      );

      if (!response.ok) {
        setLoad(false);
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (responseData.success) {
        toast.success("Balance added!!");
        setLoad(false);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setLoad(false);
    }
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
            <form onSubmit={onSubmitHandler}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Select User Name
                  </label>
                  <select
                    name="userName"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="Dalim24">Md Dalim </option>
                    <option value="Taher24">Abu Taher</option>
                  </select>
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Full Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your Name"
                    name="fullName"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Balance <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter your Amount"
                    name="mainBalance"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Message <span className="text-meta-1">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>
                {/* <SelectGroupOne /> */}

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
      </div>
      <ToastContainer />
    </DefaultLayout>
  );
};

export default FormLayout;
