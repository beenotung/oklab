import test from 'ava';

import { rgbString, toOklab } from './oklab';

test('toOklab and back', (t) => {
  t.is(rgbString(toOklab({ r: 0, g: 0, b: 0 })), 'rgb(0, 0, 0)');
  t.is(rgbString(toOklab({ r: 255, g: 255, b: 255 })), 'rgb(255, 255, 255)');
  t.is(rgbString(toOklab({ r: 128, g: 0, b: 128 })), 'rgb(128, 0, 128)');
});

test('between', (t) => {
  const gray = toOklab({ r: 153, g: 153, b: 153 });
  const green = toOklab({ r: 0, g: 255, b: 0 });
  const between = {
    L: (gray.L + green.L) / 2,
    a: (gray.a + green.a) / 2,
    b: (gray.b + green.b) / 2,
  };
  t.is(rgbString(between), 'rgb(122, 205, 116)');
});
