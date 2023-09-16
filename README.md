# oklab.ts

Convert between RGB and Oklab color space

From [Björn Ottosson, A perceptual color space for image processing] (https://bottosson.github.io/posts/oklab/)

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

## Installation

Import as

```bash
npm install oklab.ts
```

```typescript
import * as oklab from 'oklab.ts'
import { rgb_to_oklab } from 'oklab.ts'

oklab.oklab_to_rgb
```

```html
<script src="https://cdn.jsdelivr.net/npm/oklab.ts/dist/browser.js"></script>
<script>
  console.log(oklab.rgb_to_oklab)
</script>
```

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

## License

This project is forked from [Butterwell's oklab](https://github.com/Butterwell/oklab) licensed under the [MIT license](./LICENSE-MIT)

This project is then licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
