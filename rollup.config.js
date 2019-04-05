import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import pkg from './package.json';

// two separate objects for two separate outputs
// firstly esnext and cjs for bundlers, then umd for browsers
// treat non-babel polyfills as external, so the bundlers can import them themselves
export default [{
    input: pkg.entry,
    output: [{
        file: pkg.module,
        format: 'es'
    }, {
        file: pkg.main,
        format: 'cjs'
    }],
    external: [
        'whatwg-fetch',
        'es6-promise/auto'
    ]
}, {
    input: pkg.entry,
    plugins: [
        eslint(),
        resolve(),
        commonjs(),
        babel(),
        terser()
    ],
    output: {
        sourcemap: true,
        file: pkg.browser,
        format: 'umd',
        name: 'Mehrsprachig'
    }
}];
