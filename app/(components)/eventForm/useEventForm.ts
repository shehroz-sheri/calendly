import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { scheduleEvent } from "@/redux/slices/scheduleEventSlice";
import toast from "react-hot-toast";
import { EventFormProps } from "@/types/types";

export const useEventForm = (props: EventFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(
    (state: RootState) => state.scheduleEvent
  );

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const eventDetails = {
      attendeeDetails: {
        attendeeName: formValues?.name,
        attendeeEmail: formValues?.email,
        messageForAttendee: formValues?.message,
      },
      meetingDetails: {
        startTime: props?.eventTimeDetails?.startTime,
        endTime: props?.eventTimeDetails?.endTime,
        meetingDate: props?.eventTimeDetails?.meetingDate,
      },
    };

    const res = await dispatch(
      scheduleEvent({
        eventDetails,
      })
    );

    if (scheduleEvent.fulfilled.match(res)) {
      toast.success("Event scheduled successfully!");
      props.onEventScheduled(res?.payload?.eventDetails);
    } else if (scheduleEvent.rejected.match(res)) {
      toast.error(error || "Something went wrong! Please try again later.");
    }
  };

  return {
    formValues,
    handleChange,
    handleSubmit,
    loading,
  };
};
