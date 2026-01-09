/* Spanish locals for flatpickr */
import { CustomLocale } from "../types/locale";
import { FlatpickrFn } from "../types/instance";

const fp =
  typeof window !== "undefined" && window.flatpickr !== undefined
    ? window.flatpickr
    : ({
        l10ns: {},
      } as FlatpickrFn);

export const Spanish: CustomLocale = {
  weekdays: {
    shorthand: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    longhand: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
  },

  months: {
    shorthand: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    longhand: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
  },

  ordinal: () => {
    return "º";
  },

  firstDayOfWeek: 1,
  rangeSeparator: " a ",
  yearAriaLabel: "Año",
  monthAriaLabel: "Mes",
  hourAriaLabel: "Hora",
  minuteAriaLabel: "Minuto",
  prevMonthAriaLabel: "Mes anterior",
  nextMonthAriaLabel: "Mes siguiente",
  datePickerAriaLabel: "Selector de fecha",
  confirmDateAriaLabel: "Confirmar selección de fecha",
  monthsAriaLabel: "Meses",
  weekdayAriaLabel: "Día de la semana",
  calendarAriaLabel: "Calendario",
  gridAriaLabel: "Cuadrícula del calendario, use las teclas de flecha para navegar",
  rangeStartAriaLabel: "Inicio del rango",
  rangeEndAriaLabel: "Fin del rango",
  todayAriaLabel: "Hoy",
  closeAriaLabel: "Cerrar selector de fecha",
  time_24hr: true,
};

fp.l10ns.es = Spanish;

export default fp.l10ns;
