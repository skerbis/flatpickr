# Build Process Documentation

This document explains the flatpickr build process, development workflow, and the tools used.

## Overview

Flatpickr uses a custom TypeScript-based build system defined in `build.ts`. The build process compiles TypeScript source code, transpiles Stylus stylesheets, and generates multiple distribution formats.

## Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

## Installation

```bash
npm install
```

This installs all development dependencies required for building the project.

## Build Scripts

The project uses several npm scripts defined in `package.json`:

### Main Build Commands

- **`npm run build`** - Complete production build
  - Runs all build steps in sequence: `build:pre`, `build:build`, `build:esm`, `build:types`, `build:post`
  
- **`npm start`** - Development mode with watch and live reload
  - Starts a development server on `http://localhost:8000`
  - Watches for file changes and automatically rebuilds
  - Includes source maps for easier debugging

### Individual Build Steps

1. **`npm run build:pre`** - Cleans the `dist` directory
   - Removes all previously built files using `rimraf`

2. **`npm run build:build`** - Main build process
   - Runs `build.ts` using `ts-node`
   - Transpiles TypeScript to JavaScript
   - Compiles Stylus to CSS
   - Minifies JavaScript and CSS
   - Builds plugins and localization files
   - Generates themes

3. **`npm run build:esm`** - Builds ES Module version
   - Uses TypeScript compiler with `tsconfig.esm.json`
   - Outputs to `dist/esm/`

4. **`npm run build:types`** - Generates TypeScript declarations
   - Uses TypeScript compiler with `tsconfig.declarations.json`
   - Outputs `.d.ts` files for TypeScript consumers

5. **`npm run build:post`** - Post-build tasks
   - Copies `src/typings.d.ts` to `dist/typings.d.ts`

## Build Process Details

### JavaScript Build (`buildScripts`)

1. **Rollup bundling**: Uses Rollup to bundle the TypeScript source code
   - Entry point: `src/index.ts`
   - Plugins: TypeScript, Babel (for transpilation)
   - Outputs: `dist/flatpickr.js`

2. **Minification**: Uses Terser to create minified version
   - Outputs: `dist/flatpickr.min.js`
   - Adds version banner comment

### CSS Build (`buildStyle`)

1. **Stylus compilation**: Transpiles Stylus to CSS
   - Entry point: `src/style/flatpickr.styl`
   - Includes autoprefixer for browser compatibility
   - Outputs: `dist/flatpickr.css`, `dist/flatpickr.min.css`

2. **IE stylesheet**: Separate stylesheet for IE compatibility
   - Input: `src/style/ie.styl`
   - Output: `dist/ie.css`

### Themes Build (`buildThemes`)

Themes are built from individual Stylus files in `src/style/themes/`:

- Each `*.styl` file in the themes directory is compiled to CSS
- Themes extend the base flatpickr styles with custom variables
- Available themes:
  - `modern` - Modern theme with micro-animations and dark mode (respects `prefers-reduced-motion`)
  - `confetti` - Colorful confetti theme
  - `dark` - Dark mode theme
  - `light` - Light minimalist theme
  - `material_blue` - Material Design blue theme
  - `material_green` - Material Design green theme
  - `material_orange` - Material Design orange theme
  - `material_red` - Material Design red theme
  - `uikit` - UIKit 3 inspired theme
  - `custom` - Fully customizable theme using CSS variables (see [CUSTOM_THEME.md](CUSTOM_THEME.md))

### Plugins Build (`buildExtras`)

Plugins in `src/plugins/` are built individually:
- Each plugin is bundled as a UMD module
- TypeScript files are compiled to JavaScript
- CSS files are copied directly
- Outputs to `dist/plugins/`

### Localization Build (`buildExtras`)

Localization files in `src/l10n/` are built individually:
- Each locale is bundled as a UMD module with named exports
- Outputs to `dist/l10n/`

## Development Workflow

### Starting Development Server

```bash
npm start
```

