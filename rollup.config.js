import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

const input = "./src/index.ts";
const basePlugins = [ typescript() ];
const outputFolder = "dist";
const name = "ace";

module.exports = [
  {
    input,
    output: { file: `${outputFolder}/${name}.cjs.js`, format: "cjs" },
    plugins: basePlugins,
  },
  {
    input,
    output: { file: `${outputFolder}/${name}.esm.js`, format: "esm" },
    plugins: basePlugins,
  },
  {
    input,
    output: { file: `${outputFolder}/${name}.system.js`, format: "system" },
    plugins: basePlugins,
  },
  {
    input,
    output: { file: `${outputFolder}/${name}.amd.js`, format: "amd" },
    plugins: basePlugins,
  },
  {
    input,
    output: { name, file: `${outputFolder}/${name}.browser.js`, format: "iife" },
    plugins: basePlugins,
  },
  {
    input,
    output: { name, file: `${outputFolder}/${name}.browser.min.js`, format: "iife" },
    plugins: [ ...basePlugins, terser() ],
  },
  {
    input,
    output: { name, file: `${outputFolder}/${name}.js`, format: "umd" },
    plugins: basePlugins,
  },
  {
    input,
    output: { name, file: `${outputFolder}/${name}.min.js`, format: "umd" },
    plugins: [ ...basePlugins, terser() ],
  },
];
