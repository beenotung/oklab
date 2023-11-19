import { fileToBase64String } from '@beenotung/tslib/file'
import { new_oklab, new_rgb, range, rgb_to_oklab } from 'oklab.ts/dist/oklab'

declare let sizeBox: HTMLDivElement

declare let fileInput: HTMLInputElement

declare let image: HTMLImageElement

declare let rawCanvas: HTMLCanvasElement

declare let redCanvas: HTMLCanvasElement
declare let greenCanvas: HTMLCanvasElement
declare let blueCanvas: HTMLCanvasElement

declare let lCanvas: HTMLCanvasElement
declare let aCanvas: HTMLCanvasElement
declare let bCanvas: HTMLCanvasElement

let rawContext = rawCanvas.getContext('2d')!

let redContext = redCanvas.getContext('2d')!
let greenContext = greenCanvas.getContext('2d')!
let blueContext = blueCanvas.getContext('2d')!

let lContext = lCanvas.getContext('2d')!
let aContext = aCanvas.getContext('2d')!
let bContext = bCanvas.getContext('2d')!

fileInput.onchange = async () => {
  let file = fileInput.files?.[0]
  if (!file) return
  let dataUrl = await fileToBase64String(file)
  image.src = dataUrl
}

image.onload = () => {
  let w = image.naturalWidth
  let h = image.naturalHeight

  rawCanvas.width = w
  redCanvas.width = w
  greenCanvas.width = w
  blueCanvas.width = w
  lCanvas.width = w
  aCanvas.width = w
  bCanvas.width = w

  rawCanvas.height = h
  redCanvas.height = h
  greenCanvas.height = h
  blueCanvas.height = h
  lCanvas.height = h
  aCanvas.height = h
  bCanvas.height = h

  rawContext.drawImage(image, 0, 0)

  let rawImageData = rawContext.getImageData(0, 0, w, h)
  let redImageData = redContext.getImageData(0, 0, w, h)
  let greenImageData = greenContext.getImageData(0, 0, w, h)
  let blueImageData = blueContext.getImageData(0, 0, w, h)
  let lImageData = lContext.getImageData(0, 0, w, h)
  let aImageData = aContext.getImageData(0, 0, w, h)
  let bImageData = bContext.getImageData(0, 0, w, h)

  let i = 0
  let rgb = new_rgb()
  let oklab = new_oklab()
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++, i += 4) {
      rgb.r = rawImageData.data[i + 0]
      rgb.g = rawImageData.data[i + 1]
      rgb.b = rawImageData.data[i + 2]
      rgb_to_oklab(rgb, oklab)
      let l = Math.floor(((oklab.L - range.L.min) / range.L.range) * 256)
      let a = Math.floor(((oklab.a - range.a.min) / range.a.range) * 256)
      let b = Math.floor(((oklab.b - range.b.min) / range.b.range) * 256)

      redImageData.data[i + 0] = rawImageData.data[i + 0]
      redImageData.data[i + 1] = rawImageData.data[i + 0]
      redImageData.data[i + 2] = rawImageData.data[i + 0]

      greenImageData.data[i + 0] = rawImageData.data[i + 1]
      greenImageData.data[i + 1] = rawImageData.data[i + 1]
      greenImageData.data[i + 2] = rawImageData.data[i + 1]
      greenImageData.data[i + 3] = 255

      blueImageData.data[i + 0] = rawImageData.data[i + 2]
      blueImageData.data[i + 1] = rawImageData.data[i + 2]
      blueImageData.data[i + 2] = rawImageData.data[i + 2]
      blueImageData.data[i + 3] = 255

      lImageData.data[i + 0] = l
      lImageData.data[i + 1] = l
      lImageData.data[i + 2] = l

      aImageData.data[i + 0] = a
      aImageData.data[i + 1] = a
      aImageData.data[i + 2] = a

      bImageData.data[i + 0] = b
      bImageData.data[i + 1] = b
      bImageData.data[i + 2] = b

      redImageData.data[i + 3] = rawImageData.data[i + 3]
      greenImageData.data[i + 3] = rawImageData.data[i + 3]
      blueImageData.data[i + 3] = rawImageData.data[i + 3]
      lImageData.data[i + 3] = rawImageData.data[i + 3]
      aImageData.data[i + 3] = rawImageData.data[i + 3]
      bImageData.data[i + 3] = rawImageData.data[i + 3]
    }
  }

  redContext.putImageData(redImageData, 0, 0)
  greenContext.putImageData(greenImageData, 0, 0)
  blueContext.putImageData(blueImageData, 0, 0)
  lContext.putImageData(lImageData, 0, 0)
  aContext.putImageData(aImageData, 0, 0)
  bContext.putImageData(bImageData, 0, 0)
}

function calcMaxSize() {
  if (
    typeof CSS !== 'undefined' &&
    typeof CSS.supports == 'function' &&
    !CSS.supports('max-height', '100dvh')
  ) {
    sizeBox.style.width = '100vw'
    sizeBox.style.height = '100vh'
  }
  let margin = +getComputedStyle(document.body).margin.replace('px', '') || 0
  let rect = sizeBox.getBoundingClientRect()
  let w = (rect.width - margin * 2) / 3
  let h =
    (rect.height - margin * 2 - fileInput.getBoundingClientRect().height) / 3
  document.documentElement.style.setProperty('--max-width', w + 'px')
  document.documentElement.style.setProperty('--max-height', h + 'px')
}

calcMaxSize()

window.onresize = calcMaxSize
