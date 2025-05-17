import { nodeResolve } from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"
import gzipPlugin from "rollup-plugin-gzip"

import { brotliCompress } from "zlib"
import { promisify } from "util"

/* global Buffer */
const brotliPromise = promisify(brotliCompress)

export default [
  {
    input: "./src/index.js",
    output: [
      {
        file: "./dist/actiontext-lexical.js",
        format: "esm"
      },

      {
        file: "./dist/actiontext-lexical.min.js",
        format: "esm",
        plugins: [ terser() ]
      }
    ],
    plugins: [
      nodeResolve(),
      gzipPlugin({
        gzipOptions: { level: 9 }
      }),
      gzipPlugin({
        customCompression: content => brotliPromise(Buffer.from(content)),
        fileName: ".br"
      })
    ]
  }
]
