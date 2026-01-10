/**
 * @jest-environment jsdom
 */

import colorpicker, { ColorPicker } from "../../../src/colorpicker/index";

describe("ColorPicker", () => {
  let input: HTMLInputElement;

  beforeEach(() => {
    input = document.createElement("input");
    input.type = "text";
    input.id = "test-color-input";
    document.body.appendChild(input);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should initialize with default options", () => {
    const picker = colorpicker(input);
    expect(picker).toBeInstanceOf(ColorPicker);
    expect(input.value).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it("should accept custom default color", () => {
    const picker = colorpicker(input, {
      defaultColor: "#ff0000",
    });
    expect(input.value).toBe("#ff0000");
  });

  it("should support RGB format", () => {
    const picker = colorpicker(input, {
      format: "rgb",
      defaultColor: "rgb(255, 0, 0)",
    });
    expect(input.value).toMatch(/rgb\(255,\s*0,\s*0\)/);
  });

  it("should support HSL format", () => {
    const picker = colorpicker(input, {
      format: "hsl",
      defaultColor: "hsl(0, 100%, 50%)",
    });
    expect(input.value).toMatch(/hsl\(0,\s*100%,\s*50%\)/);
  });

  it("should parse HEX colors", () => {
    const picker = colorpicker(input, {
      defaultColor: "#3b82f6",
    });
    expect(input.value).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it("should call onChange callback", () => {
    const onChange = jest.fn();
    const picker = colorpicker(input, {
      onChange,
      defaultColor: "#000000",
    });

    expect(onChange).toHaveBeenCalled();
  });

  it("should set color programmatically", () => {
    const picker = colorpicker(input, {
      defaultColor: "#000000",
    });

    picker.setColor("#ff0000");
    expect(input.value).toBe("#ff0000");
  });

  it("should get current color", () => {
    const picker = colorpicker(input, {
      defaultColor: "#ff0000",
    });

    expect(picker.getColor()).toBe("#ff0000");
  });

  it("should support alpha channel", () => {
    const picker = colorpicker(input, {
      format: "hsl",
      showAlpha: true,
      defaultColor: "hsla(0, 100%, 50%, 0.5)",
    });

    expect(input.value).toMatch(/hsla\(0,\s*100%,\s*50%,\s*0\.5\)/);
  });

  it("should destroy properly", () => {
    const picker = colorpicker(input);
    const container = document.querySelector(".colorpicker-container");

    expect(container).toBeTruthy();

    picker.destroy();

    const containerAfter = document.querySelector(".colorpicker-container");
    expect(containerAfter).toBeFalsy();
  });

  it("should retrieve instance from element", () => {
    const picker = colorpicker(input);
    const retrieved = ColorPicker.getInstance(input);

    expect(retrieved).toBe(picker);
  });

  it("should support inline mode", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const picker = colorpicker(input, {
      inline: true,
      appendTo: container,
    });

    const pickerContainer = container.querySelector(".colorpicker-container");
    expect(pickerContainer).toBeTruthy();
  });

  it("should accept selector string", () => {
    const picker = colorpicker("#test-color-input");
    expect(picker).toBeInstanceOf(ColorPicker);
  });

  it("should convert between color formats", () => {
    const picker = colorpicker(input, {
      format: "hex",
    });

    picker.setColor("rgb(255, 0, 0)");
    expect(input.value).toBe("#ff0000");

    picker.setColor("hsl(120, 100%, 50%)");
    expect(input.value).toBe("#00ff00");
  });
});
