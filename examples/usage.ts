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
