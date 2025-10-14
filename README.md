## flatpickr a11y FORK  - javascript datetime picker

This wants to be an a11y optimized fork of flatpickr. 

[![Actions Status](https://github.com/skerbis/flatpickr/workflows/GitHub%20Actions/badge.svg)](https://github.com/flatpickr/flatpickr/actions)

[![Coverage](https://coveralls.io/repos/github/chmln/flatpickr/badge.svg?branch=master)](https://coveralls.io/github/chmln/flatpickr)
[![npm version](https://badge.fury.io/js/flatpickr.svg)](https://www.npmjs.com/package/flatpickr)
[![CDNJS](https://img.shields.io/cdnjs/v/flatpickr.svg)](https://cdnjs.com/libraries/flatpickr)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=plastic)](https://raw.githubusercontent.com/flatpickr/flatpickr/master/LICENSE.md)


![blue](https://cloud.githubusercontent.com/assets/11352152/14549371/3cbb65da-028d-11e6-976d-a6f63f32061f.PNG)
![green](https://cloud.githubusercontent.com/assets/11352152/14549373/3cbe975a-028d-11e6-9192-43975f0146da.PNG)
![confetti](https://cloud.githubusercontent.com/assets/11352152/14549440/de9bf55e-028d-11e6-9271-46782a99efea.PNG)
![red](https://cloud.githubusercontent.com/assets/11352152/14549374/3cc01102-028d-11e6-9ff4-0cf208a310c4.PNG)
![default](https://cloud.githubusercontent.com/assets/11352152/14549370/3cadb750-028d-11e6-818d-c6a1bc6349fc.PNG)
![dark](https://cloud.githubusercontent.com/assets/11352152/14549372/3cbc8514-028d-11e6-8daf-ec1ba01c9d7e.PNG)


## Motivation
Almost every large SPA or project involves date and time input. Browser's native implementations of those are inconsistent and limited in functionality. Most other libraries require you to pull in heavy dependencies like jQuery, Bootstrap, and moment.js. I wanted something that was good-looking out of the box, dependency-free, powerful, and extensible.

Feature overview:

- Dependency-free (no bloated bundles)
- Simple, polished UX
- Date + time input
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

![](https://user-images.githubusercontent.com/11352152/36033089-f37dc1d0-0d7d-11e8-8ec4-c7a56d1ff92e.png)

flatpickr provides more functionality at a fraction of the size of other libraries.

## Compatibility
IE9 and up, Edge, iOS Safari 6+, Chrome 8+, Firefox 6+

### Browser-Specific Enhancements

flatpickr includes specific fixes and optimizations for various browsers:

- **Safari**: Enhanced select dropdown rendering with proper padding and appearance fixes
- **Cross-browser**: Consistent styling across all modern browsers with vendor prefixes
- **Mobile**: Touch-optimized interactions for iOS and Android

## Accessibility

flatpickr is designed with accessibility in mind and includes comprehensive ARIA support for screen readers and keyboard navigation.

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
import { German } from "flatpickr/dist/l10n/de.js";

flatpickr("#myDatePicker", {
  locale: German
});
```

All ARIA labels will automatically use the selected locale.

## Install & Use

Demos and documentation: https://flatpickr.js.org

## Building & Development

For information about building flatpickr from source and contributing, see [BUILD.md](BUILD.md).

## Releases

To create a new release, see [.github/RELEASE.md](.github/RELEASE.md) for instructions on using the automated release workflow.

## See also:
* [angular2+-flatpickr addon](https://github.com/mezoistvan/ng2-flatpickr)
* [angularJS-flatpickr addon](https://www.npmjs.com/package/angular-flatpickr)
* [ember-flatpickr addon](https://www.npmjs.com/package/ember-flatpickr)
* [Preact Component](https://github.com/molnarmark/preact-flatpickr)
* [React Component](https://github.com/coderhaoxin/react-flatpickr)
* [Stimulus.js Controller](https://github.com/adrienpoly/stimulus-flatpickr)
* [Svelte Component](https://github.com/jacobmischka/svelte-flatpickr)
* [vue-flatpickr component](https://github.com/ankurk91/vue-flatpickr-component)
* [lit-flatpickr component](https://github.com/Matsuuu/lit-flatpickr)

## Supporting flatpickr

flatpickr will never change its license, pester users for donations, or engage in other user-hostile behavior.

Nevertheless, if you enjoyed working with this library or if its made your life easier, you can buy him a cup of coffee :)

<a href='https://ko-fi.com/A3381DJ9' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://az743702.vo.msecnd.net/cdn/kofi4.png?v=0' border='0' alt='Buy gim a Coffee at ko-fi.com' /></a>
