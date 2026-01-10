/**
 * Pickit Color Picker
 * An accessible, lightweight color picker inspired by flatpickr
 * Supports HSL, RGB, HEX formats with keyboard navigation
 */

export interface ColorPickerOptions {
  defaultColor?: string;
  format?: "hex" | "rgb" | "hsl";
  showAlpha?: boolean;
  presetColors?: string[];
  inline?: boolean;
  onChange?: (color: string) => void;
  onOpen?: () => void;
  onClose?: () => void;
  appendTo?: HTMLElement;
  position?: "auto" | "above" | "below";
  closeOnSelect?: boolean;
  ariaLabels?: {
    hue?: string;
    saturation?: string;
    lightness?: string;
    alpha?: string;
    presets?: string;
  };
}

interface HSL {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
  a: number; // 0-1
}

interface RGB {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
  a: number; // 0-1
}

export class ColorPicker {
  private input: HTMLInputElement;
  private options: Required<ColorPickerOptions>;
  private container: HTMLElement | null = null;
  private colorBox: HTMLElement | null = null;
  private hueSlider: HTMLInputElement | null = null;
  private alphaSlider: HTMLInputElement | null = null;
  private hexInput: HTMLInputElement | null = null;
  private currentColor: HSL = { h: 0, s: 100, l: 50, a: 1 };
  private isOpen = false;
  private saturationPointer: HTMLElement | null = null;

  private static instances: Map<HTMLElement, ColorPicker> = new Map();

  constructor(
    element: string | HTMLInputElement,
    options: ColorPickerOptions = {}
  ) {
    this.input =
      typeof element === "string"
        ? (document.querySelector(element) as HTMLInputElement)
        : element;

    if (!this.input) {
      throw new Error("ColorPicker: Invalid element selector");
    }

    this.options = {
      defaultColor: options.defaultColor || "#3b82f6",
      format: options.format || "hex",
      showAlpha: options.showAlpha ?? false,
      presetColors: options.presetColors || [
        "#ef4444",
        "#f59e0b",
        "#10b981",
        "#3b82f6",
        "#8b5cf6",
        "#ec4899",
        "#000000",
        "#ffffff",
      ],
      inline: options.inline ?? false,
      onChange: options.onChange || (() => {}),
      onOpen: options.onOpen || (() => {}),
      onClose: options.onClose || (() => {}),
      appendTo: options.appendTo || document.body,
      position: options.position || "auto",
      closeOnSelect: options.closeOnSelect ?? true,
      ariaLabels: {
        hue: options.ariaLabels?.hue || "Hue",
        saturation:
          options.ariaLabels?.saturation || "Saturation and Lightness",
        lightness: options.ariaLabels?.lightness || "Lightness",
        alpha: options.ariaLabels?.alpha || "Alpha",
        presets: options.ariaLabels?.presets || "Preset colors",
      },
    };

    this.init();
    ColorPicker.instances.set(this.input, this);
  }

  private init(): void {
    // Parse initial color
    const initialColor = this.input.value || this.options.defaultColor;
    this.currentColor = this.parseColor(initialColor);

    // Build UI
    this.buildColorPicker();

    // Setup event listeners
    this.setupEventListeners();

    // Update display
    this.updateColorDisplay();

    // Open if inline
    if (this.options.inline) {
      this.open();
    }
  }

