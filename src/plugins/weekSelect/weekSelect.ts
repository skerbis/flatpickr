import { DayElement } from "../../types/instance";
import { Plugin } from "../../types/options";
import { getEventTarget } from "../../utils/dom";

export type PlusWeeks = {
  weekStartDay: Date;
  weekEndDay: Date;
};

function weekSelectPlugin(): Plugin<PlusWeeks> {
  return function (fp) {
    function onDayHover(event: MouseEvent) {
      const day = getEventTarget(event) as DayElement;
      if (!day.classList.contains("flatpickr-day")) return;

      const days = fp.days.childNodes;
      const clickedDate = day.dateObj;
      
      // Find the start of the week (Sunday) for the clicked date
      const clickedDayOfWeek = clickedDate.getDay();
      const daysToSubtract = clickedDayOfWeek;
      const weekStartDate = new Date(clickedDate);
      weekStartDate.setDate(clickedDate.getDate() - daysToSubtract);
      weekStartDate.setHours(0, 0, 0, 0);
      
      // Find the end of the week (Saturday)
      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 6);
      weekEndDate.setHours(23, 59, 59, 999);

      for (let i = days.length; i--; ) {
        const day = days[i] as DayElement;
        const date = day.dateObj;
        if (date > weekEndDate || date < weekStartDate)
          day.classList.remove("inRange");
        else day.classList.add("inRange");
      }
    }

    function highlightWeek() {
      const selDate = fp.latestSelectedDateObj;
      if (
        selDate !== undefined &&
        selDate.getMonth() === fp.currentMonth &&
        selDate.getFullYear() === fp.currentYear
      ) {
        // Find the start of the week (Sunday) for the selected date
        const selectedDayOfWeek = selDate.getDay();
        const daysToSubtract = selectedDayOfWeek;
        const weekStartDate = new Date(selDate);
        weekStartDate.setDate(selDate.getDate() - daysToSubtract);
        weekStartDate.setHours(0, 0, 0, 0);
        
        // Find the end of the week (Saturday)
        const weekEndDate = new Date(weekStartDate);
        weekEndDate.setDate(weekStartDate.getDate() + 6);
        weekEndDate.setHours(23, 59, 59, 999);
        
        fp.weekStartDay = weekStartDate;
        fp.weekEndDay = weekEndDate;
      }
      const days = fp.days.childNodes;
      for (let i = days.length; i--; ) {
        const date = (days[i] as DayElement).dateObj;
        if (date >= fp.weekStartDay && date <= fp.weekEndDay)
          (days[i] as DayElement).classList.add("week", "selected");
      }
    }

    function clearHover() {
      const days = fp.days.childNodes;
      for (let i = days.length; i--; )
        (days[i] as Element).classList.remove("inRange");
    }

    function onReady() {
      if (fp.daysContainer !== undefined)
        fp.daysContainer.addEventListener("mouseover", onDayHover);
    }

    function onDestroy() {
      if (fp.daysContainer !== undefined)
        fp.daysContainer.removeEventListener("mouseover", onDayHover);
    }

    return {
      onValueUpdate: highlightWeek,
      onMonthChange: highlightWeek,
      onYearChange: highlightWeek,
      onOpen: highlightWeek,
      onClose: clearHover,
      onParseConfig: function () {
        fp.config.mode = "single";
        fp.config.enableTime = false;
        fp.config.dateFormat = fp.config.dateFormat
          ? fp.config.dateFormat
          : "\\W\\e\\e\\k #W, Y";
        fp.config.altFormat = fp.config.altFormat
          ? fp.config.altFormat
          : "\\W\\e\\e\\k #W, Y";
      },
      onReady: [
        onReady,
        highlightWeek,
        () => {
          fp.loadedPlugins.push("weekSelect");
        },
      ],
      onDestroy,
    };
  };
}

export default weekSelectPlugin;
