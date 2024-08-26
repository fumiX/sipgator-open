import { viteStaticCopy } from "vite-plugin-static-copy"
import compression from "vite-plugin-compression2"
import { defineConfig } from "vite"

export default defineConfig({
  base: "",
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "src/assets/*.webmanifest",
          dest: "."
        },
        {
          src: "node_modules/beercss/dist/cdn/*",
          dest: "beercss"
        },
        {
          src: "src/assets/favicon*",
          dest: "."
        }
      ]
    }),
    compression({
      algorithm: "gzip", exclude: [/\.br$/, /\.gz$/]
    }),
    compression({
      algorithm: "brotliCompress", exclude: [/\.br$/, /\.gz$/]
    })
  ]
})
