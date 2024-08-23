"use client";

import { EventFormProps } from "@/types/types";
import { useEventForm } from "./useEventForm";
import { eventFormFields } from "@/constants/Constants";

const EventForm: React.FC<EventFormProps> = (props) => {
  const { formValues, handleChange, handleSubmit, loading } =
    useEventForm(props);

  return (
    <div className="w-[95%] mx-auto">
      <h4 className="font-bold text-xl">Enter Details</h4>

      <form className="my-4" onSubmit={handleSubmit}>
        {eventFormFields?.map(({ label, type, name, id, required }) => (
          <div key={name}>
            <label
              htmlFor={id}
              className="text-[14.75px] font-bold leading-[35px]"
            >
              {label}
            </label>
            {type === "textarea" ? (
              <textarea
                name={name}
                id={id}
                required={required}
                value={formValues?.[name]}
                onChange={handleChange}
                className="border-[1.5px] text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[75%] p-2"
              />
            ) : (
              <input
                type={type}
                name={name}
                id={id}
                required={required}
                value={formValues?.[name]}
                onChange={handleChange}
                className="border-[1.5px] text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[75%] p-2"
              />
            )}
          </div>
        ))}

        <p className="mt-8 text-sm md:w-[75%]">
          By proceeding, you confirm that you have read and agree to{" "}
          <span className="text-blue">Calendly's Terms of Use</span> and{" "}
          <span className="text-blue">Privacy Notice</span>.
        </p>

        <button
          type="submit"
          className={`bg-blue text-white text-sm rounded-full py-3 px-3.5 mt-4 ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {loading ? "Loading..." : "Schedule Event"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
