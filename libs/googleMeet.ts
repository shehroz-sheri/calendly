import { google } from "googleapis";
import { parseDateTime } from "@/utils/parseMeetTime";

const oauth2Client = new google.auth.OAuth2(
  process.env.AUTH_GOOGLE_ID,
  process.env.AUTH_GOOGLE_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

interface EventDetails {
  meetingDetails: {
    meetingDate: string;
    startTime: string;
    endTime: string;
  };
  attendeeDetails: {
    attendeeName: string;
  };
}

export const googleMeet = async (
  eventDetails: EventDetails,
  refreshToken: string
) => {
  try {
    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const startDateTime = parseDateTime(
      eventDetails.meetingDetails.meetingDate,
      eventDetails.meetingDetails.startTime,
      "Asia/Karachi"
    );
    const endDateTime = parseDateTime(
      eventDetails.meetingDetails.meetingDate,
      eventDetails.meetingDetails.endTime,
      "Asia/Karachi"
    );

    const event = {
      summary: "Appointment with " + eventDetails.attendeeDetails.attendeeName,
      location: "Online Meeting",
      description: "30 Minutes Meeting",
      start: {
        dateTime: startDateTime,
        timeZone: "Asia/Karachi",
      },
      end: {
        dateTime: endDateTime,
        timeZone: "Asia/Karachi",
      },
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
    };

    const res = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: "primary",
      requestBody: event,
      conferenceDataVersion: 1,
    });

    const googleMeetUrl = res.data.hangoutLink;

    return googleMeetUrl;
  } catch (error) {
    return null;
  }
};
