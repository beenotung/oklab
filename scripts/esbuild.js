#!/usr/bin/env node

let fs = require('fs/promises')
let esbuild = require('esbuild')
let { nodeExternalsPlugin } = require('esbuild-node-externals')

Promise.all([
  esbuild.build({
    entryPoints: ['./src/oklab.ts'],
    outfile: 'dist/cjs.js',
    bundle: true,
    minify: false,
    format: 'cjs',
    platform: 'node',
    sourcemap: false,
    sourcesContent: false,
    target: 'node12',
    plugins: [nodeExternalsPlugin()],
  }),
  esbuild.build({
    entryPoints: ['./src/oklab.ts'],
    outfile: 'dist/esm.js',
    bundle: true,
    minify: false,
    format: 'esm',
    platform: 'node',
    sourcemap: false,
    sourcesContent: false,
    target: 'node14',
    plugins: [nodeExternalsPlugin()],
  }),
  esbuild.build({
    entryPoints: ['./src/browser.ts'],
    outfile: 'dist/browser.js',
    bundle: true,
    minify: false,
    format: 'iife',
    platform: 'browser',
    sourcemap: false,
    sourcesContent: false,
    target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    plugins: [nodeExternalsPlugin()],
  }),
])
  .then(() => fs.copyFile('./src/oklab.ts', 'dist/oklab.ts'))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
