/* French locals for flatpickr */
import { CustomLocale } from "../types/locale";
import { FlatpickrFn } from "../types/instance";

const fp =
  typeof window !== "undefined" && window.flatpickr !== undefined
    ? window.flatpickr
    : ({
        l10ns: {},
      } as FlatpickrFn);

export const French: CustomLocale = {
  firstDayOfWeek: 1,

  weekdays: {
    shorthand: ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"],
    longhand: [
      "dimanche",
      "lundi",
      "mardi",
      "mercredi",
      "jeudi",
      "vendredi",
      "samedi",
    ],
  },

  months: {
    shorthand: [
      "janv",
      "févr",
      "mars",
      "avr",
      "mai",
      "juin",
      "juil",
      "août",
      "sept",
      "oct",
      "nov",
      "déc",
    ],
    longhand: [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ],
  },

  ordinal: (nth) => {
    if (nth > 1) return "";

    return "er";
  },
  rangeSeparator: " au ",
  weekAbbreviation: "Sem",
  scrollTitle: "Défiler pour augmenter la valeur",
  toggleTitle: "Cliquer pour basculer",
  yearAriaLabel: "Année",
  monthAriaLabel: "Mois",
  hourAriaLabel: "Heure",
  minuteAriaLabel: "Minute",
  prevMonthAriaLabel: "Mois précédent",
  nextMonthAriaLabel: "Mois suivant",
  datePickerAriaLabel: "Sélecteur de date",
  confirmDateAriaLabel: "Confirmer la sélection de date",
  monthsAriaLabel: "Mois",
  weekdayAriaLabel: "Jour de la semaine",
  calendarAriaLabel: "Calendrier",
  gridAriaLabel: "Grille du calendrier, utilisez les touches fléchées pour naviguer",
  rangeStartAriaLabel: "Début de la plage",
  rangeEndAriaLabel: "Fin de la plage",
  todayAriaLabel: "Aujourd'hui",
  closeAriaLabel: "Fermer le sélecteur de date",
  time_24hr: true,
};

fp.l10ns.fr = French;

export default fp.l10ns;
