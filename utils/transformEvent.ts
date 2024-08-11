import { Event } from '@/types/types';
import { parseDateTime } from './parseMeetTime';

export const transformEvent = (event: Event): any => {
  const { meetingDate, meetingStartTime, meetingEndTime, messageForAttendee } = event;

  const title = 'Meeting with ' + event.attendeeName;
  const description = messageForAttendee || 'No additional information provided.';
  const location = 'Online Meeting';

  const timeZone = 'Asia/Karachi';
  const startDateTime = parseDateTime(meetingDate, meetingStartTime, timeZone);
  const endDateTime = parseDateTime(meetingDate, meetingEndTime, timeZone);

  return {
    title,
    description,
    location,
    startDateTime,
    endDateTime,
    timeZone
  };
};
