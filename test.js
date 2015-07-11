'use strict';
var test = require('ava');
var fn = require('./');

test(function (t) {
	t.assert(fn({unicorn: 'rainbow'}, {algorithm: 'sha1'}) === '7fec50beffde94d15bbb1989f8b31e4096d6a0ab');
	t.assert(Buffer.isBuffer(fn({unicorn: 'rainbow'}, {encoding: 'buffer'})));
	t.assert(fn({a: 0, b: {a: 0, b: 0}}) === fn({b: {b: 0, a: 0}, a: 0}));
	t.assert(fn({a: 'b'}) !== fn({a: 'c'}));
	t.end();
});
