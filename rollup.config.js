import typescript from "@rollup/plugin-typescript";
import multi from "@rollup/plugin-multi-entry";
import { terser } from "rollup-plugin-terser";

const input = [
  "./src/index.ts",
  "./src/keyboard.ts",
  "./src/mouse.ts",
  "./src/circle.ts",
  "./src/rectangle.ts",
];

const basePlugins = [ typescript() ];

module.exports = [
  {
    input,
    output: [
      {
        dir: "build/cjs",
        entryFileNames: "[name].js",
        format: "cjs",
      },
    ],
    plugins: basePlugins,
  },
  {
    input,
    output: [
      {
        dir: "build/esm",
        entryFileNames: "[name].js",
        format: "esm",
      },
    ],
    plugins: basePlugins,
  },
  {
    input,
    output: [
      {
        dir: "build/system",
        entryFileNames: "[name].js",
        format: "system",
      },
    ],
    plugins: basePlugins,
  },
  {
    input,
    output: [
      {
        dir: "build/amd",
        entryFileNames: "[name].js",
        format: "amd",
      },
    ],
    plugins: basePlugins,
  },
  {
    input,
    output: [
      {
        name: "ace",
        file: "build/ace.browser.js",
        format: "iife",
      },
    ],
    plugins: [ ...basePlugins, multi() ],
  },
  {
    input,
    output: [
      {
        name: "ace",
        file: "build/ace.browser.min.js",
        format: "iife",
      },
    ],
    plugins: [ ...basePlugins, multi(), terser() ],
  },
  {
    input,
    output: [
      {
        name: "ace",
        file: "build/ace.js",
        format: "umd",
      },
    ],
    plugins: [ ...basePlugins, multi() ],
  },
  {
    input,
    output: [
      {
        name: "ace",
        file: "build/ace.min.js",
        format: "umd",
      },
    ],
    plugins: [ ...basePlugins, multi(), terser() ],
  },
];