This will:
1. Create `index.html` from `index.template.html` if it doesn't exist
2. Start Rollup in watch mode
3. Start a local server on port 8000
4. Enable live reload
5. Set up file watchers for automatic rebuilding

### File Watching

The development mode watches these directories:
- `src/plugins` - Rebuilds plugins on change
- `src/style/*.styl` - Rebuilds main styles and themes on change
- `src/style/themes` - Rebuilds themes on change
- `src` - Runs prettier formatter on change

### Testing Changes

```bash
npm test
```

This runs:
1. **Type checking**: `tsc --noEmit --incremental`
2. **Unit tests**: Jest with configuration from `config/jest.json`

### Code Formatting

```bash
npm run fmt
```

Uses Prettier to format all TypeScript files.

```bash
npm run fmt:check
```

Checks if files are properly formatted without making changes.

## Build Tools and Technologies

### Core Build Tools

- **TypeScript**: Type-safe JavaScript superset
- **Rollup**: JavaScript module bundler
- **Babel**: JavaScript transpiler for browser compatibility
- **Terser**: JavaScript minifier
- **Stylus**: CSS preprocessor
- **Autoprefixer**: Automatic CSS vendor prefixing

### Development Tools

- **ts-node**: TypeScript execution environment for Node.js
- **Jest**: Testing framework
- **Chokidar**: File watching library
- **rimraf**: Cross-platform file deletion

### Rollup Plugins

- `rollup-plugin-typescript`: TypeScript compilation
- `rollup-plugin-babel`: Babel transpilation
- `rollup-plugin-livereload`: Live reload for development
- `rollup-plugin-serve`: Development server

## Output Structure

```
dist/
├── flatpickr.js          # Main UMD bundle
├── flatpickr.min.js      # Minified UMD bundle
├── flatpickr.css         # Main stylesheet
├── flatpickr.min.css     # Minified stylesheet
├── ie.css                # IE compatibility stylesheet
├── typings.d.ts          # TypeScript declarations
├── esm/                  # ES Module build
│   ├── index.js
│   └── ...
├── types/                # TypeScript type definitions
│   └── ...
├── themes/               # Theme stylesheets
│   ├── dark.css
│   ├── uikit.css
│   └── ...
├── plugins/              # Plugin bundles
│   └── ...
└── l10n/                 # Localization bundles
    └── ...
```

## Browser Compatibility

The build process targets these browsers (defined in `package.json`):
- IE 9+
- Last 2 versions of major browsers
- Safari 7+

Babel and Autoprefixer ensure compatibility by:
- Transpiling modern JavaScript to ES5
- Adding vendor prefixes to CSS
- Polyfilling missing features

## Creating a New Theme

1. Create a new `.styl` file in `src/style/themes/`
2. Define theme variables (see existing themes for examples)
3. Import the base styles: `@require "../flatpickr"`
4. Run `npm run build` or `npm start`
5. The theme will be available in `dist/themes/`

Example theme structure:
```stylus
$calendarBackground = #fff
$monthForeground = #333
$selectedDayBackground = #1e87f0
// ... more variables

@require "../flatpickr"

// Optional: Custom styles
.flatpickr-calendar
  border-radius 4px
```

## Troubleshooting

### Build Fails

1. Clean and reinstall dependencies:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Clean build artifacts:
   ```bash
   npm run build:pre
   ```

### Tests Fail

1. Make sure the project is built:
   ```bash
   npm run build
   ```

2. Run type checking separately:
   ```bash
   npm run test:typecheck
   ```

### Watch Mode Not Working

1. Ensure you're using `npm start` for development
2. Check if the port 8000 is available
3. Try clearing the browser cache

## Contributing

When contributing to flatpickr:

1. Run `npm start` to start the development server
2. Make your changes in the `src/` directory
3. Test your changes: `npm test`
4. Format your code: `npm run fmt`
5. Build for production: `npm run build`

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for more details.
