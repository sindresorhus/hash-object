import test from 'ava';
import hashObject from './index.js';

test('main', t => {
	t.is(hashObject({unicorn: 'rainbow'}, {algorithm: 'sha1'}), '7fec50beffde94d15bbb1989f8b31e4096d6a0ab');
	t.true(hashObject({unicorn: 'rainbow'}, {encoding: 'buffer'}) instanceof Uint8Array);
	t.is(hashObject({a: 0, b: {a: 0, b: 0}}), hashObject({b: {b: 0, a: 0}, a: 0}));
	t.not(hashObject({a: 'b'}), hashObject({a: 'c'}));
});
