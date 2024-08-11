'use client';

import { EventFormProps } from "@/types/types";
import { useEventForm } from "./useEventForm";

const EventForm: React.FC<EventFormProps> = (props) => {
    const { formValues, handleChange, handleSubmit, loading } = useEventForm(props);

    return (
        <div className="w-[95%] mx-auto">
            <h4 className="font-bold text-xl">Enter Details</h4>

            <form className="my-4" onSubmit={handleSubmit}>
                <label htmlFor="name" className="text-[14.75px] font-bold leading-[35px]">Name</label>
                <input type="text" name="name" id="name" required value={formValues.name}
                    onChange={handleChange} className="border-[1.5px] text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[75%] p-2" />

                <label htmlFor="email" className="text-[14.75px] font-bold leading-[35px]">Email</label>
                <input type="email" name="email" id="email" required value={formValues.email}
                    onChange={handleChange} className="border-[1.5px] text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[75%] p-2" />

                <label htmlFor="message" className="text-[14.75px] font-bold leading-[35px]">Please share anything that will help prepare for our meeting.</label>
                <textarea name="message" id="message" required value={formValues.message}
                    onChange={handleChange} className="border-[1.5px] text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[75%] p-2" />

                <p className="mt-8 text-sm md:w-[75%]">By proceeding, you confirm that you have read and agree to <span className="text-blue">Calendly's Terms of Use</span> and <span className="text-blue">Privacy Notice</span>.</p>

                <button type="submit" className={`bg-blue text-white text-sm rounded-full py-3 px-3.5 mt-4 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}>{loading ? 'Loading...' : 'Schedule Event'}</button>
            </form>
        </div>
    );
};

export default EventForm;
