# Custom Theme - CSS Variables

The **custom** theme for Pickit is a fully customizable theme that uses CSS custom properties (CSS variables) for styling. This allows you to easily customize colors, shadows, border radius, and other visual properties without modifying the theme file itself.

## Features

- 🎨 **Fully customizable** via CSS variables
- ♿ **Accessible by default** - neutral color scheme with excellent contrast
- 🌗 **Automatic dark mode** support via `prefers-color-scheme`
- 🔍 **High contrast mode** support via `prefers-contrast`
- ♿ **Reduced motion** support via `prefers-reduced-motion`
- 🔧 **Easy to override** - just set CSS variables in your own stylesheet
- 📱 **Responsive** and modern design
- ✨ **Smooth transitions** (respects user preferences)

## Usage

### Basic Usage

Include the custom theme CSS file:

```html
<link rel="stylesheet" href="path/to/pickit/dist/themes/custom.css">
```

Initialize pickit:

```javascript
pickit("#myDatePicker", {
  // your options
});
```

The theme will automatically:
- Use a neutral blue color scheme in light mode
- Switch to dark mode when `prefers-color-scheme: dark` is detected
- Increase contrast when `prefers-contrast: high` is detected
- Disable animations when `prefers-reduced-motion: reduce` is detected

### Customizing with CSS Variables

You can customize the theme by overriding CSS variables in your own stylesheet:

```css
/* Override theme colors and styles */
.flatpickr-calendar {
  --pickit-bg: #ffffff;                    /* Calendar background */
  --pickit-border-color: #d1d5db;          /* Border color */
  --pickit-border-radius: 8px;             /* Border radius */
  --pickit-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);  /* Box shadow */
  
  /* Month header */
  --pickit-month-bg: #f9fafb;              /* Month background */
  --pickit-month-fg: #1f2937;              /* Month text color */
  --pickit-arrow-hover-color: #2563eb;     /* Arrow hover color */
  
  /* Weekdays */
  --pickit-weekdays-bg: #f3f4f6;           /* Weekdays background */
  --pickit-weekdays-fg: #6b7280;           /* Weekdays text color */
  
  /* Days */
  --pickit-day-fg: #1f2937;                /* Day text color */
  --pickit-day-hover-bg: #f3f4f6;          /* Day hover background */
  --pickit-day-hover-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);  /* Day hover shadow */
  --pickit-day-border-radius: 6px;         /* Day border radius */
  
  /* Today */
  --pickit-today-color: #2563eb;           /* Today border color */
  --pickit-today-fg: #1f2937;              /* Today text color */
  --pickit-today-bg: rgba(37, 99, 235, 0.1);  /* Today background */
  --pickit-today-hover-bg: rgba(37, 99, 235, 0.15);  /* Today hover background */
  
  /* Selected date */
  --pickit-selected-bg: #2563eb;           /* Selected background */
  --pickit-selected-fg: #ffffff;           /* Selected text color */
  --pickit-selected-shadow: 0 2px 4px rgba(37, 99, 235, 0.4);  /* Selected shadow */
  --pickit-selected-hover-bg: #1d4ed8;     /* Selected hover background */
  
  /* Date range */
  --pickit-range-bg: rgba(37, 99, 235, 0.1);  /* Range background */
  
  /* Disabled days */
  --pickit-disabled-color: #9ca3af;        /* Disabled day text color */
  
  /* Time picker */
  --pickit-time-border-color: #e5e7eb;     /* Time section border color */
  --pickit-time-bg: #f9fafb;               /* Time section background */
  --pickit-time-input-bg: #ffffff;         /* Time input background */
  --pickit-time-input-border: #d1d5db;     /* Time input border */
  --pickit-time-input-radius: 6px;         /* Time input border radius */
  --pickit-time-input-color: #1f2937;      /* Time input text color */
  --pickit-time-input-hover-bg: #ffffff;   /* Time input hover background */
  --pickit-time-input-hover-border: #2563eb;  /* Time input hover border */
  --pickit-time-color: #1f2937;            /* Time separator & AM/PM color */
  
  /* Transitions (set to 'none' for prefers-reduced-motion) */
  --pickit-transition: all 0.2s ease;      /* Default transition */
}
```

## Example Customizations

### Pink Theme (Example)

```css
.flatpickr-calendar {
  --pickit-border-color: #e91e63;
  --pickit-border-radius: 12px;
  --pickit-shadow: 0 10px 40px rgba(233, 30, 99, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1);
  
  --pickit-month-bg: #e91e63;
  --pickit-month-fg: #ffffff;
  --pickit-arrow-hover-color: #fce4ec;
  
  --pickit-weekdays-bg: #f48fb1;
  --pickit-weekdays-fg: #ffffff;
  
  --pickit-day-hover-bg: #fce4ec;
  --pickit-day-border-radius: 8px;
  
  --pickit-today-color: #e91e63;
  --pickit-today-bg: rgba(233, 30, 99, 0.1);
  --pickit-today-hover-bg: rgba(233, 30, 99, 0.2);
  --pickit-today-hover-shadow: 0 2px 8px rgba(233, 30, 99, 0.4);
  
  --pickit-selected-bg: #e91e63;
  --pickit-selected-shadow: 0 4px 12px rgba(233, 30, 99, 0.5);
  --pickit-selected-hover-bg: #c2185b;
  --pickit-selected-hover-shadow: 0 6px 16px rgba(233, 30, 99, 0.6);
  
  --pickit-range-bg: rgba(233, 30, 99, 0.15);
  
  --pickit-time-border-color: #f48fb1;
  --pickit-time-bg: #fce4ec;
  --pickit-time-input-border: #e91e63;
  --pickit-time-input-hover-border: #c2185b;
}
```

