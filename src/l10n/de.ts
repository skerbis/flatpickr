/* German locals for flatpickr */
import { CustomLocale } from "../types/locale";
import { FlatpickrFn } from "../types/instance";

const fp =
  typeof window !== "undefined" && window.flatpickr !== undefined
    ? window.flatpickr
    : ({
        l10ns: {},
      } as FlatpickrFn);

export const German: CustomLocale = {
  weekdays: {
    shorthand: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    longhand: [
      "Sonntag",
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag",
    ],
  },

  months: {
    shorthand: [
      "Jan",
      "Feb",
      "Mär",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dez",
    ],
    longhand: [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ],
  },

  firstDayOfWeek: 1,
  weekAbbreviation: "KW",
  rangeSeparator: " bis ",
  scrollTitle: "Zum Ändern scrollen",
  toggleTitle: "Zum Umschalten klicken",
  yearAriaLabel: "Jahr",
  monthAriaLabel: "Monat",
  hourAriaLabel: "Stunde",
  minuteAriaLabel: "Minute",
  prevMonthAriaLabel: "Vorheriger Monat",
  nextMonthAriaLabel: "Nächster Monat",
  datePickerAriaLabel: "Datumsauswahl",
  confirmDateAriaLabel: "Datumswahl bestätigen",
  monthsAriaLabel: "Monate",
  weekdayAriaLabel: "Wochentag",
  calendarAriaLabel: "Kalender",
  gridAriaLabel: "Kalenderraster, nutzen Sie die Pfeiltasten zur Navigation",
  rangeStartAriaLabel: "Bereichsanfang",
  rangeEndAriaLabel: "Bereichsende",
  todayAriaLabel: "Heute",
  closeAriaLabel: "Datumsauswahl schließen",
  time_24hr: true,
};

fp.l10ns.de = German;

export default fp.l10ns;
