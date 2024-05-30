"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import getSellHistory from "@/lib/getSellHistory";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface BuyData {
  _id: string;
  fullName: string;
  rmb: number;
  rate: string;
  // Add other properties as needed
}
const FormLayout = () => {
  const [load, setLoad] = useState(false);
  const [buyHistoryData, setBuyHistoryData] = React.useState([]);
  const [buyData, setBuyData] = useState<BuyData | null>(null);

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    setLoad(true);
    const data = new FormData(e.target);
    const result = Object.fromEntries(data.entries());

    try {
      const response = await fetch(
        "https://business-management-back-end.onrender.com/api/v1/sell",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers if required
          },
          body: JSON.stringify(result),
        },
      );

      const responseData = await response.json();

      if (responseData.success) {
        toast.success("Sell Success!!");
        e.target.reset();
        setLoad(false);
      } else {
        toast.success(responseData.message);
        setLoad(false);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setLoad(false);
    }
  };

  // Fetch buy history data on component mount
  React.useEffect(() => {
    const fetchBuyHistoryData = async () => {
      try {
        const response = await fetch(
          "https://business-management-back-end.onrender.com/api/v1/buy",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch buy history data");
        }
        const data = await response.json();

        // Filter out data with status false
        const filteredData = data?.data?.filter(
          (item: any) => item.status === false,
        );

        setBuyHistoryData(filteredData.reverse());
      } catch (error) {
        console.error("Error fetching buy history data:", error);
        toast.error(
          "Failed to fetch buy history data. Please try again later.",
        );
      }
    };

    fetchBuyHistoryData();
  }, []);

  const onChangeHandler = (e: any) => {
    const filteredData = buyHistoryData?.find(
      (item: any) => item._id === e.target.value,
    );
    if (filteredData !== undefined) {
      setBuyData(filteredData);
    }
  };

  React.useEffect(() => {
    if (buyHistoryData.length > 0 && !buyData) {
      setBuyData(buyHistoryData[0]);
    }
  }, [buyHistoryData, buyData, load]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="RMB Sell" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Sell Now
              </h3>
            </div>
            <form onSubmit={onSubmitHandler}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Select Names
                  </label>
                  <select
                    onChange={onChangeHandler}
                    name="userName"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    {buyHistoryData.map((item: any) => (
                      <option value={item._id} key={item._id}>
                        {item.fullName}{" "}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Full Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your Name"
                    required
                    name="fullName"
                    value={buyData?.fullName || ""}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Sell Rate <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your  Sell Rate"
                    name="sellRate"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Buy Rate <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={buyData?.rate || ""}
                    required
                    placeholder="Enter your Buy Rate"
                    name="buyRate"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Sell rmb <span className="text-meta-1">*</span>
                  </label>
                  <input
                    value={buyData?.rmb || ""}
                    type="text"
                    required
                    placeholder="Enter your  Buy RMB"
                    name="rmb"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
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
        <ToastContainer />
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
