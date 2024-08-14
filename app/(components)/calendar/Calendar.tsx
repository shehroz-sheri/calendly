'use client';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { addMonths, subMonths, format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, getDay, isBefore } from 'date-fns';
import { CalendarProps } from "@/types/types";
import { useCalendar } from "./useCalendar";
import { dayNames, dayNamesToIndices } from "@/constants/Constants";


const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const { availableDays, currentMonth, selectedDate, setCurrentMonth, setSelectedDate } = useCalendar();

  const handleDateClick = (date: Date) => {
    const dayIndex = getDay(date);
    const isAvailableDay = availableDays?.some(d => dayNamesToIndices[d?.toLowerCase()] === dayIndex);

    if ((!isBefore(date, new Date()) || isSameDay(date, new Date())) && isAvailableDay) {
      setSelectedDate(date);
      onDateSelect(date);
    }
  };

  const renderHeader = () => {
    const isPrevDisabled = isSameMonth(currentMonth, new Date()) || currentMonth < new Date();

    return (
      <div className="flex justify-between items-center mb-4 w-2/3 mx-auto">
        <button onClick={prevMonth} disabled={isPrevDisabled} className={`w-[38px] h-[38px] ${isPrevDisabled ? "opacity-50 cursor-not-allowed" : "bg-primary/10 rounded-full"}`}>
          <MdKeyboardArrowLeft className={`${isPrevDisabled ? '' : 'text-primary'} mx-auto`} />
        </button>
        <span className="text-[14.88px]">{format(currentMonth, 'MMMM yyyy')}</span>
        <button className="bg-primary/10 rounded-full w-[38px] h-[38px]" onClick={nextMonth}><MdKeyboardArrowRight className="text-primary mx-auto" /></button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(
        <th key={i} className="text-[11.63px] font-normal pb-4">
          {dayNames[i]}
        </th>
      );
    }

    return <tr>{days}</tr>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        const dayIndex = getDay(day);
        const isAvailableDay = availableDays?.some(d => dayNamesToIndices[d?.toLowerCase()] === dayIndex);

        days.push(
          <td key={day.toString()} className="text-center py-2" onClick={() => handleDateClick(cloneDay)}>
            <span
              className={`flex items-center justify-center w-[38px] pt-1 pb-2.5 cursor-pointer ${!isSameMonth(day, monthStart)
                ? "invisible"
                : selectedDate && isSameDay(day, selectedDate)
                  ? "bg-primary text-white rounded-full font-semibold border-b border-white"
                  : isAvailableDay && (!isBefore(day, new Date()) || isSameDay(day, new Date()))
                    ? "bg-primary/10 rounded-full font-semibold text-primary"
                    : "text-gray-500 text-[14.13px]"
                }`}
            >
              {formattedDate}
            </span>
          </td>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <tr key={day.toString()} className="my-4 py-2">
          {days}
        </tr>
      );
      days = [];
    }
    return <tbody>{rows}</tbody>;
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    if (!isSameMonth(currentMonth, new Date()) && currentMonth > new Date()) {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8 py-4 px-1 md:px-4">
      {renderHeader()}
      <table className="w-[372px] mt-6">
        <thead>{renderDays()}</thead>
        {renderCells()}
      </table>
    </div>
  );
};

export default Calendar;