  private buildColorPicker(): void {
    this.container = document.createElement("div");
    this.container.className = "colorpicker-container";
    this.container.setAttribute("role", "dialog");
    this.container.setAttribute("aria-label", "Color picker");
    this.container.style.display = "none";

    const content = `
      <div class="colorpicker-content">
        <div class="colorpicker-saturation" 
             role="slider" 
             aria-label="${this.options.ariaLabels.saturation}"
             aria-valuemin="0"
             aria-valuemax="100"
             aria-valuenow="${this.currentColor.s}"
             tabindex="0">
          <div class="colorpicker-saturation-overlay"></div>
          <div class="colorpicker-saturation-pointer" role="presentation"></div>
        </div>
        
        <div class="colorpicker-controls">
          <div class="colorpicker-sliders">
            <div class="colorpicker-slider-group">
              <label for="colorpicker-hue">
                <span class="colorpicker-label">${
                  this.options.ariaLabels.hue
                }</span>
              </label>
              <input 
                type="range" 
                id="colorpicker-hue"
                class="colorpicker-slider colorpicker-hue-slider"
                min="0" 
                max="360" 
                value="${this.currentColor.h}"
                aria-label="${this.options.ariaLabels.hue}"
              />
            </div>
            ${
              this.options.showAlpha
                ? `
              <div class="colorpicker-slider-group">
                <label for="colorpicker-alpha">
                  <span class="colorpicker-label">${
                    this.options.ariaLabels.alpha
                  }</span>
                </label>
                <input 
                  type="range" 
                  id="colorpicker-alpha"
                  class="colorpicker-slider colorpicker-alpha-slider"
                  min="0" 
                  max="100" 
                  value="${this.currentColor.a * 100}"
                  aria-label="${this.options.ariaLabels.alpha}"
                />
              </div>
            `
                : ""
            }
          </div>
          
          <div class="colorpicker-preview">
            <div class="colorpicker-preview-color" role="presentation"></div>
          </div>
        </div>
        
        <div class="colorpicker-input-group">
          <label for="colorpicker-hex">
            <span class="colorpicker-sr-only">Color value</span>
          </label>
          <input 
            type="text" 
            id="colorpicker-hex"
            class="colorpicker-input"
            placeholder="#000000"
            aria-label="Color value in hexadecimal"
          />
        </div>
        
        ${
          this.options.presetColors.length > 0
            ? `
          <div class="colorpicker-presets" role="group" aria-label="${
            this.options.ariaLabels.presets
          }">
            ${this.options.presetColors
              .map(
                (color) => `
              <button 
                type="button"
                class="colorpicker-preset" 
                style="background-color: ${color}"
                data-color="${color}"
                aria-label="Select color ${color}"
              ></button>
            `
              )
              .join("")}
          </div>
        `
            : ""
        }
      </div>
    `;

    this.container.innerHTML = content;

    // Cache element references
    this.colorBox = this.container.querySelector(".colorpicker-saturation");
    this.saturationPointer = this.container.querySelector(
      ".colorpicker-saturation-pointer"
    );
    this.hueSlider = this.container.querySelector(".colorpicker-hue-slider");
    this.alphaSlider = this.container.querySelector(
      ".colorpicker-alpha-slider"
    );
    this.hexInput = this.container.querySelector(".colorpicker-input");

