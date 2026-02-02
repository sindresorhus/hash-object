import crypto from 'node:crypto';
import isObject from 'is-obj';
import sortKeys from 'sort-keys';
import decircular from 'decircular';
import {normalizeObject} from './utilities.js';

export default function hashObject(object, {encoding = 'hex', algorithm = 'sha512'} = {}) {
	if (!isObject(object)) {
		throw new TypeError('Expected an object');
	}

	if (encoding === 'buffer') {
		encoding = undefined;
	}

	const normalizedObject = normalizeObject(decircular(object));

	const hash = crypto
		.createHash(algorithm)
		.update(JSON.stringify(sortKeys(normalizedObject, {deep: true})), 'utf8')
		.digest(encoding);

	return encoding === undefined ? new Uint8Array(hash) : hash;
}
