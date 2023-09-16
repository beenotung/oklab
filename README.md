# oklab

Convert between RGB and Oklab color space memory-efficiently in Typescript

From [Björn Ottosson, A perceptual color space for image processing] (https://bottosson.github.io/posts/oklab/)

Implemented with in-place update to reduce memory overhead.

## About Oklab color space

Oklab color consists of three components:

"L" is luminosity,
"a" runs from green to red
"b" runs from blue to yellow

The Oklab color space is a perceptually uniform color space developed by Björn Ottosson. It attempts to fit the human visual system, offering a more accurate representation of color differences as perceived by humans. The space is designed in a way that similar colors are close together, making it easier to work with than more traditional color spaces like RGB.

## Installation

Import as

```bash
npm install @beenotung/oklab
```

```typescript
import * as oklab from '@beenotung/oklab'
import { rgb_to_oklab } from '@beenotung/oklab'

oklab.oklab_to_rgb
```

```html
<script src="https://unpkg.com/@beenotung/oklab/build/umd/oklab.umd.js"></script>
<script>
  console.log(oklab)
</script>
```

```html
<script type="module">
  import * as oklab from 'https://unpkg.com/@beenotung/oklab@1.2.0/build/module/index.js'
  console.log(oklab)
</script>
```

## Usage Example

```typescript
import {
  new_oklab,
  new_rgb,
  oklab_to_rgb,
  rgb_to_css_string,
  rgb_to_oklab,
} from '@beenotung/oklab'

const oklab = new_oklab()

rgb_to_oklab({ r: 153, g: 153, b: 153 }, oklab)
const gray = { ...oklab }

rgb_to_oklab({ r: 0, g: 255, b: 0 }, oklab)
const green = { ...oklab }

oklab.L = (gray.L + green.L) / 2
oklab.a = (gray.a + green.a) / 2
oklab.b = (gray.b + green.b) / 2

const between = new_rgb()
oklab_to_rgb(oklab, between)

rgb_to_css_string(between) == 'rgb(122, 205, 116)'

//    gray: rgb(153, 153, 153)
//   green: rgb(  0, 255,   0)
// between: rgb(122, 205, 116)
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
