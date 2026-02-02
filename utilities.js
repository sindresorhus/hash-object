import isObject from 'is-obj';

export function normalizeObject(object) {
	if (typeof object === 'string') {
		return object.normalize('NFD');
	}

	if (Array.isArray(object)) {
		return object.map(element => normalizeObject(element));
	}

	if (isObject(object)) {
		return Object.fromEntries(
			Object.entries(object).map(([key, value]) => [key.normalize('NFD'), normalizeObject(value)]),
		);
	}

	return object;
}
