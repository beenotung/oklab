declare let redGreenCanvas: HTMLCanvasElement
declare let blueYellowCanvas: HTMLCanvasElement

let redGreenContext = redGreenCanvas.getContext('2d')!
let blueYellowContext = blueYellowCanvas.getContext('2d')!

let size = 300

redGreenCanvas.width = size
redGreenCanvas.height = size

blueYellowCanvas.width = size
blueYellowCanvas.height = size

let redGreenImageData = redGreenContext.getImageData(0, 0, size, size)
let blueYellowImageData = blueYellowContext.getImageData(0, 0, size, size)

let i = 0
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++, i += 4) {
    redGreenImageData.data[i + 0] = Math.floor((x / size) * 256)
    redGreenImageData.data[i + 1] = Math.floor((y / size) * 256)
    redGreenImageData.data[i + 2] = 0

    blueYellowImageData.data[i + 0] = Math.floor((y / size) * 256)
    blueYellowImageData.data[i + 1] = Math.floor((y / size) * 256)
    blueYellowImageData.data[i + 2] = Math.floor((x / size) * 256)

    redGreenImageData.data[i + 3] = 255
    blueYellowImageData.data[i + 3] = 255
  }
}

redGreenContext.putImageData(redGreenImageData, 0, 0)
blueYellowContext.putImageData(blueYellowImageData, 0, 0)
