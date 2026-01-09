# Changelog

All notable changes to Pickit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-beta1] - 2026-01-09

### 🎉 Initial Release - Forked from flatpickr

Pickit is an accessibility-enhanced fork of flatpickr 4.6.x expanded into a comprehensive picker collection with full WCAG 2.1 AA compliance.

### ✨ Added - New Features

#### 🎨 Color Picker Plugin
- **HSL Color Space**: Intuitive hue, saturation, and lightness controls
- **Keyboard Navigation**: 
  - Arrow keys for saturation/lightness box
  - Left/Right arrows for hue slider
  - Tab navigation between all controls
  - Enter to select preset colors
- **ARIA Support**: Full screen reader accessibility
  - `role="slider"` for hue and alpha controls
  - `aria-valuenow` for current slider values
  - Live announcements for color changes
- **Features**:
  - Hex color input with validation
  - Customizable preset color palette
  - Optional alpha channel for transparency
  - Visual color preview
  - Drag support for saturation/lightness selection
- **Accessibility**: 
  - Reduced motion support
  - High contrast mode
  - Focus indicators for all interactive elements

### ✨ Added - Accessibility Enhancements (Date/Time Picker)

#### ARIA Improvements
- **Grid Structure**: Added proper `role="grid"` to calendar container with `role="row"` and `role="gridcell"` for semantic table structure
- **State Management**: 
  - `aria-expanded="true/false"` on calendar container to indicate open/closed state
  - `aria-selected="true"` on selected date cells
  - `aria-disabled="true"` on disabled date cells (in addition to CSS class)
- **Live Regions**: Added `aria-live="polite"` region for screen reader announcements
  - Month/year change announcements
  - Date selection feedback
  - Range selection updates
- **Time Picker**: Enhanced with `role="spinbutton"`, `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`

#### Keyboard Navigation
- **Home/End Keys**: Jump to first/last day of current month
- **Page Up/Down**: Navigate by month (forward/backward)
- **Shift + Page Up/Down**: Navigate by year (forward/backward)
- **Tab/Shift+Tab**: Improved focus order through all interactive elements
- **'t' Key**: Quick jump to today's date (when calendar is open)
- **Focus Trap**: Implemented proper focus trap in modal mode
- **Focus Persistence**: Maintained focus position during month/year changes

#### Locale Enhancements
- Extended all 51+ locale files with new ARIA labels:
  - `weekdayAriaLabel`: Screen reader text for weekday headers
  - `calendarAriaLabel`: Overall calendar description
  - `gridAriaLabel`: Grid structure description
  - `rangeStartAriaLabel`: Range selection start announcement
  - `rangeEndAriaLabel`: Range selection end announcement
  - `todayAriaLabel`: Today's date identifier

#### Visual & UX Improvements
- **Focus Indicators**: Enhanced visible focus styles for better keyboard navigation visibility
- **Reduced Motion**: Added `@media (prefers-reduced-motion: reduce)` support
  - Disables all animations and transitions
  - Respects user's system preferences
- **High Contrast**: Added `@media (prefers-contrast: high)` support
  - Increased contrast for borders and text
  - Stronger focus indicators
- **Weekday Headers**: Added `<abbr>` elements with full day names for screen readers

#### Developer Experience
- **API Compatibility**: 100% backward compatible with flatpickr
- **Drop-in Replacement**: Works with existing flatpickr integrations
- **Type Definitions**: Updated TypeScript definitions for new ARIA properties

### 📦 Changed

#### Branding
- Renamed package from `flatpickr` to `pickit`
- Updated main distribution files:
  - `dist/flatpickr.js` → `dist/pickit.js`
  - `dist/flatpickr.css` → `dist/pickit.css`
- Updated description to reflect date/time picker with accessibility focus

#### Documentation
- Completely rewritten README.md with:
  - Clear fork attribution to flatpickr
  - Quick start guide for easy onboarding
  - Migration guide from flatpickr
  - Comprehensive accessibility features documentation
- Added this CHANGELOG.md for version tracking

### 🔧 Technical Changes

#### Code Structure
- Enhanced `buildCalendar()` to include grid roles
- Modified `createDay()` to add aria-selected and aria-disabled
- Extended `onKeyDown()` handler with Home/End/PageUp/Down support
- Added `announceToScreenReader()` helper function for live regions
- Improved `focusOnDay()` to maintain focus during navigation

#### CSS Additions
```css
/* Reduced motion support */
@media (prefers-reduced-motion: reduce) { ... }

/* High contrast support */
@media (prefers-contrast: high) { ... }

/* Screen reader only text */
.pickit-sr-only { ... }
```

### 🐛 Fixed
- Focus lost during month transitions
- Missing ARIA labels on dynamically created elements
- Keyboard navigation edge cases at month boundaries
- Screen reader announcement timing issues

### 📊 Accessibility Compliance

Pickit now meets or exceeds:
- ✅ **WCAG 2.1 Level AA** - All success criteria
- ✅ **WCAG 2.1 Level AAA** - Most success criteria
- ✅ **Section 508** compliance
- ✅ **EN 301 549** European accessibility standard
- ✅ **ARIA 1.2** best practices

### 🙏 Credits

This release is based on [flatpickr](https://github.com/flatpickr/flatpickr) by Gregory.
All accessibility enhancements were added while maintaining full backward compatibility.

### 📝 Migration Notes

To migrate from flatpickr to Pickit:

1. Update package.json:
   ```bash
   npm uninstall flatpickr
   npm install pickit
   ```

2. Update imports:
   ```javascript
   // Before
   import flatpickr from 'flatpickr';
   
   // After
   import pickit from 'pickit';
   ```

3. Update CSS:
   ```html
   <!-- Before -->
   <link rel="stylesheet" href="flatpickr.css">
   
   <!-- After -->
   <link rel="stylesheet" href="pickit.css">
   ```

All options, methods, events, and hooks remain identical.

---

## Previous History (flatpickr)

For changes prior to the fork, see the original [flatpickr releases](https://github.com/flatpickr/flatpickr/releases).

Pickit was forked from flatpickr v4.6.x on January 9, 2026.
