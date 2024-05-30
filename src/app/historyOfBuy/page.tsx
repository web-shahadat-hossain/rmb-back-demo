"use client";
// Import necessary modules/components
import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import getBuyHistory from "@/lib/getBuyHistory";
import { toast } from "react-toastify";

// Define the TablesPage component
const TablesPage = () => {
  // State to store buy history data
  const [buyHistoryData, setBuyHistoryData] = React.useState([]);
  const [load, setLoad] = useState(false);

  // Fetch buy history data on component mount
  React.useEffect(() => {
    const fetchBuyHistoryData = async () => {
      try {
        const data = await getBuyHistory();
        // Reverse the order of buy history data
        setBuyHistoryData(data?.data?.reverse() || []);
      } catch (error) {
        console.error("Error fetching buy history data:", error);
      }
    };

    fetchBuyHistoryData();
  }, []);

  // Event handler for delete action
  const deleteHandler = async (id: string) => {
    setLoad(true);
    try {
      const response = await fetch(
        `https://business-management-back-end.onrender.com/api/v1/buy/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers if required
          },
        },
      );

      const responseData = await response.json();

      if (responseData.success) {
        toast.success("Deleted Success!!");
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

  // Render the component
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Buy History" />

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Latest Added Buy History
          </h4>

          <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                      Name
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Rate
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      RMB
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Invoice date
                    </th>
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {buyHistoryData.map((data: any, key: number) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {data.fullName}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {data.rate}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">{data.rmb}</p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {new Date(data.createdAt).toLocaleDateString()}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          {!load ? (
                            <button
                              className="hover:text-primary"
                              onClick={() => deleteHandler(data._id)}
                            >
                              {/* Add your SVG icon here */}
                              Delete
                            </button>
                          ) : (
                            <button className="hover:text-primary">
                              {/* Add your SVG icon here */}
                              Loading...
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
