import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  fetchAppointmentDetails,
  selectAppointmentLoading,
} from "@/redux/slices/appointmentDetailsSlice";
import {
  downloadIcsFile,
  selectIcsDownloadLoading,
} from "@/redux/slices/icsDownloadSlice";
import { AppointmentDetails } from "@/types/types";
import { parseDateTime } from "@/utils/parseMeetTime";
import toast from "react-hot-toast";

export const useAppointment = (id: string | undefined) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAppointmentLoading);
  const loadingIcsDownload = useAppSelector(selectIcsDownloadLoading);

  const [appointment, setAppointment] = useState<AppointmentDetails | null>(
    null
  );

  useEffect(() => {
    if (id) {
      const fetchEventDetails = async () => {
        const res = (await dispatch(fetchAppointmentDetails(id))) as object as {
          payload: { data: AppointmentDetails; status: number };
        };

        if (res.payload?.status === 200) {
          setAppointment(res.payload.data);
        }
      };

      fetchEventDetails();
    }
  }, [dispatch, id]);

  const handleDownloadICS = async () => {
    if (appointment) {
      const startDateTime = parseDateTime(
        appointment.meetingDate,
        appointment.meetingStartTime,
        "Asia/Karachi"
      );
      const endDateTime = parseDateTime(
        appointment.meetingDate,
        appointment.meetingEndTime,
        "Asia/Karachi"
      );
      const res = await dispatch(
        downloadIcsFile({
          title: "30 Minutes Meeting",
          description: appointment.meetingMessage || "",
          location: "Online Meeting",
          startDateTime: startDateTime,
          endDateTime: endDateTime,
          timeZone: "Asia/Karachi",
        })
      );

      if (res.meta.requestStatus === "fulfilled") {
        const blob = res.payload as Blob;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "event.ics";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        toast.error("Error downloading ICS file.");
      }
    }
  };

  const generateGoogleCalendarLink = () => {
    if (appointment) {
      const startDateTime = parseDateTime(
        appointment.meetingDate,
        appointment.meetingStartTime,
        "Asia/Karachi"
      );
      const endDateTime = parseDateTime(
        appointment.meetingDate,
        appointment.meetingEndTime,
        "Asia/Karachi"
      );

      const start = new Date(startDateTime)
        .toISOString()
        .replace(/-|:|\.\d\d\d/g, "");
      const end = new Date(endDateTime)
        .toISOString()
        .replace(/-|:|\.\d\d\d/g, "");

      const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        "30 Minutes Meeting"
      )}&dates=${start}/${end}&details=${encodeURIComponent(
        appointment?.meetingMessage || ""
      )}&location=${encodeURIComponent("Online Meeting")}&sf=true&output=xml`;

      window.open(googleCalendarUrl, "_blank");
    }
  };

  return {
    appointment,
    loading,
    loadingIcsDownload,
    handleDownloadICS,
    generateGoogleCalendarLink,
  };
};
