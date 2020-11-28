import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import {
  name,
  version,
  homepage,
  author,
  browser,
  module,
  main,
} from './package.json'

export const banner = `/*!
 * ${name} v${version}
 * ${homepage}
 *
 * Copyright (c) 2020-present ${author}
 * Released under the MIT license
 * ${homepage}/blob/master/LICENSE
 */`

export default {
  input: './src/index.ts',
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  output: [
    {
      file: module,
      format: 'es',
      banner,
    },
    {
      file: main,
      format: 'cjs',
      banner,
    },
    {
      file: browser,
      format: 'iife',
      name: 'dateFormatter',
    },
  ],
}
