import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import livereload from 'rollup-plugin-livereload'

function serve() {
  let started = false
  return {
    writeBundle() {
      if (!started) {
        started = true
        require('child_process').spawn('serve', ['.'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true
        })
      }
    }
  }
}

export default {
  input: `./app.js`,
  output: {
    sourcemap: false,
    format: 'iife',
    name: 'app',
    file: 'build/bundle.js'
  },
  plugins: [
    svelte({
      dev: true,
      css: (css) => {
        css.write('build/bundle.css', false)
      }
    }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    serve(),
    livereload('.')
  ],
  watch: {
    clearScreen: false
  }
}
