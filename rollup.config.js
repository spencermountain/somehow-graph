import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
// import visualizer from 'rollup-plugin-visualizer'

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'builds/somehow.mjs',
        format: 'esm'
      }
    ],
    plugins: [
      resolve({
        mainFields: ['main', 'module']
      }),
      ,
      json(),
      commonjs()
    ]
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'builds/somehow.js',
        format: 'umd',
        sourcemap: true,
        name: 'somehow'
      }
    ],
    plugins: [
      resolve({
        mainFields: ['main', 'module']
      }),
      json(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ['@babel/preset-env']
      })
    ]
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'builds/somehow.min.js',
        format: 'umd',
        name: 'somehow'
      }
    ],
    plugins: [
      resolve({
        mainFields: ['main', 'module']
      }),
      json(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ['@babel/preset-env']
      }),
      terser()
      // visualizer()
    ]
  }
]
