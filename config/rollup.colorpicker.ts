import typescript from "rollup-plugin-typescript";
import babel from "rollup-plugin-babel";
import { resolve } from "path";
import * as pkg from "../package.json";
import { RollupOptions } from "rollup";

export const getColorPickerConfig = (): RollupOptions => ({
  input: "./src/colorpicker/index.ts",
  output: {
    file: "dist/colorpicker.js",
    name: "colorpicker",
    format: "umd",
    exports: "named",
    banner: `/* Pickit ColorPicker v${pkg.version}, @license MIT */`,
  },
  onwarn(warning) {
    if (typeof warning === "string") throw Error(warning);
    else if (warning.code !== "CIRCULAR_DEPENDENCY") {
      throw Error(warning.message);
    }
  },

  plugins: [
    typescript({ tsconfig: resolve("./src/tsconfig.json", __dirname) }),
    babel({ runtimeHelpers: true }),
  ],
});

export default getColorPickerConfig();
