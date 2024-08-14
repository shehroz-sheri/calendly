import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import availabilityReducer from "../slices/availabilitySlice";
import googleLoginReducer from "../slices/googleLoginSlice";
import signupReducer from "../slices/signupSlice";
import loginReducer from "../slices/loginSlice";
import getAvailabilityReducer from "../slices/getAvailabilitySlice";
import changePasswordReducer from "../slices/changePasswordSlice";
import eventsReducer from "../slices/eventSlice";
import appointmentDetailsReducer from "../slices/appointmentDetailsSlice";
import icsDownloadReducer from "../slices/icsDownloadSlice";
import forgotPasswordReducer from "../slices/forgotPasswordSlice";
import resetPasswordReducer from "../slices/resetPasswordSlice";
import exportEventsReducer from "../slices/exportEventsSlice";
import analyticsReducer from "../slices/analyticsSlice";
import scheduleEventReducer from "../slices/scheduleEventSlice";
import fetchAvailabilityReducer from "../slices/fetchAvailabilitySlice";
import eventAvailabilityReducer from "../slices/eventAvailabilitySlice";

const rootReducer = combineReducers({
  user: userReducer,
  availability: availabilityReducer,
  signup: signupReducer,
  googleLogin: googleLoginReducer,
  login: loginReducer,
  getAvailability: getAvailabilityReducer,
  changePassword: changePasswordReducer,
  events: eventsReducer,
  appointmentDetails: appointmentDetailsReducer,
  icsDownload: icsDownloadReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  exportEvents: exportEventsReducer,
  analytics: analyticsReducer,
  scheduleEvent: scheduleEventReducer,
  fetchAvailability: fetchAvailabilityReducer,
  eventAvailability: eventAvailabilityReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
