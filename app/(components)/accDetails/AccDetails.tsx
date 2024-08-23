"use client";

import { FaSpinner } from "react-icons/fa";
import { useAccDetails } from "./useAccDetails";
import Image from "next/image";
import AccTextInput from "../accTextInput/accTextInput";
import AccDropdown from "../accDropdown/AccDropdown";
import { dropdownConfigs } from "@/constants/Constants";

const AccDetails: React.FC = () => {
  const {
    time,
    userData,
    updateUserLoading,
    deleteUserLoading,
    handleChange,
    handleUpdateProfile,
    handleDeleteAccount,
  } = useAccDetails();

  return (
    <div className="w-[95%] mx-auto">
      <h3 className="font-semibold text-xs text-gray-600 mb-2 sm:mb-3">
        Account Details
      </h3>
      <h4 className="font-bold text-2xl">Profile</h4>
      <div className="py-6">
        <div className="mt-3 sm:mt-4 flex gap-8 items-center">
          <div className="inline-block h-[5rem] w-[5rem] rounded-full overflow-hidden bg-gray-200">
            <Image
              className="object-cover"
              src={
                typeof userData?.image === "string" &&
                userData?.image?.length > 0
                  ? userData?.image
                  : "https://avatar.iran.liara.run/public"
              }
              alt="User Avatar"
              loading="lazy"
              width={80}
              height={80}
              objectFit="cover"
            />
          </div>
          <div>
            <button className="border border-dark/80 rounded-[40px] font-semibold text-[10px] text-dark/80 py-1.5 px-2.5 hover:text-white hover:bg-dark transition duration-200">
              Upload picture
            </button>
            <p className="text-gray-400 text-xs mt-2">
              JPG, GIF or PNG. Max size of 5MB.
            </p>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile}>
          <div className="mt-1 mb-12">
            <AccTextInput
              id="name"
              name="name"
              value={typeof userData?.name === "string" ? userData?.name : ""}
              onChange={handleChange}
              label="Name"
              placeholder="Name"
              info="i"
            />

            <div className="mt-5">
              <label htmlFor="message" className="font-bold text-sm">
                Welcome Message
              </label>
              <span className="ml-2 max-w-min border-[1.5px] border-gray-500 text-[7.5px] text-gray-500 px-[3.5px] rounded-full cursor-pointer">
                i
              </span>
              <textarea
                rows={4}
                id="message"
                name="message"
                className="mt-1 resize-none border border-gray-400 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block px-3 py-2 w-full md:w-[530px]"
                placeholder="Welcome Message"
              />
            </div>

            <div className="mt-4 sm:mt-8">
              <div className="sm:w-[530px]">
                <AccDropdown
                  id="language"
                  options={[{ value: "en", label: "English" }]}
                  value="en"
                  onChange={() => {}}
                  label="Language"
                  className="mt-1 block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div className="flex gap-3 sm:gap-5 mt-4 sm:w-[530px]">
              {dropdownConfigs.map((config, index) => (
                <AccDropdown
                  key={index}
                  id={config?.id}
                  options={config?.options}
                  value={config?.value}
                  onChange={() => {}}
                  label={config?.label}
                  className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                />
              ))}
            </div>

            <div className="mt-4 sm:w-[530px]">
              <AccDropdown
                id="country"
                options={[{ value: "Pakistan", label: "Pakistan" }]}
                value="Pakistan"
                onChange={() => {}}
                label="Country"
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="sm:w-[530px] mt-7">
              <div className="flex justify-between">
                <label htmlFor="language" className="font-bold text-sm">
                  Time zone
                </label>
                <span className="text-xs">Current Time: {time}</span>
              </div>
              <AccDropdown
                id="time-zone"
                options={[
                  { value: "Pakistan", label: "Pakistan, Maldives Time" },
                ]}
                value="Pakistan"
                onChange={() => {}}
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mt-12 sm:w-[700px] flex justify-between">
              <div>
                <button
                  type="submit"
                  className="mr-2 border rounded-[40px] font-semibold text-xs text-light py-3 px-4 bg-primary hover:bg-primary/80 w-[130px]"
                >
                  {updateUserLoading ? (
                    <FaSpinner className="animate-spin h-4 w-5 mx-auto" />
                  ) : (
                    "Save Changes"
                  )}
                </button>
                <button
                  type="reset"
                  className="border border-dark rounded-[40px] font-semibold text-xs text-dark py-3 px-4 hover:text-light hover:bg-dark transition duration-100"
                >
                  Cancel
                </button>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="border rounded-[40px] text-xs font-semibold text-light py-3 w-[120px] bg-danger hover:bg-danger/80"
                >
                  {deleteUserLoading ? (
                    <FaSpinner className="animate-spin h-4 w-5 mx-auto" />
                  ) : (
                    "Delete Account"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccDetails;