### Green Theme

```css
.flatpickr-calendar {
  --pickit-border-color: #4CAF50;
  --pickit-month-bg: #4CAF50;
  --pickit-month-fg: #ffffff;
  --pickit-weekdays-bg: #81C784;
  --pickit-weekdays-fg: #ffffff;
  --pickit-today-color: #4CAF50;
  --pickit-selected-bg: #4CAF50;
  --pickit-selected-hover-bg: #388E3C;
  --pickit-shadow: 0 10px 40px rgba(76, 175, 80, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### Force Dark Mode (Override Automatic Detection)

```css
.flatpickr-calendar {
  --pickit-bg: #1f2937;
  --pickit-border-color: #374151;
  --pickit-month-bg: #111827;
  --pickit-month-fg: #f9fafb;
  --pickit-weekdays-bg: #111827;
  --pickit-weekdays-fg: #9ca3af;
  --pickit-day-fg: #f9fafb;
  --pickit-day-hover-bg: #374151;
  --pickit-today-color: #60a5fa;
  --pickit-selected-bg: #3b82f6;
  --pickit-time-bg: #111827;
  --pickit-time-input-bg: #1f2937;
  --pickit-time-input-color: #f9fafb;
  --pickit-shadow: 0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2);
}
```

## Accessibility Features

The custom theme includes comprehensive accessibility support:

### Automatic Color Scheme Detection

The theme automatically adapts to user preferences:

- **Light Mode** (default): Neutral gray and blue color scheme with high contrast
- **Dark Mode** (`prefers-color-scheme: dark`): Dark backgrounds with adjusted colors for readability
- **High Contrast** (`prefers-contrast: high`): Increased border widths and stronger colors
- **Reduced Motion** (`prefers-reduced-motion: reduce`): Disables all animations and transitions

### Keyboard Navigation

All interactive elements maintain proper focus indicators that work in both light and dark modes.

### WCAG Compliance

The default color scheme provides:
- **4.5:1 contrast ratio** for normal text (WCAG AA)
- **3:1 contrast ratio** for large text and UI components
- Clear visual indicators for all interactive states
- Focus indicators that meet accessibility requirements

### Minimal Theme (No Shadows)

```css
.flatpickr-calendar {
  --pickit-shadow: none;
  --pickit-day-hover-shadow: none;
  --pickit-selected-shadow: none;
  --pickit-selected-hover-shadow: none;
  --pickit-border-radius: 4px;
  --pickit-day-border-radius: 4px;
}
```

## Available CSS Variables

Here's the complete list of available CSS variables:

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `--pickit-bg` | Calendar background color | `#ffffff` |
| `--pickit-border-color` | Calendar border color | `#d1d5db` |
| `--pickit-border-radius` | Calendar border radius | `8px` |
| `--pickit-shadow` | Calendar box shadow | `0 4px 6px rgba(0, 0, 0, 0.1)` |
| `--pickit-month-bg` | Month header background | `#f9fafb` |
| `--pickit-month-fg` | Month header text color | `#1f2937` |
| `--pickit-arrow-hover-color` | Arrow hover color | `#2563eb` |
| `--pickit-weekdays-bg` | Weekdays background | `#f3f4f6` |
| `--pickit-weekdays-fg` | Weekdays text color | `#6b7280` |
| `--pickit-day-fg` | Day text color | `#1f2937` |
| `--pickit-day-hover-bg` | Day hover background | `#f3f4f6` |
| `--pickit-day-hover-shadow` | Day hover shadow | `0 1px 3px rgba(0, 0, 0, 0.1)` |
| `--pickit-day-border-radius` | Day border radius | `6px` |
| `--pickit-today-color` | Today border color | `#2563eb` |
| `--pickit-today-fg` | Today text color | `#1f2937` |
| `--pickit-today-bg` | Today background | `rgba(37, 99, 235, 0.1)` |
| `--pickit-today-hover-bg` | Today hover background | `rgba(37, 99, 235, 0.15)` |
| `--pickit-selected-bg` | Selected date background | `#2563eb` |
| `--pickit-selected-fg` | Selected date text color | `#ffffff` |
| `--pickit-selected-shadow` | Selected date shadow | `0 2px 4px rgba(37, 99, 235, 0.4)` |
| `--pickit-selected-hover-bg` | Selected date hover background | `#1d4ed8` |
| `--pickit-selected-hover-shadow` | Selected date hover shadow | `0 3px 6px rgba(37, 99, 235, 0.5)` |
| `--pickit-range-bg` | Date range background | `rgba(37, 99, 235, 0.1)` |
| `--pickit-disabled-color` | Disabled day text color | `#9ca3af` |
| `--pickit-time-border-color` | Time section border color | `#e5e7eb` |
| `--pickit-time-bg` | Time section background | `#f9fafb` |
| `--pickit-time-input-bg` | Time input background | `#ffffff` |
| `--pickit-time-input-border` | Time input border | `#d1d5db` |
| `--pickit-time-input-radius` | Time input border radius | `6px` |
| `--pickit-time-input-color` | Time input text color | `#1f2937` |
| `--pickit-time-input-hover-bg` | Time input hover background | `#ffffff` |
| `--pickit-time-input-hover-border` | Time input hover border | `#2563eb` |
| `--pickit-time-color` | Time separator & AM/PM color | `#1f2937` |
| `--pickit-transition` | Default transition | `all 0.2s ease` |

## Browser Support

CSS variables are supported in all modern browsers:
- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 15+
- Opera 36+

For older browsers that don't support CSS variables, the theme will use the default pink values.

## License

MIT License - Pickit is a fork of [flatpickr](https://github.com/flatpickr/flatpickr).
