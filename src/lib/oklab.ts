import { Color, rgb } from 'd3-color'; // For color conversion

//See https://bottosson.github.io/posts/oklab/
//and https://observablehq.com/@fil/oklab-color-space

export type oklab = {
  readonly L: number;
  readonly a: number;
  readonly b: number;
};

export const toOklab = (color: string): oklab => {
  const c = rgb(color); // Handle nearly any type of color string
  const r = gamma_inv(c.r / 255);
  const g = gamma_inv(c.g / 255);
  const b = gamma_inv(c.b / 255);

  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);

  return {
    L: l * +0.2104542553 + m * +0.793617785 + s * -0.0040720468,
    a: l * +1.9779984951 + m * -2.428592205 + s * +0.4505937099,
    b: l * +0.0259040371 + m * +0.7827717662 + s * -0.808675766,
  };
};

export const toD3Color = ({ L, a, b }: oklab): Color => {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;

  return rgb(
    255 * gamma(+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    255 * gamma(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    255 * gamma(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)
  );
};

export const rgbString = (ok: oklab): string => {
  return toD3Color(ok).toString();
};

// gamma and gamma_inv from https://observablehq.com/@fil/oklab-color-space
// See: https://imagej.nih.gov/ij/developer/source/ij/process/ColorSpaceConverter.java.html
const gamma = (x: number) =>
  x >= 0.0031308 ? 1.055 * Math.pow(x, 1 / 2.4) - 0.055 : 12.92 * x;
const gamma_inv = (x: number) =>
  x >= 0.04045 ? Math.pow((x + 0.055) / (1 + 0.055), 2.4) : x / 12.92;
