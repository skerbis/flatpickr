# Pickit - Accessible Picker Collection

**Pickit** is an accessibility-enhanced fork of [flatpickr](https://github.com/flatpickr/flatpickr) expanded into a comprehensive picker collection with full WCAG 2.1 AA compliance.

> 🔄 **Forked from flatpickr** - This project builds upon the excellent foundation of flatpickr, adding enhanced accessibility features and new picker types while maintaining full compatibility.

## Why Pickit?

Pickit is more than just a date picker - it's a complete accessible picker collection:

- 📅 **Date & Time Picker** - Enhanced version of flatpickr with full accessibility
- 🎨 **Color Picker** - Accessible color selection with keyboard navigation
- ✅ **WCAG 2.1 AA compliant** with comprehensive ARIA support
- ♿ **Screen reader optimized** with live regions and proper announcements
- ⌨️ **Full keyboard navigation** for all picker types
- 🎯 **Improved focus management** and visual indicators
- 🎨 **Reduced motion support** for users with vestibular disorders
- 🔍 **High contrast mode** support
- 🌐 **51+ locales** with comprehensive ARIA label translations

## Quick Start

### Installation

```bash
npm install pickit
```

### Date Picker Usage

```html
<!-- Include CSS -->
<link rel="stylesheet" href="node_modules/pickit/dist/pickit.css">

<!-- Your input -->
<input type="text" id="datepicker" placeholder="Select Date">

<!-- Include JS -->
<script src="node_modules/pickit/dist/pickit.js"></script>
<script>
  // Initialize
  pickit("#datepicker");
</script>
```

### Color Picker Usage

```html
<!-- Include CSS -->
<link rel="stylesheet" href="node_modules/pickit/dist/pickit.css">
<link rel="stylesheet" href="node_modules/pickit/dist/plugins/colorPicker/colorPicker.css">

<!-- Your input -->
<input type="text" id="colorpicker" placeholder="#4ECDC4">

<!-- Include JS -->
<script src="node_modules/pickit/dist/pickit.js"></script>
<script src="node_modules/pickit/dist/plugins/colorPicker/colorPicker.js"></script>
<script>
  // Initialize color picker
  pickit("#colorpicker", {
    plugins: [colorPicker({
      format: 'hex',
      showAlpha: false,
      presetColors: ['#FF6B6B', '#4ECDC4', '#45B7D1']
    })]
  });
</script>
```

### ES6 Module

```javascript
import pickit from "pickit";
import colorPicker from "pickit/dist/plugins/colorPicker/colorPicker.js";

// Date picker
pickit("#datepicker", {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
});

// Color picker
pickit("#colorpicker", {
  plugins: [colorPicker()]
});
```

### With Locale

```javascript
import pickit from "pickit";
import { German } from "pickit/dist/l10n/de.js";

pickit("#datepicker", {
  locale: German
});
```

## Enhanced Accessibility Features (New in Pickit)

### Date & Time Picker

### 1. **ARIA Grid Structure**
- Proper `role="grid"` for calendar layout
- `role="gridcell"` for individual date cells
- `role="row"` for week rows

### 2. **Dynamic State Announcements**
- Live regions for month/year changes
- Selected date announcements
- Range selection feedback

### 3. **Extended Keyboard Navigation**
- `Home/End` - Jump to first/last day of month
- `Page Up/Down` - Navigate months
- `Shift + Page Up/Down` - Navigate years
- `Tab/Shift+Tab` - Logical focus order
- `t` - Jump to today (when enabled)

### 4. **Enhanced ARIA Attributes**
- `aria-expanded` on calendar container
- `aria-selected` on selected dates
- `aria-disabled` on disabled dates
- `aria-live` regions for dynamic updates

### 5. **Accessibility Preferences**
- Respects `prefers-reduced-motion`
- High contrast mode support
- Focus trap in modal mode

### Color Picker

### 1. **HSL Color Space**
- Intuitive hue, saturation, and lightness controls
- Optional alpha channel for transparency
- Real-time color preview

### 2. **Keyboard Navigation**
- Arrow keys for saturation/lightness box navigation
- Left/Right arrows for hue slider
- Tab navigation between all controls
- Enter to select preset colors

### 3. **ARIA Support**
- `role="slider"` for hue and alpha controls
- `aria-valuenow` for current values
- Live region announcements for color changes
- Proper labeling for all interactive elements

### 4. **Features**
- Hex color input with validation
- Preset color palette (customizable)
- Format options: HEX, RGB, HSL
- Visual preview of selected color
- Drag support for saturation box

## Motivation

Almost every large SPA or project involves date, time, and color input. Browser's native implementations of those are inconsistent and limited in functionality. Most other libraries require you to pull in heavy dependencies like jQuery, Bootstrap, and moment.js. Additionally, many pickers lack proper accessibility support.

Pickit aims to be:
- ✨ **Beautiful** out of the box
- 🚀 **Dependency-free** (no bloated bundles)
- ♿ **Fully accessible** (WCAG 2.1 AA+)
- 💪 **Powerful** and extensible
- 📦 **Lightweight** (fraction of the size of other libraries)
- 🎨 **Multi-purpose** (dates, times, and colors)

## Feature Overview

- Dependency-free (no bloated bundles)
- Simple, polished UX
- **Date + time picker** with full accessibility
- **Color picker** with keyboard navigation
- Range selections
- Ability to select multiple dates
- Can be used as just a time picker
- Display dates in a human-friendly format
- Easily disable specific dates, date ranges, or any date using arbitrary logic
- Week numbers
- 51 locales
- 10 beautiful themes (incl. dark, material, UIKit, and glassmorphism)
- Numerous plugins
- Libraries available for React, Angular, Vue, Ember, and more

![Pickit Date Picker](https://user-images.githubusercontent.com/11352152/36033089-f37dc1d0-0d7d-11e8-8ec4-c7a56d1ff92e.png)

## Documentation & Demos

Full documentation: https://flatpickr.js.org (flatpickr docs - Pickit maintains API compatibility)

## Compatibility

IE9 and up, Edge, iOS Safari 6+, Chrome 8+, Firefox 6+

### Browser-Specific Enhancements

Pickit includes specific fixes and optimizations for various browsers:

- **Safari**: Enhanced select dropdown rendering with proper padding and appearance fixes
- **Cross-browser**: Consistent styling across all modern browsers with vendor prefixes
- **Mobile**: Touch-optimized interactions for iOS and Android

## Legacy Accessibility (from flatpickr)

flatpickr was already designed with accessibility in mind. Pickit builds upon this foundation:

### ARIA Attributes

All interactive elements include proper ARIA roles and labels:

- **Calendar container**: `role="dialog"` with localized `aria-label`
- **Navigation buttons**: `role="button"` with localized previous/next month labels
- **Date cells**: Individual `aria-label` for each day with formatted date
- **Form inputs**: Year, month, hour, and minute inputs with descriptive labels
- **Plugins**: confirmDate and monthSelect plugins include full ARIA support

### Keyboard Navigation

- **Tab**: Navigate between interactive elements
- **Enter/Space**: Activate buttons and select dates
- **Arrow Keys**: Navigate between days in the calendar
- **Ctrl + Arrow Left/Right**: Change month
- **Ctrl + Arrow Up/Down**: Change year
- **Escape**: Close the calendar

### Localized ARIA Labels

All ARIA labels are fully localizable. Complete translations available in:

- **English** (default)
- **German** (Deutsch)
- **French** (Français)
- **Spanish** (Español)
- **Italian** (Italiano)
- **Dutch** (Nederlands)
- **Portuguese** (Português)
- **Russian** (Русский)
- **Japanese** (日本語)
- **Chinese** (中文)
- ...and 41+ other languages ready to be extended

**English:**
- Date picker: "Date picker"
- Previous month: "Previous month"
- Next month: "Next month"
- Confirm: "Confirm date selection"
- Year: "Year"
- Month: "Month"

**German:**
- Date picker: "Datumsauswahl"
- Previous month: "Vorheriger Monat"
- Next month: "Nächster Monat"
- Confirm: "Datumswahl bestätigen"
- Year: "Jahr"
- Month: "Monat"

**French:**
- Date picker: "Sélecteur de date"
- Previous month: "Mois précédent"
- Next month: "Mois suivant"
- Confirm: "Confirmer la sélection de date"

To use a localized version, simply set the locale:

```javascript
import pickit from "pickit";
import { German } from "pickit/dist/l10n/de.js";

pickit("#myDatePicker", {
  locale: German
});
```

All ARIA labels will automatically use the selected locale.

## Building & Development

For information about building Pickit from source and contributing, see [BUILD.md](BUILD.md).

## Migration from flatpickr

Pickit maintains 100% API compatibility with flatpickr. Simply replace:

```javascript
// Old
import flatpickr from "flatpickr";
flatpickr("#myInput");

// New
import pickit from "pickit";
pickit("#myInput");
```

All options, methods, and hooks remain the same. Your existing flatpickr code will work without modifications.

## Credits & License

Pickit is a fork of [flatpickr](https://github.com/flatpickr/flatpickr) by Gregory.

Original flatpickr: Copyright © 2023 Gregory  
Pickit enhancements: Copyright © 2026

Licensed under MIT License.

## Framework Integrations

* [angular2+-flatpickr addon](https://github.com/mezoistvan/ng2-flatpickr)
* [angularJS-flatpickr addon](https://www.npmjs.com/package/angular-flatpickr)
* [ember-flatpickr addon](https://www.npmjs.com/package/ember-flatpickr)
* [Preact Component](https://github.com/molnarmark/preact-flatpickr)
* [React Component](https://github.com/coderhaoxin/react-flatpickr)
* [Stimulus.js Controller](https://github.com/adrienpoly/stimulus-flatpickr)
* [Svelte Component](https://github.com/jacobmischka/svelte-flatpickr)
* [vue-flatpickr component](https://github.com/ankurk91/vue-flatpickr-component)
* [lit-flatpickr component](https://github.com/Matsuuu/lit-flatpickr)

_These libraries were created for flatpickr and should work with Pickit due to API compatibility. Native Pickit integrations may follow in future releases._
