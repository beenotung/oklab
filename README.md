# oklab

Oklab color in Typescript

From [Björn Ottosson, A perceptual color space for image processing] (https://bottosson.github.io/posts/oklab/)

"L" is luminosity,  
"a" runs from green to red  
"b" runs from blue to yellow  

```javascript
import { toOklab, rgbString } from '@butterwell/oklab';

let gray = toOklab('#999999')
let green = toOklab('#00FF00')
let between = {
    L: (gray.L + green.L) / 2,
    a: (gray.a + green.a) / 2,
    b: (gray.b + green.b) / 2,
}
// 'rgb(122, 205, 116)'

```