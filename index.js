'use strict';
const crypto = require('crypto');
const isObject = require('is-obj');
const sortKeys = require('sort-keys');

module.exports = (object, options = {}) => {
	if (!isObject(object)) {
		throw new TypeError('Expected an object');
	}

	let encoding = options.encoding || 'hex';

	if (encoding === 'buffer') {
		encoding = undefined;
	}

	return crypto
		.createHash(options.algorithm || 'sha512')
		.update(JSON.stringify(sortKeys(object, {deep: true})), 'utf8')
		.digest(encoding);
};
