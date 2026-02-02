import process from 'node:process';
import test from 'ava';
import hashObject from './index.js';

const [nodeMajor] = process.versions.node.split('.').map(Number);
const hasWebCrypto = nodeMajor >= 20;

async function importAsync() {
	return import('./async.js');
}

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

test('async - main', async t => {
	if (!hasWebCrypto) {
		t.pass('Skipping: requires Node.js 20+');
		return;
	}

	const {default: hashObjectAsync} = await importAsync();
	t.is(await hashObjectAsync({unicorn: 'rainbow'}, {algorithm: 'sha1'}), '7fec50beffde94d15bbb1989f8b31e4096d6a0ab');
	t.true((await hashObjectAsync({unicorn: 'rainbow'}, {encoding: 'buffer'})) instanceof Uint8Array);
	t.is(await hashObjectAsync({a: 0, b: {a: 0, b: 0}}), await hashObjectAsync({b: {b: 0, a: 0}, a: 0}));
	t.not(await hashObjectAsync({a: 'b'}), await hashObjectAsync({a: 'c'}));
});

test('async - produces same hashes as node version', async t => {
	if (!hasWebCrypto) {
		t.pass('Skipping: requires Node.js 20+');
		return;
	}

	const {default: hashObjectAsync} = await importAsync();
	const object = {'🦄': '🌈'};

	const algorithms = ['sha1', 'sha256', 'sha512'];

	const results = await Promise.all(
		algorithms.map(algorithm => hashObjectAsync(object, {algorithm})),
	);

	for (const [index, algorithm] of algorithms.entries()) {
		t.is(results[index], hashObject(object, {algorithm}));
	}
});

test('async - base64 encoding', async t => {
	if (!hasWebCrypto) {
		t.pass('Skipping: requires Node.js 20+');
		return;
	}

	const {default: hashObjectAsync} = await importAsync();
	const object = {unicorn: 'rainbow'};
	const result = await hashObjectAsync(object, {algorithm: 'sha1', encoding: 'base64'});
	t.is(result, hashObject(object, {algorithm: 'sha1', encoding: 'base64'}));
});

test('async - handles circular references', async t => {
	if (!hasWebCrypto) {
		t.pass('Skipping: requires Node.js 20+');
		return;
	}

	const {default: hashObjectAsync} = await importAsync();
	const object = {
		a: {
			b: {},
		},
	};

	object.a.b = object;

	t.is(await hashObjectAsync(object, {algorithm: 'sha1'}), 'd76f74df023c93c02a19371f1aae74e38802c469');
});
