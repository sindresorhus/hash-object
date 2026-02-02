import isObject from 'is-obj';
import sortKeys from 'sort-keys';
import decircular from 'decircular';
import {normalizeObject} from './utilities.js';

const algorithmMap = {
	sha1: 'SHA-1',
	sha256: 'SHA-256',
	sha384: 'SHA-384',
	sha512: 'SHA-512',
};

export default async function hashObject(object, {encoding = 'hex', algorithm = 'sha512'} = {}) {
	if (!isObject(object)) {
		throw new TypeError('Expected an object');
	}

	const normalizedObject = normalizeObject(decircular(object));
	const data = new TextEncoder().encode(JSON.stringify(sortKeys(normalizedObject, {deep: true})));
	const webAlgorithm = algorithmMap[algorithm] ?? algorithm;
	const hash = new Uint8Array(await globalThis.crypto.subtle.digest(webAlgorithm, data));

	if (encoding === 'buffer') {
		return hash;
	}

	if (encoding === 'hex') {
		return [...hash].map(byte => byte.toString(16).padStart(2, '0')).join('');
	}

	if (encoding === 'base64') {
		return btoa(String.fromCodePoint(...hash));
	}

	throw new Error(`Unsupported encoding: ${encoding}`);
}
