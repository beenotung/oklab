# oklab

Oklab color in Typescript

From [Björn Ottosson, A perceptual color space for image processing] (https://bottosson.github.io/posts/oklab/)

"L" is luminosity,  
"a" runs from green to red  
"b" runs from blue to yellow  

```javascript
import { toOklab, rgbString } from '@butterwell/oklab';

const gray = toOklab({ r: 153, g: 153, b: 153 });
const green = toOklab({ r: 0, g: 255, b: 0 });
const between = {
    L: (gray.L + green.L) / 2,
    a: (gray.a + green.a) / 2,
    b: (gray.b + green.b) / 2,
};
// 'rgb(122, 205, 116)'

```