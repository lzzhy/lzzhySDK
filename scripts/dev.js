/*
 * @Author: lich
 * @Date: 2022-09-14 16:03:19
 * @Last Modified by: lich
 * @Last Modified time: 2022-09-14 16:53:07
 * @desc:
 * 开发模式现实的功能,
 * 可以开启不同模块的打包, 例如
 * npm run dev:reactivity | node ./dev reactivity  监听reactivity模块的编译和输出
 * npm run dev:shared | node ./dev shared   监听shared模块的编译和输出
 */

const { build } = require("esbuild")
const { resolve } = require("path")
var argv = require("minimist")(process.argv.slice(2))
const target = argv._[0] || "reactivity"
const format = argv.f || "global"

const pkg = require(resolve(__dirname, `../packages/${target}/package.json`))
// resolve output
const outputFormat = format.startsWith("global")
  ? "iife"
  : format === "cjs"
  ? "cjs"
  : "esm"

const outfile = resolve(
  __dirname,
  `../packages/${target}/dist/${target}.${format}.js`
)

/**
 * Enabling watch mode on the build API tells esbuild to listen for changes on the file system and to rebuild whenever a file changes that could invalidate the build
 * @see: https://esbuild.github.io/api/#target
 */
build({
  entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)],
  outfile,
  format: outputFormat,
  bundle: true,
  globalName: pkg.buildOptions.name,
  sourcemap: "inline",
  watch: {
    onRebuild(error, result) {
      if (error) console.error("watch build failed:", error)
      else console.log("watch build succeeded:", result)
    }
  }
}).then(() => {
  console.log("watching...")
})
