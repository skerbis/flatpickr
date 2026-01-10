var ColorPicker = (function () {
    function ColorPicker(element, options) {
        if (options === void 0) { options = {}; }
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.container = null;
        this.colorBox = null;
        this.hueSlider = null;
        this.alphaSlider = null;
        this.hexInput = null;
        this.currentColor = { h: 0, s: 100, l: 50, a: 1 };
        this.isOpen = false;
        this.saturationPointer = null;
        this.announceTimeout = null;
        this.input =
            typeof element === "string"
                ? document.querySelector(element)
                : element;
        if (!this.input) {
            throw new Error("ColorPicker: Invalid element selector");
        }
        this.options = {
            defaultColor: options.defaultColor || "#3b82f6",
            format: options.format || "hex",
            showAlpha: (_a = options.showAlpha) !== null && _a !== void 0 ? _a : false,
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
            inline: (_b = options.inline) !== null && _b !== void 0 ? _b : false,
            onChange: options.onChange || (function () { }),
            onOpen: options.onOpen || (function () { }),
            onClose: options.onClose || (function () { }),
            appendTo: options.appendTo || document.body,
            position: options.position || "auto",
            closeOnSelect: (_c = options.closeOnSelect) !== null && _c !== void 0 ? _c : true,
            ariaLabels: {
                hue: ((_d = options.ariaLabels) === null || _d === void 0 ? void 0 : _d.hue) || "Hue",
                saturation: ((_e = options.ariaLabels) === null || _e === void 0 ? void 0 : _e.saturation) || "Saturation and Lightness",
                lightness: ((_f = options.ariaLabels) === null || _f === void 0 ? void 0 : _f.lightness) || "Lightness",
                alpha: ((_g = options.ariaLabels) === null || _g === void 0 ? void 0 : _g.alpha) || "Alpha",
                presets: ((_h = options.ariaLabels) === null || _h === void 0 ? void 0 : _h.presets) || "Preset colors",
            },
        };
        this.init();
        ColorPicker.instances.set(this.input, this);
    }
    ColorPicker.prototype.init = function () {
        var initialColor = this.input.value || this.options.defaultColor;
        this.currentColor = this.parseColor(initialColor);
        this.buildColorPicker();
        this.setupEventListeners();
        this.updateColorDisplay();
        if (this.options.inline) {
            this.open();
        }
    };
    ColorPicker.prototype.buildColorPicker = function () {
        this.container = document.createElement("div");
        this.container.className = "colorpicker-container";
        this.container.setAttribute("role", "dialog");
        this.container.setAttribute("aria-label", "Color picker");
        this.container.style.display = "none";
        var content = "\n      <div class=\"colorpicker-content\">\n        <div class=\"colorpicker-saturation\" \n             role=\"slider\" \n             aria-label=\"" + this.options.ariaLabels.saturation + "\"\n             aria-valuemin=\"0\"\n             aria-valuemax=\"100\"\n             aria-valuenow=\"" + this.currentColor.s + "\"\n             tabindex=\"0\">\n          <div class=\"colorpicker-saturation-overlay\"></div>\n          <div class=\"colorpicker-saturation-pointer\" role=\"presentation\"></div>\n        </div>\n        \n        <div class=\"colorpicker-controls\">\n          <div class=\"colorpicker-sliders\">\n            <div class=\"colorpicker-slider-group\">\n              <label for=\"colorpicker-hue\">\n                <span class=\"colorpicker-label\">" + this.options.ariaLabels.hue + "</span>\n              </label>\n              <input \n                type=\"range\" \n                id=\"colorpicker-hue\"\n                class=\"colorpicker-slider colorpicker-hue-slider\"\n                min=\"0\" \n                max=\"360\" \n                value=\"" + this.currentColor.h + "\"\n                aria-label=\"" + this.options.ariaLabels.hue + "\"\n              />\n            </div>\n            " + (this.options.showAlpha
            ? "\n              <div class=\"colorpicker-slider-group\">\n                <label for=\"colorpicker-alpha\">\n                  <span class=\"colorpicker-label\">" + this.options.ariaLabels.alpha + "</span>\n                </label>\n                <input \n                  type=\"range\" \n                  id=\"colorpicker-alpha\"\n                  class=\"colorpicker-slider colorpicker-alpha-slider\"\n                  min=\"0\" \n                  max=\"100\" \n                  value=\"" + this.currentColor.a * 100 + "\"\n                  aria-label=\"" + this.options.ariaLabels.alpha + "\"\n                />\n              </div>\n            "
            : "") + "\n          </div>\n          \n          <div class=\"colorpicker-preview\">\n            <div class=\"colorpicker-preview-color\" role=\"presentation\"></div>\n          </div>\n        </div>\n        \n        <div class=\"colorpicker-input-group\">\n          <label for=\"colorpicker-hex\">\n            <span class=\"colorpicker-sr-only\">Color value</span>\n          </label>\n          <input \n            type=\"text\" \n            id=\"colorpicker-hex\"\n            class=\"colorpicker-input\"\n            placeholder=\"#000000\"\n            aria-label=\"Color value in hexadecimal\"\n          />\n        </div>\n        \n        " + (this.options.presetColors.length > 0
            ? "\n          <div class=\"colorpicker-presets\" role=\"group\" aria-label=\"" + this.options.ariaLabels.presets + "\">\n            " + this.options.presetColors
                .map(function (color) { return "\n              <button \n                type=\"button\"\n                class=\"colorpicker-preset\" \n                style=\"background-color: " + color + "\"\n                data-color=\"" + color + "\"\n                aria-label=\"Select color " + color + "\"\n              ></button>\n            "; })
                .join("") + "\n          </div>\n        "
            : "") + "\n      </div>\n    ";
        this.container.innerHTML = content;
        this.colorBox = this.container.querySelector(".colorpicker-saturation");
        this.saturationPointer = this.container.querySelector(".colorpicker-saturation-pointer");
        this.hueSlider = this.container.querySelector(".colorpicker-hue-slider");
        this.alphaSlider = this.container.querySelector(".colorpicker-alpha-slider");
        this.hexInput = this.container.querySelector(".colorpicker-input");
        this.options.appendTo.appendChild(this.container);
    };
    ColorPicker.prototype.setupEventListeners = function () {
        var _this = this;
        var _a;
        this.input.addEventListener("click", function () {
            if (!_this.options.inline) {
                _this.toggle();
            }
        });
        this.input.addEventListener("change", function () {
            _this.currentColor = _this.parseColor(_this.input.value);
            _this.updateColorDisplay();
        });
        if (this.hueSlider) {
            this.hueSlider.addEventListener("input", function (e) {
                _this.currentColor.h = parseInt(e.target.value);
                _this.updateColorDisplay();
                _this.announceColorChange();
            });
        }
        if (this.alphaSlider) {
            this.alphaSlider.addEventListener("input", function (e) {
                _this.currentColor.a =
                    parseInt(e.target.value) / 100;
                _this.updateColorDisplay();
                _this.announceColorChange();
            });
        }
        if (this.colorBox) {
            this.colorBox.addEventListener("mousedown", function (e) {
                return _this.onSaturationMouseDown(e);
            });
            this.colorBox.addEventListener("keydown", function (e) {
                return _this.onSaturationKeyDown(e);
            });
        }
        if (this.hexInput) {
            this.hexInput.addEventListener("input", function (e) {
                var value = e.target.value;
                if (_this.isValidHex(value)) {
                    _this.currentColor = _this.parseColor(value);
                    _this.updateColorDisplay(false);
                }
            });
        }
        var presets = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelectorAll(".colorpicker-preset");
        presets === null || presets === void 0 ? void 0 : presets.forEach(function (preset) {
            preset.addEventListener("click", function (e) {
                var color = e.currentTarget.dataset.color;
                _this.currentColor = _this.parseColor(color);
                _this.updateColorDisplay();
                if (_this.options.closeOnSelect) {
                    _this.close();
                }
            });
        });
        if (!this.options.inline) {
            document.addEventListener("mousedown", function (e) {
                var _a;
                if (_this.isOpen &&
                    !((_a = _this.container) === null || _a === void 0 ? void 0 : _a.contains(e.target)) &&
                    e.target !== _this.input) {
                    _this.close();
                }
            });
        }
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && _this.isOpen && !_this.options.inline) {
                _this.close();
                _this.input.focus();
            }
        });
    };
    ColorPicker.prototype.onSaturationMouseDown = function (e) {
        var _this = this;
        e.preventDefault();
        this.updateSaturationFromMouse(e);
        var onMouseMove = function (e) {
            _this.updateSaturationFromMouse(e);
        };
        var onMouseUp = function () {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };
    ColorPicker.prototype.updateSaturationFromMouse = function (e) {
        if (!this.colorBox)
            return;
        var rect = this.colorBox.getBoundingClientRect();
        var x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        var y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
        this.currentColor.s = (x / rect.width) * 100;
        this.currentColor.l = 100 - (y / rect.height) * 100;
        this.updateColorDisplay();
        this.announceColorChange();
    };
    ColorPicker.prototype.onSaturationKeyDown = function (e) {
        var step = e.shiftKey ? 10 : 1;
        var handled = false;
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
    };
    ColorPicker.prototype.updateColorDisplay = function (updateInput) {
        var _a;
        if (updateInput === void 0) { updateInput = true; }
        if (this.colorBox) {
            this.colorBox.style.backgroundColor = "hsl(" + this.currentColor.h + ", 100%, 50%)";
        }
        if (this.saturationPointer && this.colorBox) {
            var x = (this.currentColor.s / 100) * 100;
            var y = (1 - this.currentColor.l / 100) * 100;
            this.saturationPointer.style.left = x + "%";
            this.saturationPointer.style.top = y + "%";
        }
        var preview = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelector(".colorpicker-preview-color");
        if (preview) {
            preview.style.backgroundColor = this.toHSLString(this.currentColor);
        }
        if (this.hexInput && updateInput) {
            this.hexInput.value = this.toHex(this.currentColor);
        }
        if (this.hueSlider) {
            this.hueSlider.value = String(this.currentColor.h);
        }
        if (this.alphaSlider) {
            this.alphaSlider.value = String(this.currentColor.a * 100);
        }
        if (updateInput) {
            this.input.value = this.formatColor(this.currentColor);
            this.options.onChange(this.input.value);
        }
    };
    ColorPicker.prototype.formatColor = function (color) {
        switch (this.options.format) {
            case "hsl":
                return this.toHSLString(color);
            case "rgb":
                return this.toRGBString(this.hslToRgb(color));
            case "hex":
            default:
                return this.toHex(color);
        }
    };
    ColorPicker.prototype.parseColor = function (colorString) {
        colorString = colorString.trim();
        if (colorString.startsWith("#")) {
            return this.hexToHsl(colorString);
        }
        var rgbMatch = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (rgbMatch) {
            var rgb = {
                r: parseInt(rgbMatch[1]),
                g: parseInt(rgbMatch[2]),
                b: parseInt(rgbMatch[3]),
                a: rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1,
            };
            return this.rgbToHsl(rgb);
        }
        var hslMatch = colorString.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/);
        if (hslMatch) {
            return {
                h: parseInt(hslMatch[1]),
                s: parseInt(hslMatch[2]),
                l: parseInt(hslMatch[3]),
                a: hslMatch[4] ? parseFloat(hslMatch[4]) : 1,
            };
        }
        return this.currentColor;
    };
    ColorPicker.prototype.hexToHsl = function (hex) {
        hex = hex.replace("#", "");
        var r = parseInt(hex.substring(0, 2), 16) / 255;
        var g = parseInt(hex.substring(2, 4), 16) / 255;
        var b = parseInt(hex.substring(4, 6), 16) / 255;
        var a = hex.length === 8 ? parseInt(hex.substring(6, 8), 16) / 255 : 1;
        return this.rgbToHsl({ r: r * 255, g: g * 255, b: b * 255, a: a });
    };
    ColorPicker.prototype.rgbToHsl = function (rgb) {
        var r = rgb.r / 255;
        var g = rgb.g / 255;
        var b = rgb.b / 255;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var h = 0;
        var s = 0;
        var l = (max + min) / 2;
        if (max !== min) {
            var d = max - min;
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
    };
    ColorPicker.prototype.hslToRgb = function (hsl) {
        var h = hsl.h / 360;
        var s = hsl.s / 100;
        var l = hsl.l / 100;
        var r, g, b;
        if (s === 0) {
            r = g = b = l;
        }
        else {
            var hue2rgb = function (p, q, t) {
                if (t < 0)
                    t += 1;
                if (t > 1)
                    t -= 1;
                if (t < 1 / 6)
                    return p + (q - p) * 6 * t;
                if (t < 1 / 2)
                    return q;
                if (t < 2 / 3)
                    return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
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
    };
    ColorPicker.prototype.toHex = function (hsl) {
        var rgb = this.hslToRgb(hsl);
        var toHex = function (n) { return n.toString(16).padStart(2, "0"); };
        return "#" + toHex(rgb.r) + toHex(rgb.g) + toHex(rgb.b);
    };
    ColorPicker.prototype.toHSLString = function (hsl) {
        if (this.options.showAlpha && hsl.a < 1) {
            return "hsla(" + hsl.h + ", " + hsl.s + "%, " + hsl.l + "%, " + hsl.a + ")";
        }
        return "hsl(" + hsl.h + ", " + hsl.s + "%, " + hsl.l + "%)";
    };
    ColorPicker.prototype.toRGBString = function (rgb) {
        if (this.options.showAlpha && rgb.a < 1) {
            return "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + rgb.a + ")";
        }
        return "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")";
    };
    ColorPicker.prototype.isValidHex = function (hex) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(hex);
    };
    ColorPicker.prototype.announceColorChange = function () {
        var _this = this;
        if (!this.announceTimeout) {
            this.announceTimeout = setTimeout(function () {
                var _a;
                var announcement = document.createElement("div");
                announcement.setAttribute("role", "status");
                announcement.setAttribute("aria-live", "polite");
                announcement.className = "colorpicker-sr-only";
                announcement.textContent = "Color changed to " + _this.formatColor(_this.currentColor);
                (_a = _this.container) === null || _a === void 0 ? void 0 : _a.appendChild(announcement);
                setTimeout(function () { return announcement.remove(); }, 1000);
                _this.announceTimeout = null;
            }, 500);
        }
    };
    ColorPicker.prototype.open = function () {
        var _this = this;
        if (this.isOpen || !this.container)
            return;
        this.isOpen = true;
        this.container.style.display = "block";
        if (!this.options.inline) {
            this.positionPicker();
        }
        this.options.onOpen();
        setTimeout(function () {
            var _a;
            (_a = _this.colorBox) === null || _a === void 0 ? void 0 : _a.focus();
        }, 0);
    };
    ColorPicker.prototype.close = function () {
        if (!this.isOpen || !this.container)
            return;
        this.isOpen = false;
        if (!this.options.inline) {
            this.container.style.display = "none";
        }
        this.options.onClose();
    };
    ColorPicker.prototype.toggle = function () {
        if (this.isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    };
    ColorPicker.prototype.positionPicker = function () {
        if (!this.container)
            return;
        var inputRect = this.input.getBoundingClientRect();
        var containerRect = this.container.getBoundingClientRect();
        var viewportHeight = window.innerHeight;
        var top = inputRect.bottom + window.scrollY + 4;
        var left = inputRect.left + window.scrollX;
        if (this.options.position === "auto") {
            var spaceBelow = viewportHeight - inputRect.bottom;
            var spaceAbove = inputRect.top;
            if (spaceBelow < containerRect.height && spaceAbove > spaceBelow) {
                top = inputRect.top + window.scrollY - containerRect.height - 4;
            }
        }
        else if (this.options.position === "above") {
            top = inputRect.top + window.scrollY - containerRect.height - 4;
        }
        this.container.style.position = "absolute";
        this.container.style.top = top + "px";
        this.container.style.left = left + "px";
        this.container.style.zIndex = "9999";
    };
    ColorPicker.prototype.setColor = function (color) {
        this.currentColor = this.parseColor(color);
        this.updateColorDisplay();
    };
    ColorPicker.prototype.getColor = function () {
        return this.formatColor(this.currentColor);
    };
    ColorPicker.prototype.destroy = function () {
        var _a;
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.remove();
        ColorPicker.instances.delete(this.input);
    };
    ColorPicker.getInstance = function (element) {
        return ColorPicker.instances.get(element);
    };
    ColorPicker.instances = new Map();
    return ColorPicker;
}());
export { ColorPicker };
export default function colorpicker(selector, options) {
    return new ColorPicker(selector, options);
}
