(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.weekSelect = factory());
}(this, (function () { 'use strict';

  function getEventTarget(event) {
      try {
          if (typeof event.composedPath === "function") {
              var path = event.composedPath();
              return path[0];
          }
          return event.target;
      }
      catch (error) {
          return event.target;
      }
  }

  function weekSelectPlugin() {
      return function (fp) {
          function onDayHover(event) {
              var day = getEventTarget(event);
              if (!day.classList.contains("flatpickr-day"))
                  return;
              var days = fp.days.childNodes;
              var clickedDate = day.dateObj;
              // Find the start of the week (Sunday) for the clicked date
              var clickedDayOfWeek = clickedDate.getDay();
              var daysToSubtract = clickedDayOfWeek;
              var weekStartDate = new Date(clickedDate);
              weekStartDate.setDate(clickedDate.getDate() - daysToSubtract);
              weekStartDate.setHours(0, 0, 0, 0);
              // Find the end of the week (Saturday)
              var weekEndDate = new Date(weekStartDate);
              weekEndDate.setDate(weekStartDate.getDate() + 6);
              weekEndDate.setHours(23, 59, 59, 999);
              for (var i = days.length; i--;) {
                  var day_1 = days[i];
                  var date = day_1.dateObj;
                  if (date > weekEndDate || date < weekStartDate)
                      day_1.classList.remove("inRange");
                  else
                      day_1.classList.add("inRange");
              }
          }
          function highlightWeek() {
              var selDate = fp.latestSelectedDateObj;
              if (selDate !== undefined &&
                  selDate.getMonth() === fp.currentMonth &&
                  selDate.getFullYear() === fp.currentYear) {
                  // Find the start of the week (Sunday) for the selected date
                  var selectedDayOfWeek = selDate.getDay();
                  var daysToSubtract = selectedDayOfWeek;
                  var weekStartDate = new Date(selDate);
                  weekStartDate.setDate(selDate.getDate() - daysToSubtract);
                  weekStartDate.setHours(0, 0, 0, 0);
                  // Find the end of the week (Saturday)
                  var weekEndDate = new Date(weekStartDate);
                  weekEndDate.setDate(weekStartDate.getDate() + 6);
                  weekEndDate.setHours(23, 59, 59, 999);
                  fp.weekStartDay = weekStartDate;
                  fp.weekEndDay = weekEndDate;
              }
              var days = fp.days.childNodes;
              for (var i = days.length; i--;) {
                  var date = days[i].dateObj;
                  if (date >= fp.weekStartDay && date <= fp.weekEndDay)
                      days[i].classList.add("week", "selected");
              }
          }
          function clearHover() {
              var days = fp.days.childNodes;
              for (var i = days.length; i--;)
                  days[i].classList.remove("inRange");
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
                  function () {
                      fp.loadedPlugins.push("weekSelect");
                  },
              ],
              onDestroy: onDestroy,
          };
      };
  }

  return weekSelectPlugin;

})));
