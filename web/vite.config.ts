import { viteStaticCopy } from "vite-plugin-static-copy"
import compression from "vite-plugin-compression2"
import { defineConfig } from "vite"

export default defineConfig({
  base: "",
  build: {
    chunkSizeWarningLimit: 1000,
    rolldownOptions: {
      external: ["ws"]
    }
  },
  plugins: [
    {
      name: "stub-ws",
      enforce: "pre",
      resolveId(id) { if (id === "ws") { return"\0ws-stub" } },
      load(id) { if (id === "\0ws-stub") { return "export default {}"}}
    },
    viteStaticCopy({
      targets: [
        {
          src: "src/assets/*.webmanifest",
          dest: ".",
          rename: { stripBase: true }
        },
        {
          src: "node_modules/beercss/dist/cdn/*",
          dest: "beercss",
          rename: { stripBase: true }
        },
        {
          src: "src/assets/favicon*",
          dest: ".",
          rename: { stripBase: true }
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
