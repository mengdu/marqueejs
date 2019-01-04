const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const Eslint = require('rollup-plugin-eslint')
const babel = require('rollup-plugin-babel')
const Uglify = require('rollup-plugin-uglify')
const style = require('rollup-plugin-style')
const pkg = require('./package.json')

const banner =
  '/*!\n' +
  ' * Build version v' + pkg.version + '\n' +
  ' * Create by lanyue@qq.com\n' +
  ' * Created at ' + new Date() + '\n' +
  ' */'

const isProduction = process.env.NODE_ENV === 'production'

module.exports = [
  {
    input: 'src/index.js',
    output: [
      {
        // window.Marquee
        name: 'Marquee',
        file: isProduction ? 'dist/index.min.js' : 'dist/index.js',
        format: 'umd',
        // banner: banner,
        sourcemap: false
      }
      // { file: 'dist/index.cjs.js', format: 'cjs', banner: banner },
      // { file: 'dist/index.esm.js', format: 'esm', banner: banner },
      // { file: 'dist/index.amd.js', format: 'amd', banner: banner },
      // { file: 'dist/index.iife.js', format: 'iife', name: 'Marquee', banner: banner }
    ],
    plugins: [
      Eslint.eslint({
        exclude: ['node_modules/**']
      }),
      resolve(),
      commonjs(),
      style(),
      babel({
        exclude: 'node_modules/**'
      }),
      (isProduction && Uglify.uglify()),
      {
        name: 'banner',
        renderChunk (code) {
          return banner + '\n' + code
        }
      }
    ]
  },
  {
    input: 'example/index.js',
    output: {
      file: 'example/dist/js/index.js',
      format: 'iife',
      name: ''
    },
    plugins: [
      style({
        output: 'style'
      })
      // {
      //   name: 'style',
      //   transform: function (code, id) {
      //     console.log(code, id)
      //     return null
      //   }
      // }
    ],
    watch: {
      clearScreen: false
    }
  }
]
