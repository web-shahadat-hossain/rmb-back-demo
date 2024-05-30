"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Form() {
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoad(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (!response?.error) {
      router.push("/");
      router.refresh();
      setError("");
      setLoad(false);
    } else {
      setError("Your email address is not correct. Please try again");
      setLoad(false);
    }
  };
  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Sign In Form
          </h3>
        </div>
        <span className="pl-5 pt-2 text-red">{error}</span>
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Email
              </label>
              <input
                type="email"
                required
                name="email"
                placeholder="Enter your email address"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-5.5 mt-5 flex items-center justify-between">
              <label htmlFor="formCheckbox" className="flex cursor-pointer">
                <div className="relative pt-0.5">
                  <input
                    type="checkbox"
                    id="formCheckbox"
                    className="taskCheckbox sr-only"
                  />
                  <div className="box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark">
                    <span className="text-white opacity-0">
                      <svg
                        className="fill-current"
                        width="10"
                        height="7"
                        viewBox="0 0 10 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z"
                          fill=""
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <p>Remember me</p>
              </label>

              {/* <Link href="#" className="text-sm text-primary hover:underline">
                Forget password?
              </Link> */}
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
                Sign In
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
