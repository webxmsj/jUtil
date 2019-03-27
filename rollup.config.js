import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const banner = `
/*!
 * ${pkg.name} - v${pkg.version}
 * ${pkg.description}
 * ${pkg.homepage}
 *
 * Copyright (c) 2018 ${pkg.author}
 * Released under ${pkg.license} License
 */
`;

export default [
  {
    input: 'src/index.js',
    output: [
      {
        name: 'util',
        banner,
        file: "dist/util.js",
        format: 'umd'
      },
      {
        banner,
        file: 'dist/util.common.js',
        format: 'cjs'
      },
      {
        banner,
        file: 'dist/util.esm.js',
        format: 'es'
      }
    ],
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs(),
    ],
  },
  {
    input: 'src/util.modular.js',
    output: [
      {
        banner,
        file: 'dist/util.modular.js',
        format: 'es'
      }
    ],
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs(),
    ],
  },
];
