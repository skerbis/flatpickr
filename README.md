# Pickit

**Pickit** ist ein barrierefreier, leichtgewichtiger Datum & Zeit Picker mit vollständiger WCAG 2.1 AA Konformität.

> 🔄 **Fork von flatpickr** - Dieses Projekt baut auf der hervorragenden Grundlage von [flatpickr](https://github.com/flatpickr/flatpickr) auf und erweitert es um verbesserte Barrierefreiheit-Features. Vielen Dank an das flatpickr-Team für die großartige Arbeit!

[![npm version](https://img.shields.io/npm/v/pickit.svg)](https://www.npmjs.com/package/pickit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 📅 **Datum & Zeit Picker** mit vollständiger Barrierefreiheit
- ♿ **WCAG 2.1 AA konform** mit umfassender ARIA-Unterstützung
- 📢 **Screen Reader optimiert** mit Live-Regionen und klaren Ansagen
- ⌨️ **Vollständige Tastaturnavigation**
- 🎯 **Verbesserte Focus-Verwaltung** mit visuellen Indikatoren
- 🎨 **Reduced Motion Support** für Nutzer mit vestibulären Störungen
- 🔍 **High Contrast Mode** Unterstützung
- 🌗 **Automatischer Dark Mode** via `prefers-color-scheme`
- 🌐 **67 Sprachen** mit umfassenden ARIA-Label Übersetzungen
- 🚀 **Keine Abhängigkeiten** - komplett standalone
- 📦 **Leichtgewichtig** - nur ein Bruchteil der Größe anderer Bibliotheken

## 📦 Installation

### npm

```bash
npm install pickit
```

### CDN

```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/pickit/dist/pickit.min.css">

<!-- JavaScript -->
<script src="https://unpkg.com/pickit/dist/pickit.min.js"></script>
```

## 🚀 Schnellstart

### Datum Picker

```html
<input type="text" id="datepicker" placeholder="Datum wählen">

<script>
  pickit("#datepicker", {
    dateFormat: "d.m.Y",
    locale: "de"
  });
</script>
```

### Mit ES6 Modulen

```javascript
import pickit from "pickit";
import { German } from "pickit/dist/l10n/de.js";

pickit("#datepicker", {
  locale: German,
  dateFormat: "d.m.Y"
});
```

## 📖 Anwendungsbeispiele

### Einfacher Datum Picker

```javascript
pickit("#date", {
  dateFormat: "d.m.Y"
});
```

### Datum & Zeit Picker

```javascript
pickit("#datetime", {
  enableTime: true,
  dateFormat: "d.m.Y H:i",
  time_24hr: true
});
```

### Zeitbereich Auswahl

```javascript
pickit("#daterange", {
  mode: "range",
  dateFormat: "d.m.Y"
});
```

### Mehrfachauswahl

```javascript
pickit("#multiple", {
  mode: "multiple",
  dateFormat: "d.m.Y",
  conjunction: " / "
});
```

### Nur Zeit-Picker

```javascript
pickit("#time", {
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i",
  time_24hr: true
});
```

### Inline Kalender

```javascript
pickit("#inline", {
  inline: true,
  dateFormat: "d.m.Y"
});
```

### Mit Mindest- und Maximaldatum

```javascript
pickit("#date", {
  minDate: "today",
  maxDate: new Date().fp_incr(14), // 14 Tage ab heute
  dateFormat: "d.m.Y"
});
```

### Bestimmte Daten deaktivieren

```javascript
pickit("#date", {
  disable: [
    // Wochenenden deaktivieren
    function(date) {
      return (date.getDay() === 0 || date.getDay() === 6);
    },
    // Spezifische Daten
    "2026-01-25",
    "2026-01-26"
  ]
});
```

### Mit Bestätigungs-Button (Plugin)

```javascript
import confirmDatePlugin from "pickit/dist/plugins/confirmDate/confirmDate.js";

pickit("#date", {
  plugins: [
    confirmDatePlugin({
      confirmText: "Bestätigen",
      confirmIcon: "✓"
    })
  ]
});
```

## 🎨 Theming

Pickit bietet 2 moderne, barrierefreie Themes mit CSS-Variablen:

### Default Theme

```html
<link rel="stylesheet" href="node_modules/pickit/dist/themes/default.css">
```

Das Default Theme bietet:
- Sauberes, modernes Design
- Automatischer Dark Mode via `prefers-color-scheme`
- CSS-Variablen zur Anpassung (`--pickit-*` Prefix)

### Custom Theme

```html
<link rel="stylesheet" href="node_modules/pickit/dist/themes/custom.css">
```

Vollständig anpassbar über CSS-Variablen:

```css
.flatpickr-calendar {
  --pickit-selected-bg: #e91e63;
  --pickit-today-color: #e91e63;
  --pickit-border-radius: 12px;
}
```

Siehe [CUSTOM_THEME.md](CUSTOM_THEME.md) für die vollständige Liste der CSS-Variablen.

## 📚 API Referenz

### Initialisierung

```javascript
const instance = pickit(selector, options);
```

**Parameter:**
- `selector` (String | HTMLElement | NodeList): DOM-Element(e) für den Picker
- `options` (Object): Konfigurationsoptionen

### Kern-Optionen

| Option | Typ | Standard | Beschreibung |
|--------|-----|----------|--------------|
| `dateFormat` | String | `"Y-m-d"` | Format der Datumsanzeige |
| `defaultDate` | String\|Date\|Array | `null` | Vorbelegtes Datum |
| `mode` | String | `"single"` | Auswahlmodus: `"single"`, `"multiple"`, `"range"`, `"time"` |
| `enableTime` | Boolean | `false` | Zeit-Auswahl aktivieren |
| `noCalendar` | Boolean | `false` | Nur Zeit-Picker (Kalender ausblenden) |
| `time_24hr` | Boolean | `false` | 24-Stunden Format |
| `inline` | Boolean | `false` | Inline-Anzeige (immer sichtbar) |
| `locale` | String\|Object | `"default"` | Sprache/Lokalisierung |
| `minDate` | String\|Date | `null` | Minimal wählbares Datum |
| `maxDate` | String\|Date | `null` | Maximal wählbares Datum |
| `disable` | Array | `[]` | Zu deaktivierende Daten |
| `enable` | Array | `[]` | Nur diese Daten aktivieren (alle anderen deaktiviert) |
| `weekNumbers` | Boolean | `false` | Kalenderwochen anzeigen |

### Zeit-Optionen

| Option | Typ | Standard | Beschreibung |
|--------|-----|----------|--------------|
| `enableTime` | Boolean | `false` | Zeit-Auswahl aktivieren |
| `enableSeconds` | Boolean | `false` | Sekunden-Auswahl aktivieren |
| `time_24hr` | Boolean | `false` | 24-Stunden Format (sonst AM/PM) |
| `hourIncrement` | Number | `1` | Schrittweite für Stunden |
| `minuteIncrement` | Number | `5` | Schrittweite für Minuten |
| `defaultHour` | Number | `12` | Standard-Stunde bei leerem Input |
| `defaultMinute` | Number | `0` | Standard-Minute bei leerem Input |
| `minTime` | String\|Date | `null` | Minimal wählbare Zeit |
| `maxTime` | String\|Date | `null` | Maximal wählbare Zeit |

### Anzeige-Optionen

| Option | Typ | Standard | Beschreibung |
|--------|-----|----------|--------------|
| `inline` | Boolean | `false` | Inline-Anzeige |
| `static` | Boolean | `false` | Statische Positionierung |
| `position` | String | `"auto"` | Position: `"auto"`, `"above"`, `"below"`, `"auto center"`, etc. |
| `appendTo` | HTMLElement | `null` | Element, an das der Kalender angehängt wird |
| `showMonths` | Number | `1` | Anzahl der anzuzeigenden Monate |
| `animate` | Boolean | `true` | Animationen aktivieren |

### Input-Optionen

| Option | Typ | Standard | Beschreibung |
|--------|-----|----------|--------------|
| `allowInput` | Boolean | `false` | Direkte Texteingabe erlauben |
| `clickOpens` | Boolean | `true` | Öffnen beim Klick auf Input |
| `closeOnSelect` | Boolean | `true` | Schließen nach Auswahl |
| `wrap` | Boolean | `false` | Wrapper-Modus für externe Trigger-Elemente |
| `altInput` | Boolean | `false` | Alternative Input-Anzeige für bessere Lesbarkeit |
| `altFormat` | String | `"F j, Y"` | Format für alternativen Input |

### Lokalisierung

| Option | Typ | Standard | Beschreibung |
|--------|-----|----------|--------------|
| `locale` | String\|Object | `"default"` | Sprache (z.B. `"de"`, `"fr"`, `"es"`) |
| `ariaDateFormat` | String | `"F j, Y"` | Format für ARIA-Labels |

### Event Hooks

| Hook | Parameter | Beschreibung |
|------|-----------|--------------|
| `onChange` | `(selectedDates, dateStr, instance)` | Wird bei Datums-Änderung aufgerufen |
| `onOpen` | `(selectedDates, dateStr, instance)` | Wird beim Öffnen des Kalenders aufgerufen |
| `onClose` | `(selectedDates, dateStr, instance)` | Wird beim Schließen aufgerufen |
| `onReady` | `(selectedDates, dateStr, instance)` | Wird nach Initialisierung aufgerufen |
| `onMonthChange` | `(selectedDates, dateStr, instance)` | Wird bei Monatswechsel aufgerufen |
| `onYearChange` | `(selectedDates, dateStr, instance)` | Wird bei Jahreswechsel aufgerufen |
| `onValueUpdate` | `(selectedDates, dateStr, instance)` | Wird bei jeder Wert-Aktualisierung aufgerufen |

### Beispiel mit Hooks

```javascript
pickit("#date", {
  onChange: function(selectedDates, dateStr, instance) {
    console.log("Neues Datum:", dateStr);
  },
  onOpen: function(selectedDates, dateStr, instance) {
    console.log("Kalender geöffnet");
  },
  onClose: function(selectedDates, dateStr, instance) {
    console.log("Kalender geschlossen");
  }
});
```

### Instanz-Methoden

Nach der Initialisierung stehen folgende Methoden zur Verfügung:

```javascript
const picker = pickit("#date");

// Datum setzen
picker.setDate("2026-01-15");
picker.setDate(new Date());
picker.setDate(["2026-01-15", "2026-01-20"]); // Bei mode: "range"

// Datum leeren
picker.clear();

// Kalender öffnen/schließen
picker.open();
picker.close();

// Kalender umschalten
picker.toggle();

// Monat/Jahr ändern
picker.changeMonth(1);  // Einen Monat vorwärts
picker.changeMonth(-2); // Zwei Monate zurück
picker.changeYear(2027);

// Aktuelle Auswahl abrufen
const selectedDates = picker.selectedDates;
const dateString = picker.input.value;

// Picker zerstören
picker.destroy();

// Neu initialisieren mit neuen Optionen
picker.set("minDate", "2026-02-01");
picker.set("maxDate", "2026-12-31");
```

## 🔌 Plugins

Pickit unterstützt mehrere Plugins zur Funktionserweiterung:

### Confirm Date Plugin

Fügt einen Bestätigungs-Button hinzu:

```javascript
import confirmDatePlugin from "pickit/dist/plugins/confirmDate/confirmDate.js";

pickit("#date", {
  plugins: [
    confirmDatePlugin({
      confirmText: "OK",
      showAlways: false,
      theme: "light"
    })
  ]
});
```

### Month Select Plugin

Monatswähler im Dropdown-Format:

```javascript
import monthSelectPlugin from "pickit/dist/plugins/monthSelect/index.js";

pickit("#date", {
  plugins: [monthSelectPlugin({
    shorthand: true,
    dateFormat: "F Y"
  })]
});
```

### Week Select Plugin

Ermöglicht die Auswahl ganzer Wochen:

```javascript
import weekSelectPlugin from "pickit/dist/plugins/weekSelect/weekSelect.js";

pickit("#date", {
  plugins: [weekSelectPlugin({})]
});
```

### Range Plugin

Erweiterte Bereichsauswahl:

```javascript
import rangePlugin from "pickit/dist/plugins/rangePlugin.js";

pickit("#date", {
  mode: "range",
  plugins: [rangePlugin({ input: "#endDate" })]
});
```

## 🌐 Internationalisierung

Pickit unterstützt 67 Sprachen. Verfügbare Lokalisierungen:

`ar`, `ar-dz`, `at`, `az`, `be`, `bg`, `bn`, `bs`, `cat`, `ckb`, `cs`, `cy`, `da`, `de`, `default`, `en`, `eo`, `es`, `et`, `fa`, `fi`, `fo`, `fr`, `ga`, `gr`, `he`, `hi`, `hr`, `hu`, `id`, `index.d`, `is`, `it`, `ja`, `ka`, `km`, `ko`, `kz`, `lt`, `lv`, `mk`, `mn`, `ms`, `my`, `nl`, `nn`, `no`, `pa`, `pl`, `pt`, `ro`, `ru`, `si`, `sk`, `sl`, `sq`, `sr-cyr`, `sr`, `sv`, `th`, `tr`, `uk`, `uz-latn`, `uz`, `vn`, `zh-tw`, `zh`

### Verwendung

```javascript
import pickit from "pickit";
import { German } from "pickit/dist/l10n/de.js";

pickit("#date", {
  locale: German
});
```

### Eigene Lokalisierung

```javascript
pickit("#date", {
  locale: {
    firstDayOfWeek: 1, // Montag
    weekdays: {
      shorthand: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
      longhand: [
        "Sonntag", "Montag", "Dienstag", "Mittwoch",
        "Donnerstag", "Freitag", "Samstag"
      ]
    },
    months: {
      shorthand: [
        "Jan", "Feb", "Mär", "Apr", "Mai", "Jun",
        "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"
      ],
      longhand: [
        "Januar", "Februar", "März", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Dezember"
      ]
    },
    rangeSeparator: " bis ",
    weekAbbreviation: "KW",
    scrollTitle: "Scrollen zum Ändern",
    toggleTitle: "Zum Umschalten klicken"
  }
});
```

## ♿ Barrierefreiheit

Pickit legt großen Wert auf Barrierefreiheit:

### Tastaturnavigation (Datum Picker)

- **Tab / Shift+Tab**: Navigation zwischen Elementen
- **Pfeiltasten**: Navigation zwischen Tagen
- **Enter / Space**: Datum auswählen
- **Escape**: Kalender schließen
- **Page Up / Page Down**: Monat wechseln
- **Shift + Page Up / Page Down**: Jahr wechseln
- **Home / End**: Zum ersten/letzten Tag des Monats springen
- **t**: Zu "Heute" springen (wenn aktiviert)

### Screen Reader Unterstützung

- Vollständige ARIA-Labels für alle interaktiven Elemente
- Live-Regionen für dynamische Änderungen
- Klare Ansagen bei Monats-/Jahreswechsel
- Lokalisierte ARIA-Labels in 67 Sprachen

### Visuelle Barrierefreiheit

- Hohe Kontrastverhältnisse (WCAG AA konform)
- Klare Focus-Indikatoren
- Unterstützung für `prefers-reduced-motion`
- Unterstützung für `prefers-contrast: high`
- Automatischer Dark Mode

## 🔧 Datumsformatierung

Pickit verwendet eine flexible Formatierungssyntax:

| Token | Ausgabe | Beispiel |
|-------|---------|----------|
| `d` | Tag mit führender Null | 01 bis 31 |
| `D` | Wochentagskürzel | Mo |
| `j` | Tag ohne führende Null | 1 bis 31 |
| `l` | Wochentag ausgeschrieben | Montag |
| `w` | Wochentag als Zahl | 0 (Sonntag) bis 6 |
| `W` | ISO-8601 Kalenderwoche | 1 bis 53 |
| `F` | Monat ausgeschrieben | Januar |
| `m` | Monat mit führender Null | 01 bis 12 |
| `M` | Monatskürzel | Jan |
| `n` | Monat ohne führende Null | 1 bis 12 |
| `Y` | Vierstelliges Jahr | 2026 |
| `y` | Zweistelliges Jahr | 26 |
| `H` | Stunde (24h) mit führender Null | 00 bis 23 |
| `h` | Stunde (12h) mit führender Null | 01 bis 12 |
| `G` | Stunde (24h) ohne führende Null | 0 bis 23 |
| `i` | Minute mit führender Null | 00 bis 59 |
| `S` | Sekunde mit führender Null | 00 bis 59 |
| `K` | AM/PM | AM oder PM |

### Beispiele

```javascript
// Deutsches Format: 15.01.2026
dateFormat: "d.m.Y"

// ISO Format: 2026-01-15
dateFormat: "Y-m-d"

// Ausgeschrieben: Mittwoch, 15. Januar 2026
dateFormat: "l, d. F Y"

// Mit Zeit: 15.01.2026 14:30
dateFormat: "d.m.Y H:i"

// US Format: 01/15/2026 2:30 PM
dateFormat: "m/d/Y h:i K"
```

## 🌐 Browser-Unterstützung

- Chrome / Edge (Chromium): Letzte 2 Versionen
- Firefox: Letzte 2 Versionen
- Safari: 12+
- iOS Safari: 12+
- Android Chrome: Letzte 2 Versionen

## 📄 Lizenz

MIT License

Copyright © 2026 - Pickit (Fork von flatpickr)  
Original flatpickr: Copyright © 2023 Gregory

## 🙏 Danksagung

Pickit ist ein Fork von [flatpickr](https://github.com/flatpickr/flatpickr) von Gregory. Vielen Dank für die hervorragende Grundlage!

## 🔗 Links

- [GitHub Repository](https://github.com/skerbis/pickit)
- [npm Package](https://www.npmjs.com/package/pickit-color?activeTab=readme)
- [Custom Theme Dokumentation](CUSTOM_THEME.md)
- [Build-Anleitung](BUILD.md)
