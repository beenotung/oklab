import test from 'ava';

import {
  new_oklab,
  new_rgb,
  oklab,
  oklab_to_css_string,
  oklab_to_rgb,
  rgb,
  rgb_to_css_string,
  rgb_to_oklab,
} from './oklab';

test('toOklab and back', (t) => {
  const test = (r: number, g: number, b: number) => {
    const rgb: rgb = new_rgb();
    const oklab: oklab = new_oklab();
    rgb.r = r;
    rgb.g = g;
    rgb.b = b;
    rgb_to_oklab(rgb, oklab);
    oklab_to_rgb(oklab, rgb);
    t.is(rgb_to_css_string(rgb), `rgb(${r}, ${g}, ${b})`);
  };

  test(0, 0, 0);
  test(255, 255, 255);
  test(128, 0, 128);
});

test('between', (t) => {
  const oklab = new_oklab();

  rgb_to_oklab({ r: 153, g: 153, b: 153 }, oklab);
  const gray = { ...oklab };

  rgb_to_oklab({ r: 0, g: 255, b: 0 }, oklab);
  const green = { ...oklab };

  oklab.L = (gray.L + green.L) / 2;
  oklab.a = (gray.a + green.a) / 2;
  oklab.b = (gray.b + green.b) / 2;

  const between = new_rgb();
  oklab_to_rgb(oklab, between);

  t.is(rgb_to_css_string(between), 'rgb(122, 205, 116)');
});

test('to css string', (t) => {
  t.is(rgb_to_css_string({ r: 2, g: 3, b: 4 }), 'rgb(2, 3, 4)');
  t.is(rgb_to_css_string({ r: 2, g: 3, b: 4 }, 0.5), 'rgb(2, 3, 4 / 0.5)');
  t.is(rgb_to_css_string({ r: 2, g: 3, b: 4 }, 50), 'rgb(2, 3, 4 / 50%)');

  t.is(oklab_to_css_string({ L: 0.1, a: 0.2, b: 0.3 }), 'oklab(0.1, 0.2, 0.3)');
  t.is(
    oklab_to_css_string({ L: 0.1, a: 0.2, b: 0.3 }, 0.5),
    'oklab(0.1, 0.2, 0.3 / 0.5)'
  );
  t.is(
    oklab_to_css_string({ L: 0.1, a: 0.2, b: 0.3 }, 50),
    'oklab(0.1, 0.2, 0.3 / 50%)'
  );
});