    // Append to DOM
    this.options.appendTo.appendChild(this.container);
  }

  private setupEventListeners(): void {
    // Input click to open
    this.input.addEventListener("click", () => {
      if (!this.options.inline) {
        this.toggle();
      }
    });

    // Input change
    this.input.addEventListener("change", () => {
      this.currentColor = this.parseColor(this.input.value);
      this.updateColorDisplay();
    });

    // Hue slider
    if (this.hueSlider) {
      this.hueSlider.addEventListener("input", (e) => {
        this.currentColor.h = parseInt((e.target as HTMLInputElement).value);
        this.updateColorDisplay();
        this.announceColorChange();
      });
    }

    // Alpha slider
    if (this.alphaSlider) {
      this.alphaSlider.addEventListener("input", (e) => {
        this.currentColor.a =
          parseInt((e.target as HTMLInputElement).value) / 100;
        this.updateColorDisplay();
        this.announceColorChange();
      });
    }

    // Saturation box
    if (this.colorBox) {
      this.colorBox.addEventListener("mousedown", (e) =>
        this.onSaturationMouseDown(e)
      );
      this.colorBox.addEventListener("keydown", (e) =>
        this.onSaturationKeyDown(e)
      );
    }

    // Hex input
    if (this.hexInput) {
      this.hexInput.addEventListener("input", (e) => {
        const value = (e.target as HTMLInputElement).value;
        if (this.isValidHex(value)) {
          this.currentColor = this.parseColor(value);
          this.updateColorDisplay(false);
        }
      });
    }

    // Preset colors
    const presets = this.container?.querySelectorAll(".colorpicker-preset");
    presets?.forEach((preset) => {
      preset.addEventListener("click", (e) => {
        const color = (e.currentTarget as HTMLElement).dataset.color!;
        this.currentColor = this.parseColor(color);
        this.updateColorDisplay();
        if (this.options.closeOnSelect) {
          this.close();
        }
      });
    });

    // Close on outside click
    if (!this.options.inline) {
      document.addEventListener("mousedown", (e) => {
        if (
          this.isOpen &&
          !this.container?.contains(e.target as Node) &&
          e.target !== this.input
        ) {
          this.close();
        }
      });
    }

    // Escape key to close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen && !this.options.inline) {
        this.close();
        this.input.focus();
      }
    });
  }

  private onSaturationMouseDown(e: MouseEvent): void {
    e.preventDefault();
    this.updateSaturationFromMouse(e);

    const onMouseMove = (e: MouseEvent) => {
      this.updateSaturationFromMouse(e);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }

  private updateSaturationFromMouse(e: MouseEvent): void {
    if (!this.colorBox) return;

    const rect = this.colorBox.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    this.currentColor.s = (x / rect.width) * 100;
    this.currentColor.l = 100 - (y / rect.height) * 100;

    this.updateColorDisplay();
    this.announceColorChange();
  }

  private onSaturationKeyDown(e: KeyboardEvent): void {
    const step = e.shiftKey ? 10 : 1;
    let handled = false;

    switch (e.key) {
      case "ArrowRight":
        this.currentColor.s = Math.min(100, this.currentColor.s + step);
        handled = true;
        break;
      case "ArrowLeft":
        this.currentColor.s = Math.max(0, this.currentColor.s - step);
        handled = true;
        break;
      case "ArrowUp":
        this.currentColor.l = Math.min(100, this.currentColor.l + step);
        handled = true;
        break;
      case "ArrowDown":
        this.currentColor.l = Math.max(0, this.currentColor.l - step);
        handled = true;
        break;
    }

    if (handled) {
      e.preventDefault();
      this.updateColorDisplay();
      this.announceColorChange();
    }
  }

  private updateColorDisplay(updateInput = true): void {
    // Update saturation box background
    if (this.colorBox) {
      this.colorBox.style.backgroundColor = `hsl(${this.currentColor.h}, 100%, 50%)`;
    }

    // Update saturation pointer position
    if (this.saturationPointer && this.colorBox) {
      const x = (this.currentColor.s / 100) * 100;
      const y = (1 - this.currentColor.l / 100) * 100;
      this.saturationPointer.style.left = `${x}%`;
      this.saturationPointer.style.top = `${y}%`;
    }

    // Update preview
    const preview = this.container?.querySelector(
      ".colorpicker-preview-color"
    ) as HTMLElement;
    if (preview) {
      preview.style.backgroundColor = this.toHSLString(this.currentColor);
    }

    // Update hex input
    if (this.hexInput && updateInput) {
      this.hexInput.value = this.toHex(this.currentColor);
    }

    // Update sliders
    if (this.hueSlider) {
      this.hueSlider.value = String(this.currentColor.h);
    }
    if (this.alphaSlider) {
      this.alphaSlider.value = String(this.currentColor.a * 100);
    }

    // Update input field
    if (updateInput) {
      this.input.value = this.formatColor(this.currentColor);
      this.options.onChange(this.input.value);
    }
  }

  private formatColor(color: HSL): string {
    switch (this.options.format) {
      case "hsl":
        return this.toHSLString(color);
      case "rgb":
        return this.toRGBString(this.hslToRgb(color));
      case "hex":
      default:
        return this.toHex(color);
    }
  }

  private parseColor(colorString: string): HSL {
    colorString = colorString.trim();

    // Try hex
    if (colorString.startsWith("#")) {
      return this.hexToHsl(colorString);
    }

    // Try rgb/rgba
    const rgbMatch = colorString.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
    );
    if (rgbMatch) {
      const rgb: RGB = {
        r: parseInt(rgbMatch[1]),
        g: parseInt(rgbMatch[2]),
        b: parseInt(rgbMatch[3]),
        a: rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1,
      };
      return this.rgbToHsl(rgb);
    }

    // Try hsl/hsla
    const hslMatch = colorString.match(
      /hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/
    );
    if (hslMatch) {
      return {
        h: parseInt(hslMatch[1]),
        s: parseInt(hslMatch[2]),
        l: parseInt(hslMatch[3]),
        a: hslMatch[4] ? parseFloat(hslMatch[4]) : 1,
      };
    }

    // Default to current color
    return this.currentColor;
  }

  private hexToHsl(hex: string): HSL {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    const a = hex.length === 8 ? parseInt(hex.substring(6, 8), 16) / 255 : 1;

    return this.rgbToHsl({ r: r * 255, g: g * 255, b: b * 255, a });
  }

  private rgbToHsl(rgb: RGB): HSL {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
      a: rgb.a,
    };
  }

  private hslToRgb(hsl: HSL): RGB {
    const h = hsl.h / 360;
    const s = hsl.s / 100;
    const l = hsl.l / 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
      a: hsl.a,
    };
  }

  private toHex(hsl: HSL): string {
    const rgb = this.hslToRgb(hsl);
    const toHex = (n: number) => n.toString(16).padStart(2, "0");
    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
  }

  private toHSLString(hsl: HSL): string {
    if (this.options.showAlpha && hsl.a < 1) {
      return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${hsl.a})`;
    }
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  }

  private toRGBString(rgb: RGB): string {
    if (this.options.showAlpha && rgb.a < 1) {
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
    }
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  }

  private isValidHex(hex: string): boolean {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(hex);
  }

  private announceColorChange(): void {
    // Throttled ARIA live region announcement
    if (!this.announceTimeout) {
      this.announceTimeout = setTimeout(() => {
        const announcement = document.createElement("div");
        announcement.setAttribute("role", "status");
        announcement.setAttribute("aria-live", "polite");
        announcement.className = "colorpicker-sr-only";
        announcement.textContent = `Color changed to ${this.formatColor(
          this.currentColor
        )}`;
        this.container?.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
        this.announceTimeout = null;
      }, 500);
    }
  }
  private announceTimeout: ReturnType<typeof setTimeout> | null = null;

  public open(): void {
    if (this.isOpen || !this.container) return;

    this.isOpen = true;
    this.container.style.display = "block";

    if (!this.options.inline) {
      this.positionPicker();
    }

    this.options.onOpen();

    // Focus first interactive element
    setTimeout(() => {
      this.colorBox?.focus();
    }, 0);
  }

  public close(): void {
    if (!this.isOpen || !this.container) return;

    this.isOpen = false;
    if (!this.options.inline) {
      this.container.style.display = "none";
    }

    this.options.onClose();
  }

  public toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private positionPicker(): void {
    if (!this.container) return;

    const inputRect = this.input.getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    let top = inputRect.bottom + window.scrollY + 4;
    const left = inputRect.left + window.scrollX;

    // Check if there's enough space below
    if (this.options.position === "auto") {
      const spaceBelow = viewportHeight - inputRect.bottom;
      const spaceAbove = inputRect.top;

      if (spaceBelow < containerRect.height && spaceAbove > spaceBelow) {
        top = inputRect.top + window.scrollY - containerRect.height - 4;
      }
    } else if (this.options.position === "above") {
      top = inputRect.top + window.scrollY - containerRect.height - 4;
    }

    this.container.style.position = "absolute";
    this.container.style.top = `${top}px`;
    this.container.style.left = `${left}px`;
    this.container.style.zIndex = "9999";
  }

  public setColor(color: string): void {
    this.currentColor = this.parseColor(color);
    this.updateColorDisplay();
  }

  public getColor(): string {
    return this.formatColor(this.currentColor);
  }

  public destroy(): void {
    this.container?.remove();
    ColorPicker.instances.delete(this.input);
  }

  public static getInstance(element: HTMLElement): ColorPicker | undefined {
    return ColorPicker.instances.get(element);
  }
}

// Factory function
export default function colorpicker(
  selector: string | HTMLInputElement,
  options?: ColorPickerOptions
): ColorPicker {
  return new ColorPicker(selector, options);
}
