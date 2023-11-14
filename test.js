import test from 'ava';
import hashObject from './index.js';

test('main', t => {
	t.is(hashObject({unicorn: 'rainbow'}, {algorithm: 'sha1'}), '7fec50beffde94d15bbb1989f8b31e4096d6a0ab');
	t.true(hashObject({unicorn: 'rainbow'}, {encoding: 'buffer'}) instanceof Uint8Array);
	t.is(hashObject({a: 0, b: {a: 0, b: 0}}), hashObject({b: {b: 0, a: 0}, a: 0}));
	t.not(hashObject({a: 'b'}), hashObject({a: 'c'}));
});

test('handles circular references', t => {
	const object = {
		a: {
			b: {},
		},
	};

	object.a.b = object; // Create a circular reference.

	t.is(hashObject(object, {algorithm: 'sha1'}), 'd76f74df023c93c02a19371f1aae74e38802c469');
});
