import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"
import solidSvg from "vite-plugin-solid-svg"
import { ViteAliases } from 'vite-aliases'
import path from 'path'

export default defineConfig({
  plugins: [
    solidPlugin(),
    solidSvg({
      defaultExport: 'component',
    }),
    ViteAliases(),
  ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
