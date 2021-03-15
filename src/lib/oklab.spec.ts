import test from 'ava';

import { rgbString, toOklab } from './oklab';

test('toOklab and back', (t) => {
  t.is(rgbString(toOklab('rgb(0,0,0)')), 'rgb(0, 0, 0)');
  t.is(rgbString(toOklab('black')), 'rgb(0, 0, 0)');
  t.is(rgbString(toOklab('#ffffff')), 'rgb(255, 255, 255)');
  t.is(rgbString(toOklab('rgb(128,0,128)')), 'rgb(128, 0, 128)');
});

test('between', (t) => {
  const gray = toOklab('#999999');
  const green = toOklab('#00FF00');
  const between = {
    L: (gray.L + green.L) / 2,
    a: (gray.a + green.a) / 2,
    b: (gray.b + green.b) / 2,
  };
  t.is(rgbString(between), 'rgb(122, 205, 116)');
});
