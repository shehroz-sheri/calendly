import { TabValue } from "@/types/types";
import { LuUsers2 } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";
import { IoList } from "react-icons/io5";
import { RiSettings3Line } from "react-icons/ri";
import { IoMdCalendar } from "react-icons/io";
import { SignupFormField } from "@/types/types";

export const daysOfWeek = [
  { value: "sunday", label: "Sunday" },
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
];

export const dayNamesToIndices: { [key: string]: number } = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

export const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const eventFormFields = [
  {
    label: "Name",
    type: "text",
    name: "name",
    id: "name",
    required: true,
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    id: "email",
    required: true,
  },
  {
    label: "Please share anything that will help prepare for our meeting.",
    type: "textarea",
    name: "message",
    id: "message",
    required: true,
  },
] as const;

export const dashboardTabs: { name: string; value: TabValue }[] = [
  { name: "Upcoming", value: "upcoming" },
  { name: "Pending", value: "pending" },
  { name: "Past", value: "past" },
];

export const profileSidebarMenuItems = [
  { href: "/profile/edit-profile", icon: LuUsers2, label: "Profile" },
  { href: "/calendar", icon: FaRegStar, label: "Branding" },
  { href: "/calendar", icon: AiOutlineLink, label: "My Link" },
  { href: "/profile/change-password", icon: IoList, label: "Change Password" },
  { href: "/calendar", icon: RiSettings3Line, label: "Cookie settings" },
  { href: "/calendar", icon: IoMdCalendar, label: "Calendar sync" },
];

export const times = [
  "12:00 am",
  "01:00 am",
  "02:00 am",
  "03:00 am",
  "04:00 am",
  "05:00 am",
  "06:00 am",
  "07:00 am",
  "08:00 am",
  "09:00 am",
  "10:00 am",
  "11:00 am",
  "12:00 pm",
  "01:00 pm",
  "02:00 pm",
  "03:00 pm",
  "04:00 pm",
  "05:00 pm",
  "06:00 pm",
  "07:00 pm",
  "08:00 pm",
  "09:00 pm",
  "10:00 pm",
  "11:00 pm",
];

export const signupFields: SignupFormField[] = [
  {
    id: "email",
    name: "email",
    type: "email",
    value: undefined,
    placeholder: "test@example.com",
    required: true,
    label: "Email",
  },
  {
    id: "name",
    name: "name",
    type: "text",
    value: undefined,
    placeholder: "Shehroz Arshad",
    required: true,
    label: "Name",
    minLength: 3,
  },
  {
    id: "username",
    name: "username",
    type: "text",
    value: undefined,
    placeholder: "shehroz.sheri1",
    required: true,
    label: "Username",
    minLength: 4,
  },
  {
    id: "password",
    name: "password",
    type: "password",
    value: undefined,
    placeholder: "Enter password",
    required: true,
    label: "Choose a password with at least 6 characters",
    minLength: 6,
    maxLength: 9,
    showPassword: undefined,
    togglePasswordVisibility: undefined,
  },
];

export const changePassInputFields = [
  {
    id: "current-password",
    name: "currentPassword",
    label: "Current Password",
    showPasswordKey: "showCurrentPassword",
  },
  {
    id: "new-password",
    name: "newPassword",
    label: "New Password",
    showPasswordKey: "showNewPassword",
  },
];

export const resetPassFormFields = [
  {
    id: "newPassword",
    name: "newPassword",
    label: "Enter new password",
    placeholder: "Enter new password",
  },
  {
    id: "confirmPassword",
    name: "confirmPassword",
    label: "Confirm new password",
    placeholder: "Confirm new password",
  },
];

export const dropdownConfigs = [
  {
    id: "date-format",
    options: [{ value: "DD/MM/YYYY", label: "DD/MM/YYYY" }],
    value: "DD/MM/YYYY",
    label: "Date Format",
  },
  {
    id: "time-format",
    options: [{ value: "12h", label: "12h (am/pm)" }],
    value: "12h",
    label: "Time Format",
  },
];
