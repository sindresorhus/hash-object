import crypto from 'crypto';
import isObject from 'is-obj';
import sortKeys from 'sort-keys';

function normalizeObject(object) {
	if (typeof object === 'string') {
		return object.normalize('NFD');
	}

	if (Array.isArray(object)) {
		return object.map(element => normalizeObject(element));
	}

	if (object !== null && typeof object === 'object') {
		return Object.fromEntries(
			Object.entries(object).map(([key, value]) => [key.normalize('NFD'), normalizeObject(value)])
		);
	}

	return object;
}

export default function hashObject(object, {encoding = 'hex', algorithm = 'sha512'} = {}) {
	if (!isObject(object)) {
		throw new TypeError('Expected an object');
	}

	if (encoding === 'buffer') {
		encoding = undefined;
	}

	const normalizedObject = normalizeObject(object);

	return crypto
		.createHash(algorithm)
		.update(JSON.stringify(sortKeys(normalizedObject, {deep: true})), 'utf8')
		.digest(encoding);
}
