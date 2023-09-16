import {
  new_oklab,
  new_rgb,
  oklab,
  oklab_to_css_string,
  oklab_to_rgb,
  rgb,
  rgb_to_css_string,
  rgb_to_oklab,
} from '@beenotung/oklab'

const gray: rgb = { r: 153, g: 153, b: 153 }
const green: rgb = { r: 0, g: 255, b: 0 }

const oklab: oklab = new_oklab()
const between: rgb = new_rgb()

let L = 0
let a = 0
let b = 0

rgb_to_oklab(gray, oklab)
L += oklab.L
a += oklab.a
b += oklab.b

rgb_to_oklab(green, oklab)
L += oklab.L
a += oklab.a
b += oklab.b

oklab.L = L / 2
oklab.a = a / 2
oklab.b = b / 2

oklab_to_rgb(oklab, between)

console.log('gray:', rgb_to_css_string(gray))
console.log('green:', rgb_to_css_string(green))
console.log('between:', rgb_to_css_string(between))
console.log('oklab:', oklab_to_css_string(oklab))
// gray: rgb(153, 153, 153)
// green: rgb(0, 255, 0)
// between: rgb(122, 205, 116)
// oklab: oklab(0.7747, -0.1169, 0.0897)
