# oklab.ts

Convert between RGB and Oklab color space

[![npm Package Version](https://img.shields.io/npm/v/oklab.ts)](https://www.npmjs.com/package/oklab.ts)
[![Minified Package Size](https://img.shields.io/bundlephobia/min/oklab.ts)](https://bundlephobia.com/package/oklab.ts)
[![Minified and Gzipped Package Size](https://img.shields.io/bundlephobia/minzip/oklab.ts)](https://bundlephobia.com/package/oklab.ts)

From [Björn Ottosson, A perceptual color space for image processing](https://bottosson.github.io/posts/oklab/) and [Christopher Buck, Typescript oklab](https://github.com/Butterwell/oklab)

## Features

- support in-place update to reduce memory overhead
- support functional style (return new object if output object is not given)
- out-of-the-box typescript support
- support both node.js and browser (available on CDN)

## About Oklab color space

Oklab color consists of three components:

"L" is luminosity,
"a" runs from green to red,
"b" runs from blue to yellow

The Oklab color space is a perceptually uniform color space developed by Björn Ottosson. It attempts to fit the human visual system, offering a more accurate representation of color differences as perceived by humans. The space is designed in a way that similar colors are close together, making it easier to work with than more traditional color spaces like RGB.

### Comparing Oklab to RGB

3 illustrations (color gradients and colorful image) on the color channels of RGB and Lab can be seen in [./compare/README.md](./compare/README.md)

Color Channels Visualizer: https://oklab-demo.static.domains

### Comparing Oklab to HSV

(Source: https://bottosson.github.io/posts/oklab/)

Here’s an Oklab color gradient with varying hue and constant lightness and chroma.

![Oklab varying hue plot](https://bottosson.github.io/img/oklab/hue_oklab.png)

Compare this to a similar plot of a HSV color gradient with varying hue and constant value and saturation (HSV using the sRGB color space).

![HSV varying hue plot](https://bottosson.github.io/img/oklab/hue_hsv.png)

The gradient is quite uneven and there are clear differences in lightness for different hues. Yellow, magenta and cyan appear much lighter than red and blue.

Here is lightness of the HSV plot, as predicted by Oklab:

![HSV varying lightness plot](https://bottosson.github.io/img/oklab/hue_hsv_lightness.png)

## Installation

Import as commonjs package from nodejs / frontend project

```bash
npm install oklab.ts
```

```typescript
import * as oklab from 'oklab.ts'
import { rgb_to_oklab } from 'oklab.ts'

console.log(oklab.oklab_to_rgb)
```

Or import as plain javascript in browser

```html
<script src="https://cdn.jsdelivr.net/npm/oklab.ts/dist/browser.js"></script>
<script>
  console.log(oklab.rgb_to_oklab)
</script>
```

Or import as ES Module from browser

```html
<script type="module">
  // use jsdelivr CDN
  import { oklab_to_rgb } from 'https://cdn.jsdelivr.net/npm/oklab.ts/dist/esm.js'
  console.log(oklab_to_rgb)

  // or use unpkg CDN
  import * as oklab from 'https://unpkg.com/oklab.ts/dist/esm.js'
  console.log(oklab.rgb_to_oklab)
</script>
```

## Usage Example

```typescript
import { hex_to_rgb, rgb_to_oklab, new_oklab } from 'oklab.ts'

let rgb = hex_to_rgb('#c0ffee')
console.log(rgb)
// { r: 192, g: 255, b: 0 }

console.log(rgb_to_oklab(rgb))
// { L: 0.923, a: -0.136, b: 0.19 }

let oklab = new_oklab()
rgb_to_oklab(rgb, oklab)
console.log(oklab)
// { L: 0.923, a: -0.136, b: 0.19 }
```

Details see [examples/between.ts](./examples/between.ts) and [oklab.spec.ts](./src/lib/oklab.spec.ts)

## Typescript Types

Below are the exported types, functions and constants from oklab.ts:

```typescript
export type rgb = {
  r: number
  g: number
  b: number
}

export type oklab = {
  L: number
  a: number
  b: number
}

export function new_rgb(): rgb

export function new_oklab(): oklab

export function rgb_to_oklab(c: rgb): oklab
export function rgb_to_oklab(c: rgb, o: oklab): void

export function oklab_to_rgb(ok: oklab): rgb
export function oklab_to_rgb(ok: oklab, c: rgb): void

/**
 * @example "oklab(0.5 0.2 0.1)"
 * @example "oklab(0.5 0.2 0.1 / 50%)"
 * @example "oklab(0.5 0.2 0.1 / 0.5)"
 */
export function oklab_to_css_string(ok: oklab, alpha?: number): string

/**
 * @example "rgb(20 80 120)"
 * @example "rgb(20 80 120 / 50%)"
 * @example "rgb(20 80 120 / 0.5)"
 */
export function rgb_to_css_string(c: rgb, alpha?: number): string

export function hex_to_rgb(hex: string): rgb
export function hex_to_rgb(hex: string, c: rgb): void

/**
 * Minimum and maximum L, a, and b values
 * (as seen from all the possible conversions from rgb)
 */
export const range: {
  L: {
    min: 0
    max: 0.9999999934735462
    range: 0.9999999934735462
  }
  a: {
    min: -0.23388757418790818
    max: 0.27621639742350523
    range: 0.5101039716114134
  }
  b: {
    min: -0.3115281476783751
    max: 0.19856975465179516
    range: 0.5100979023301703
  }
}
```

## License

This project is forked from [Butterwell's oklab](https://github.com/Butterwell/oklab) licensed under the [MIT license](./LICENSE)

This project is then licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
