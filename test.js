import test from 'ava';
import m from './';

test(t => {
	t.is(m({unicorn: 'rainbow'}, {algorithm: 'sha1'}), '7fec50beffde94d15bbb1989f8b31e4096d6a0ab');
	t.true(Buffer.isBuffer(m({unicorn: 'rainbow'}, {encoding: 'buffer'})));
	t.is(m({a: 0, b: {a: 0, b: 0}}), m({b: {b: 0, a: 0}, a: 0}));
	t.not(m({a: 'b'}), m({a: 'c'}));
});
