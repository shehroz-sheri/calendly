export type LoginUser = {
  email: string;
  password: string;
};

export type SignupUser = {
  email: string;
  name: string;
  username: string;
  password: string;
};

export type AppointmentDetails = {
  eventId: string;
  hostName: string;
  hostEmail: string;
  inviteeName: string;
  inviteeEmail: string;
  meetingDate: string;
  meetingStartTime: string;
  meetingEndTime: string;
  meetingMessage?: string;
  googleMeetUrl?: string;
};

type AppointmentDetailItemProps = {
  icon: ReactNode;
  title: string;
  content: string;
  iconBgColor: string;
};

type AvailabilityState = {
  availableDays: string[];
  loading: boolean;
  error: string | null;
};

export type TimeDropdownProps = {
  id: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  filteredTimes?: string[];
};

export type CalendarProps = {
  onDateSelect: (date: Date) => void;
};

export type EventType = {
  attendeeName: string;
  eventId: string;
};

export type EventFormProps = {
  onEventScheduled: (eventDetails?: EventType) => void;
  eventTimeDetails: {
    endTime: string | null;
    meetingDate: string | null;
    startTime: string | null;
  } | null;
};

export type EventHeaderProps = {
  eventLink: string | undefined;
};

export type EventSuccessProps = {
  eventDetails: {
    endTime: string | null;
    meetingDate: string | null;
    startTime: string | null;
    attendeeName: string | null | undefined;
  } | null;
};

export type FormInputFieldProps = {
  id: string;
  name: string;
  type: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  showPassword?: boolean;
  togglePasswordVisibility?: () => void;
  className?: string;
};

export type LogoProps = {
  width: number;
  className?: string;
};

export type UserData = {
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
};

export type SidebarProps = {
  isCollapsed: (status: boolean) => void;
};

export type VisitStats = {
  visitCount: number;
  peakHours: { [key: string]: number };
};

export type EventDetails = {
  title: string;
  description: string;
  location: string;
  startDateTime: string;
  endDateTime: string;
  timeZone: string;
};

export type EventInfo = {
  attendeeDetails: {
    attendeeName: string;
    attendeeEmail: string;
    messageForAttendee: string;
  };
  meetingDetails: {
    startTime: string | null | undefined;
    endTime: string | null | undefined;
    meetingDate: string | null | undefined;
  };
};

export type Event = {
  id: string;
  hostId: string;
  meetingStartTime: string;
  meetingEndTime: string;
  attendeeName: string;
  meetingDate: string;
  googleMeetUrl?: string;
  messageForAttendee?: string;
  startDateTime?: string;
  endDateTime?: string;
};

export type EventDetailsICS = {
  title: string;
  description: string;
  location: string;
  startDateTime: string;
  endDateTime: string;
};

export type TabValue = "upcoming" | "pending" | "past";

export type AnalyticsState = {
  visitData: { [key: string]: number };
  peakHoursData: { [key: string]: number };
  loading: boolean;
  error: string | null;
};

export type AppointmentDetailsState = {
  appointment: AppointmentDetails | null;
  loading: boolean;
  error: string | null;
  status: number | null;
};

export type AvailabilitySliceState = {
  response: {
    status: number | null;
    message: string | null;
  };
  loading: boolean;
  error: string | null;
};

export type SetAvailabilityPayload = {
  availability: object;
};

export type ChangePasswordState = {
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  status: number | null;
};

type Event = {
  id: string;
  attendeeName: string;
  meetingDate: string;
  meetingStartTime: string;
  meetingEndTime: string;
  messageForAttendee?: string;
};

export type EventsState = {
  events: Event[];
  loading: boolean;
  error: string | null;
};

export type ExportEventsState = {
  loading: boolean;
  error: string | null;
  blob: Blob | null;
};

type Availability = {
  timeFrom: string | null;
  timeTo: string | null;
};

export type FetchAvailabilityState = {
  availability: Availability | null;
  loading: boolean;
  error: string | null;
};

export type ForgotPasswordState = {
  loading: boolean;
  error: string | null;
};

export type GetAvailabilityState = {
  response: {
    availability: boolean | null;
    status: number | null;
  };
  loading: boolean;
  error: string | null;
};

export type GoogleLoginState = {
  loading: boolean;
  error: string | null;
  loginSuccess: boolean;
};

export type IcsDownloadState = {
  loading: boolean;
  error: string | null;
};

export type LoginState = {
  loading: boolean;
  error: string | null;
  loginSuccess: boolean;
};

export type ResetPasswordState = {
  loading: boolean;
  error: string | null;
};

export type ScheduleEventState = {
  loading: boolean;
  success: boolean | null;
  error: string | null;
};

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

export type SessionState = {
  user: SessionUser | null;
  isAuthenticated: boolean;
};

export type SignupState = {
  response: {
    status: number | null;
    message: string | null;
  };
  signupLoading: boolean;
  error: string | null;
};

export type UserState = {
  response: {
    status: number | null;
    message: string | null;
  };
  updateUserLoading: boolean;
  deleteUserLoading: boolean;
  error: string | null;
};

export type UpdateUserPayload = {
  data: string;
};
