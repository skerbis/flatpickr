import { Locale } from "../types/locale";

export const english: Locale = {
  weekdays: {
    shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    longhand: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  },
  months: {
    shorthand: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    longhand: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
  daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  firstDayOfWeek: 0,
  ordinal: (nth: number) => {
    const s = nth % 100;
    if (s > 3 && s < 21) return "th";
    switch (s % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  },
  rangeSeparator: " to ",
  weekAbbreviation: "Wk",
  scrollTitle: "Scroll to increment",
  toggleTitle: "Click to toggle",
  amPM: ["AM", "PM"],
  yearAriaLabel: "Year",
  monthAriaLabel: "Month",
  hourAriaLabel: "Hour",
  minuteAriaLabel: "Minute",
  prevMonthAriaLabel: "Previous month",
  nextMonthAriaLabel: "Next month",
  datePickerAriaLabel: "Date picker",
  confirmDateAriaLabel: "Confirm date selection",
  monthsAriaLabel: "Months",
  weekdayAriaLabel: "Day of week",
  calendarAriaLabel: "Calendar",
  gridAriaLabel: "Calendar grid, use arrow keys to navigate",
  rangeStartAriaLabel: "Range start",
  rangeEndAriaLabel: "Range end",
  todayAriaLabel: "Today",
  closeAriaLabel: "Close date picker",
  time_24hr: false,
};

export default english;
