'use strict';
const crypto = require('crypto');
const isObject = require('is-obj');
const sortKeys = require('sort-keys');

module.exports = (object, {encoding = 'hex', algorithm = 'sha512'} = {}) => {
	if (!isObject(object)) {
		throw new TypeError('Expected an object');
	}

	if (encoding === 'buffer') {
		encoding = undefined;
	}

	return crypto
		.createHash(algorithm)
		.update(JSON.stringify(sortKeys(object, {deep: true})), 'utf8')
		.digest(encoding);
};
